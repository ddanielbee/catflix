<?php
	require 'vendor/autoload.php';
	require 'dbHandler.php';

	$app = new \Slim\Slim();



	/**
	 * Initial get Request for first call to page
	 */
	$app->get('/', function() {
		readFile("index.html");
	});

	$app->get('/getContent', function() {
		echo getContent();
	});


	$app->run();