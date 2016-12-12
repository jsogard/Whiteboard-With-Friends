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
$pos = strpos($old,$token);
$new = substr($old,0,$pos);
$new .= substr($old,$pos+strlen($token)+1);

echo "Old: ".$old;
echo "     New: ".$new;

$query = "
	UPDATE online
	SET board_id=\"".$new."\"
	WHERE user=\"".$user."\";";
mysqli_query($link,$query);

?>