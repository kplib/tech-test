<?php
namespace App\Controllers;

use App\Models\Frog as Frog;
use App\Models\Pond as Pond;

class FrogController
{
	public function retrieveAll()
	{
		$frogs = new Frog();
		$frogList = $frogs->retrieveAll();
		
		if (sizeof($frogList) > 0) {
			// loop through the list and get Pond object for the records with pond_id
			foreach ($frogList['data'] as $index => $frog) {
				if (isset($frog->pond_id) && $frog->pond_id!=null && $frog->pond_id!='') {
					// get Pond object
					$pond = new Pond();
					$pondObj = $pond->retrieveById($frog->pond_id);
					
					// assign to Frog
					if (sizeof($pondObj['data'])) {
						$frog->pond = $pondObj['data'][0];
					}
				}

				// update the list
				$frogList['data'][$index] = $frog;
			}
		} 

		return $frogList;
	}

	public function retrieveById($id)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($id) {
			$frog = new Frog();

			$result = $frog->retrieveById($id);
		}
	
		return $result;
	}

	public function create($request)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($request) {
			$frog = new Frog();
			$frog->name = $request->name;
			$frog->gender = $request->gender;
			$frog->birth_date = $request->birth_date;
			// if death_date is set
			if (isset($request->death_date)) {
				$frog->death_date = $request->death_date;
			}

			$result = $frog->create();
		}
		

		return $result;
	}

	public function update($id, $request)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($id && $request) {
			$frog = new Frog();
			$frog->name = $request->name;
			$frog->gender = $request->gender;
			$frog->birth_date = $request->birth_date;
			// if death_date is set
			if (isset($request->death_date)) {
				$frog->death_date = $request->death_date;
			}

			// if death_date is set
			if (isset($request->pond_id)) {
				$frog->pond_id = $request->pond_id;
			}

			$result = $frog->updateById($id);
		}

		return $result;
	}

	public function delete($id)
	{
		$result = array('status' => STAT_CODE_FAIL, 'message' => MSG_INVALID_REQUEST);

		if ($id) {
			$frog = new Frog();

			$result = $frog->deleteById($id);
		}

		return $result;
	}
}
