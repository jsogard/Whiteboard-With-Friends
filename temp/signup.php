<?php

// mysql -h mysql.cs.iastate.edu -u dbu319t17 -p db319t17

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
SELECT password
FROM users
WHERE username='".$_POST['username']."';";

$result = mysqli_query($link,$query);

if($result == false || mysqli_num_rows($result) == 0)
{
	$query = "
	INSERT INTO users
	VALUES('".$_POST['username']."','".$_POST['password']."',0);";
	mysqli_query($link,$query);
	echo "";
}
else
{
	echo "Username already exists";
}

?>