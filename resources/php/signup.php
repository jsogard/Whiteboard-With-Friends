<?php

// mysql -h mysql.cs.iastate.edu -u dbu319t17 -p db319t17
$json = json_decode(key($_POST));

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
SELECT password
FROM users
WHERE username='".$json->username."';";

$result = mysqli_query($link,$query);

if($result == false || mysqli_num_rows($result) == 0)
{
	$query = "
	INSERT INTO users(username,password,online)
	VALUES(\"".$json->username."\",\"".$json->password."\",0);";
	mysqli_query($link,$query);
	mysqli_query($link,"INSERT INTO online(user,board_id) VALUES (\"".$json->username."\",\"\");")
}
else
{
	echo "Username already exists";
}

?>