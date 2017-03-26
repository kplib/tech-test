<?php
/* 
* 	Includes all the relevant dependencies in this file; Register autoloader
* 	Processes URLs for REST webservices
* 	Executes APIs	
*/

// include CONSTANTS and DB configuration
require_once (CFG_ROOT_DIR . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'constants.php');
require_once (CFG_ROOT_DIR . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'database.php');

$url = isset($_GET['url']) ? $_GET['url'] : die(MSG_INVALID_URL);

// Register autoloader to avoid writing a long list of require_once 
spl_autoload_register('autoloader');

// execute the API from the request 
executeApi($_SERVER, $url);


/* 
* 	Autoloader function 
*/
function autoloader($class) 
{
	$explodedClass = explode(DIRECTORY_SEPARATOR, $class);
	$className = end($explodedClass);

	$controllersPath = CFG_ROOT_DIR . DIRECTORY_SEPARATOR .'app' . DIRECTORY_SEPARATOR . 'controllers' . DIRECTORY_SEPARATOR . $className . '.php';
	$modelsPath = CFG_ROOT_DIR . DIRECTORY_SEPARATOR .'app' . DIRECTORY_SEPARATOR . 'models' . DIRECTORY_SEPARATOR . $className . '.php';
	$libPath = CFG_ROOT_DIR . DIRECTORY_SEPARATOR .'lib' . DIRECTORY_SEPARATOR . $className . '.php';

	if (file_exists($controllersPath)) {
		require_once $controllersPath;
	} elseif (file_exists($modelsPath)) {
		require_once $modelsPath;
	} elseif (file_exists($libPath)) {
		require_once $libPath;
	}
}


/*
*	Executes the APIs 
*	NOTE:
*	Expected API (HTTP Method | URL | Controller Method )
*		a. GET all | /{controllerName} | retrieveAll()
*		b. GET by ID | /{controllerName}/{id} | retrieveById()
*		c. POST | /{controllerName} | create()
*		d. PUT | /{controllerName}/{id} | update()
*		e. DELETE | /{controllerName}/{id} | delete()
*	@params $serverInfo - Server / Execution environment information; 
*			$url - the Request URL
*/
function executeApi($serverInfo, $url)
{
	// API Response
	$response = array('status' => STAT_CODE_FAIL);

	// explode the URL
	$urlArr = explode(CFG_URL_DELIMETER, $url);
	// construct controller name
	$ctrlName = 'App\Controllers\\' . ucfirst($urlArr[0]) . 'Controller';
	
	// 1. check if controller exists, if it doesn't exist, then stop execution and display error
	if (!class_exists($ctrlName)) {
		// send error message and STOP execution
		sendResponse($response, MSG_INVALID_CONTROLLER);
	}

	// if controller exists, create instance of it
	$controller = new $ctrlName();

	switch($serverInfo['REQUEST_METHOD']) {
		case 'GET':
			// if the expected API URL is strictly followed, max array size is 2.  
			// Thus we are sure that when size>1, we can get the ID from the 2nd element
			if (sizeof($urlArr)===2) {
				$response = $controller->retrieveById($urlArr[1]);
			} else {
				$response = $controller->retrieveAll();
			}

			break;
		case 'POST':
			// check if POST URL is valid; if the expected API URL is strictly followed, POST min array size=1
			if (sizeof($urlArr)!==1) {
				// send error message and STOP execution
				sendResponse($response, MSG_INVALID_URL);
			}

			// check if POST data are sent
			$request = file_get_contents('php://input');
			$requestObj = json_decode($request);

			if ($requestObj===null) {
				// send error message and STOP execution
				sendResponse($response, MSG_INVALID_REQUEST);
			}

			// success, status and data are set in Entity class
			$response = $controller->create($requestObj);

			break;
		case 'PUT':
			// check if PUT URL is valid; if the expected API URL is strictly followed, PUT array size=2
			if (sizeof($urlArr)!==2) {
				// send error message and STOP execution
				sendResponse($response, MSG_INVALID_URL);
			}

			// check if POST data are sent
			$request = file_get_contents('php://input');
			$requestObj = json_decode($request);

			if ($requestObj===null) {
				// send error message and STOP execution
				sendResponse($response, MSG_INVALID_REQUEST);
			}

			// success, status and data are set in Entity class
			$response = $controller->update($urlArr[1], $requestObj);

			break;
		case 'DELETE':
			// check if DELETE URL is valid; if the expected API URL is strictly followed, DELETE array size=2
			if (sizeof($urlArr)!==2) {
				// send error message
				sendResponse($response, MSG_INVALID_URL);
			}

			// success, status and data are set in Entity class
			$response = $controller->delete($urlArr[1]);

			break;
		default:
			// default would be 'GET'
			break;	
	}

	sendResponse($response);
}

function sendResponse($response, $message = '')
{
	// Set Response Header Content-Type
	header('Content-type: ' . CFG_CONTENT_TYPE);
	// I'm not sure if this is the best way... but this solves: No 'Access-Control-Allow-Origin' header is present on the requested resource.
	header('Access-Control-Allow-Origin: *');
	
	// set Response Header HTTP Code
	$status = isset($response['status']) ? $response['status'] : STAT_CODE_FAIL;
	http_response_code($status);

	// set message to $response if set
	if (isset($message) && $message!=='') {
		$response['message'] = $message;
	}

	// return JSON Response
	echo json_encode($response);

	// just stop the execution here
	die();
}
