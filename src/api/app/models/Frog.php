<?php
namespace App\Models;

use Lib\Entity; 

class Frog extends Entity
{
	protected $table = 'frog';
	protected $primaryKey = 'frog_id';

	// Attributes
	public $name;
	public $gender;
	public $birth_date;
	public $death_date;
	public $pond_id; // Pond assignment

	// remove all frogs from pond
	public function removeAllFrogsFromPond($pondId) 
	{
		$sql = "update {$this->table} set pond_id = null where pond_id = {$pondId}";

		return parent::update($sql);
	}
}
