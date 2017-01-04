<?php 

$id = $_POST['id'];

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$query = "
	DELETE FROM Board
	WHERE id=".$id.";";

mysqli_query($link,$query);

?>