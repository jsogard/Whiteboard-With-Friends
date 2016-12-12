<?php 

$id = $_POST['id'];

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
	DELETE FROM boards
	WHERE id=".$id.";";

mysqli_query($link,$query);

$query = "
	DELETE FROM strokes
	WHERE board_id=".$id.";";

mysqli_query($link,$query);

?>