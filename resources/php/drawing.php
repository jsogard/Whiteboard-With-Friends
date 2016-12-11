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
		"mysql.cs.iastate.edu",
		"dbu319t17",
		"g=frAr4s",
		"db319t17");
	$query = "
		UPDATE online
		SET board_id = CONCAT(board_id,'[".$_POST['id']."]')
		WHERE user=\"".$_SESSION['user']['username']."\";";
	mysqli_query($link,$query);
}

?>