<?php

$pass = $_POST['password'];
$id = $_POST['id'];
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
WHERE board_id=".$id.";";

mysqli_query($link,$query);
mysqli_query($link,"UPDATE boards SET modified=NOW() WHERE id=".$id.";");

?>