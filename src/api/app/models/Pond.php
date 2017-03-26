<?php
namespace App\Models;

use Lib\Entity; 

class Pond extends Entity
{
	protected $table = 'pond';
	protected $primaryKey = 'pond_id';

	// Attributes
	public $name;
	public $description;
}
