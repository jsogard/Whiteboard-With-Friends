<?php

// mysql -h mysql.cs.iastate.edu -u dbu319t17 -p db319t17

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$query = "
	SELECT password
	FROM User
	WHERE name='".$_POST['username']."';";

$result = mysqli_query($link,$query);

if($result == false || mysqli_num_rows($result) == 0)
{
	$query = "
		INSERT INTO User(username,password)
		VALUES(
			\"".$_POST['username']."\",
			\"".md5($_POST['password'])."\"
			);";
	mysqli_query($link,$query);
	//mysqli_query($link,"INSERT INTO Online(user,board_id) VALUES (\"".$_POST['username']."\",\"\");");
	echo "";
	session_start();
	$_SESSION['user'] = Array(
		'username' => $_POST['username']);
}
else
{
	echo "Username already exists";
}

?>