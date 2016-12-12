<?php

session_start();

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$user = $_SESSION['user']['username'];
$board_id = $_POST['board_id'];

$query = "
	SELECT board_id
	FROM online
	WHERE user=\"".$user."\";";

$results = mysqli_query($link,$query);
$old = mysqli_fetch_row($results)[0];
$token = "[".$board_id."]";
$new = str_replace($token,"",$old);

echo "Old: ".$old;
echo "     New: ".$new;

$query = "
	UPDATE online
	SET board_id=\"".$new."\"
	WHERE user=\"".$user."\";";
mysqli_query($link,$query);

?>