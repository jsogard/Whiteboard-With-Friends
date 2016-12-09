<?php

session_start();


$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$username = $_SESSION['user']['username'];

$query = "
UPDATE users
SET online=0
WHERE username='".$username."';";

mysqli_query($link,$query);

session_destroy();

?>