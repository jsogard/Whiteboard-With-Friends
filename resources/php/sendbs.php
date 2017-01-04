<?php

$id = $_POST['id'];

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$json = $_POST['stroke'];
$query = "
	INSERT INTO Stroke(json,board_id)
	VALUES('".$json."',".$id.");";

mysqli_query($link,$query);

mysqli_query($link,"UPDATE Board SET modified=NOW() WHERE id=".$id.";");

?>