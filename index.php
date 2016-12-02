<?php

echo "Starting page";

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = ;
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

$conn = new mysqli($server, $username, $password, $db);

if($mysqli->connect_errno){
	echo "Connection failed: ".$mysqli->connect_error;
}
else
{
	echo "Connected!"
}

?>