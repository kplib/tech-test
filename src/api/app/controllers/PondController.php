<?php
namespace App\Controllers;

use App\Models\Pond as Pond;
use App\Models\Frog as Frog;

class PondController
{
	public function retrieveAll()
	{
		$ponds = new Pond();
		
		return $ponds->retrieveAll();
	}

	public function retrieveById($id)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($id) {
			$frog = new Pond();

			$result = $frog->retrieveById($id);
		}
	
		return $result;
	}

	public function create($request)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($request) {
			$pond = new Pond();
			$pond->name = $request->name;
			$pond->description = $request->description;

			$result = $pond->create();
		}
		

		return $result;
	}

	public function update($id, $request)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($id && $request) {
			$pond = new Pond();
			$pond->name = $request->name;
			$pond->description = $request->description;

			$result = $pond->updateById($id);
		}

		return $result;
	}

	public function delete($id)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($id) {
			$pond = new Pond();

			$result = $pond->deleteById($id);
			// remove Frogs from this pond
			if ($result['status']==STAT_CODE_SUCCESS) {
				$frogs = new Frog();
				$frogs->removeAllFrogsFromPond($id);
			}
		}

		return $result;
	}
}
