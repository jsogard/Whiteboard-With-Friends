<?php

echo "Starting page";



$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

var_dump($url, $server, $username, $password, $db);

/*
$conn = new mysqli($server, $username, $password, $db);

if($mysqli->connect_errno){
	echo "Connection failed: ".$mysqli->connect_error;
}
else
{
	echo "Connected!"
}
*/


?>