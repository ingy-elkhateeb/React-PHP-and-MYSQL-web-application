<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: https://testingscandi.000webhostapp.com");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

include('server.php');
include_once('includes.php');