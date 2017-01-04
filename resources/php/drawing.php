<?php

session_start();

if ($_POST['action'] == "get") {
	$json = $_SESSION['board'];
	$json['username'] = $_SESSION['user']['username'];
	$_SESSION['board'] = null;
	echo json_encode($json);
}
elseif($_POST['action'] == "set")
{
	$_SESSION['board'] = [
		'id' => $_POST['id'],
		'name' => $_POST['name'],
		'owner' => $_POST['owner'],
		'read_write' => $_POST['read_write']
	];
	$link = mysqli_connect(
		"192.169.0.33",
		"root",
		"fsh36w44",
		"whiteboard");
	$query = "
		INSERT INTO Online(user,board_id)
		VALUES(\"".$_SESSION['user']['username']."\",
		\"".$_POST['id'].");";
	mysqli_query($link,$query);
}

?>