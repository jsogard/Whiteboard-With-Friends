<?php

$pass = $_POST['password'];
//$pass = 'chocolate';
if($pass != 'chocolate')
{
	echo "You do not have permission";
	die();
}

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
DELETE FROM strokes
WHERE true;";

mysqli_query($link,$query);

?>