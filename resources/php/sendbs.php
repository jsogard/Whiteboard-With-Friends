<?php

//$pass = $_POST['password'];
$pass = 'chocolate';
$id = $_POST['id'];
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

$json = $_POST['stroke'];
$query = "
INSERT INTO strokes(json,board_id)
VALUES('".$json."',".$id.");";

mysqli_query($link,$query);

mysqli_query($link,"UPDATE boards SET modified=NOW() WHERE id=".$id.";");

?>