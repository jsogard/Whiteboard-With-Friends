<?php

$json = json_decode(key($_POST));
// mysql -h mysql.cs.iastate.edu -u dbu319t17 -p db319t17

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
SELECT password
FROM users
WHERE username=\"".$json->username."\";";

$result = mysqli_query($link,$query);

if($result == false || mysqli_num_rows($result) == 0)
{
	echo "Username Not Found";
}
else
{
	$row = mysqli_fetch_row($result);
	if($json->password == $row[0])
	{
		echo "";
		session_start();
		$_SESSION['user'] = Array(
			'username' => $json->username);
		$query = "
			UPDATE users
			SET online=1
			WHERE username='".$json->username."';";
		mysqli_query($link,$query);
	}
	else
	{
		echo "Password Incorrect";
	}
}

?>