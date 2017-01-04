<?php

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$query = "
DELETE FROM Stroke
WHERE board_id=".$id.";";

mysqli_query($link,$query);
mysqli_query($link,"UPDATE Board SET modified=NOW() WHERE id=".$id.";");

?>