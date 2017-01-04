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
WHERE name=\"".$_POST['username']."\";";

$result = mysqli_query($link,$query);

if($result == false || mysqli_num_rows($result) == 0)
{
	echo "Username not found";
}
else
{
	$row = mysqli_fetch_row($result);
	if(md5($_POST['password']) == $row[0])
	{
		echo "";
		session_start();
		$_SESSION['user'] = Array(
			'username' => $_POST['username']);
	}
	else
	{
		echo "Password incorrect";
	}
}

?>