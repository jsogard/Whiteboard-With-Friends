<?php

session_start();

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$user = $_SESSION['user']['username'];
$board_id = $_POST['board_id'];

$query = "
	DELETE FROM Online
	WHERE user=\"".$user."\"
	AND board_id=\"".$board_id."\";";

mysqli_query($link,$query);

?>