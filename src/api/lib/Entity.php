<?php
/* 
*	Represents a table in the database; For SELECT, INSERT, UPDATE and DELETE of records from/to the table
*	@TODO - allow to specify other SQL syntax
*/
namespace Lib;

class Entity
{
	protected $connection;	// DBConnection instance;

	function __construct()
	{
		// create DB connection
		$this->connection = new DBConnection(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		// @TODO - must catch PHP warnings
		$this->connection = $this->connection->connect();
	}

	/* 
	*	Selects all records from a table
	*/
	function retrieveAll()
	{
		$sql = "select * from {$this->table}";

    	return $this->select($sql);
	}

	/* 
	*	Selects records based on ID from a table
	*/
	function retrieveById($id)
	{
		$sql = "select * from {$this->table} where {$this->primaryKey} = {$id}";
		
    	return $this->select($sql);
	}

	/* 
	*	Inserts new record to a table
	*/
	function create()
	{
		// get formatted data for Insert
		$formattedData = $this->getInsertData($this);
		$partition = implode(", ", $formattedData['columns']);
		$values = implode(", ", $formattedData['values']);
		
		$sql = "insert into {$this->table} ({$this->primaryKey}, {$partition}) values (0, {$values})";
		
		return $this->insert($sql);
	}

	/* 
	*	Updates existing record from a table
	*/
	function updateById($id)
	{
		// get formatted data for Update
		$formattedData = $this->getUpdateData($this);
		$set = implode(", ", $formattedData);
		
		$sql = "update {$this->table} set {$set} where {$this->primaryKey} = {$id}";
		
		return $this->update($sql, $id);
	}

	/* 
	*	Deletes existing record from a table
	*/
	function deleteById($id)
	{
		$sql = "delete from {$this->table} where {$this->primaryKey} = {$id}";
		
		return $this->delete($sql);
	}


	/* 
	*	Gets DB records based on SELECT query;
	*	@params - $sql - the SELECT query string
	*/
	function select($sql)
	{
		$result = array();

		// only proceed with select if connection was successful
		if ($this->connection) {
			$resultRaw = $this->connection->query($sql);

			if ($resultRaw && $resultRaw->num_rows > 0) {
				while ($row = $resultRaw->fetch_assoc()) {
					$result['status'] = STAT_CODE_SUCCESS;
					$result['data'][] = (object) $row;	// return array of objects
				}
			} else {
				$result['status'] = STAT_CODE_SUCCESS;
				$result['message'] = MSG_NO_RECORDS;
				$result['data'] = [];
			}

			// make sure to close connection
			$this->connection->close();
		} else {
			$result['status'] = STAT_CODE_FAIL;
			$result['message'] = MSG_DB_CONNECTION_ERROR;
		}

		return $result;
	}

	/*
	*	Inserts new record in the DB
	*	@params -  $sql - string; the INSERT sql
	*/
	function insert($sql)
	{
		$result = array();

		// only proceed with select if connection is successful
		if ($this->connection) {
			$this->connection->query($sql);

			// if insert is successful, get the created record
			if ($this->connection->insert_id) {
				$lastInsertedId = (string) $this->connection->insert_id;
				$result = $this->select("select * from {$this->table} where {$this->primaryKey} = {$lastInsertedId}");
			} else {
				$result['status'] = STAT_CODE_FAIL;
				$result['message'] = MSG_CREATE_RECORD_FAILED;

				// make sure to close connection
				$this->connection->close();
			}
		} 

		return $result;
	}

	/*
	*	Updates existing record in the DB
	*	@params -  $sql - string; the UPDATE sql; $id - the id of the record to update, if 0, no need to execute select
	*/
	function update($sql, $id = 0)
	{
		$result = array();

		// only proceed with select if connection is successful
		if ($this->connection) {
			$this->connection->query($sql);

			// if insert is successful, get the updated record
			if ($this->connection->affected_rows) {
				// if greater than, get the record details; otherwise, just return Success status
				if ($id > 0) {
					$result = $this->select("select * from {$this->table} where {$this->primaryKey} = {$id}");
				} else {
					$result['status'] = STAT_CODE_SUCCESS;
				}
			} else {
				$result['status'] = STAT_CODE_FAIL;
				$result['message'] = MSG_UPDATE_RECORD_FAILED;

				// make sure to close connection
				$this->connection->close();
			}
		} 

		return $result;
	}

	/*
	*	Deletes existing record in the DB
	*	@params -  $sql - string; the DELETE sql; $id - the id of the record to update
	*/
	function delete($sql)
	{
		$result = array();

		// only proceed with select if connection is successful
		if ($this->connection) {
			$this->connection->query($sql);

			// if insert is successful, get the created record
			if ($this->connection->affected_rows > 0) {
				$result['status'] = STAT_CODE_SUCCESS;
			} else {
				$result['status'] = STAT_CODE_FAIL;
				$result['message'] = MSG_DELETE_RECORD_FAILED;
			}

			// make sure to close connection
			$this->connection->close();
		} 

		return $result;
	}

	/*
	*	Gets the list of formatted table columns and values for Insert; 
	*	@params - $object - the Model object
	*/
	private function getInsertData($model)
	{
		// list of excluded columns
		$excludedCols = array('connection', 'table', 'primaryKey');
		$result = array();

		foreach ($model as $key => $value) {
			// if column is not excluded
			if (!in_array($key, $excludedCols)) {
				// convert column name to snake_case; same as the DB format
				$snakeCase = $this->camelToSnakeCase($key);
				$result['columns'][] = $snakeCase; 

				// if value is empty, then set as null; null is default value in DB 
				$result['values'][] = $value===null ? 'null' : "'".trim($value)."'";  // list values
			}
		}

		return $result;
	}

	/*
	*	Gets the list of formatted table columns and values for Update; 
	*	@params - $object - the Model object
	*/
	private function getUpdateData($model)
	{
		// list of excluded columns
		$excludedCols = array('connection', 'table', 'primaryKey');
		$result = array();

		foreach ($model as $key => $value) {
			// if column is not excluded
			if (!in_array($key, $excludedCols)) {
				// convert column name to snake_case; same as the DB format
				$column = $this->camelToSnakeCase($key);
				$val = $value===null ? 'null' : "'".trim($value)."'";

				$result[] = "$column = $val";
			}
		}

		return $result;
	}

	/*
	*	Transforms a string in camelCase to snake_case
	*	Source: Jan Jakes in http://stackoverflow.com/questions/1993721/how-to-convert-camelcase-to-camel-case
	*/
	private function camelToSnakeCase($input)
	{
	    return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $input));
	}
}
