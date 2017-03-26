<?php
/*
*	Database connector class; For DB connection
*/
namespace Lib;

class DBConnection 
{
	protected $connection;

	function __construct($host, $user, $password, $db)
	{
		// @TODO - Add other DBMS's connection
		$this->connection = new \mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	}

	/* Connects to database */
	function connect() 
	{
		if ($this->connection->connect_error) {
			return false;	// @TODO - can have logging of error here
		} 

		return $this->connection;
	}
}
