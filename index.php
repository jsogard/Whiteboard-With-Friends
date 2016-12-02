<?php

echo "Starting page";



$url = parse_url(getenv("CLEARDB_DATABASE_URL"));

$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);

//var_dump($url, $server, $username, $password, $db);


$conn = mysqli_connect($server, $username, $password, $db);

if(!$conn){
	echo "Connection failed: ".$mysqli_connect_error();
}
else
{
	echo "Connected!"
}


// mysql -h us-cdbr-iron-east-04.cleardb.net -u b9376310256763 -p935d09da heroku_d27a38e4352bbd4


?>