<?php

session_start();

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
SELECT username, online
FROM users
WHERE username<>'".$_SESSION['user']['username']."' 
AND online=1;";

$result = mysqli_query($link,$query);

$colors = Array(
	'aa0000',
	'99004d',
	'008282',
	'5858ff',
	'a25203',
	'ff7f50',
	'ff569e',
	'2c5b74',
	'fe5656'
);

function get_color($name,$colors,$index=-1){
	$color = $colors[rand(0,count($colors)-1)];
	if($index >= count($colors))
		$index = $index % count($colors);
	return "<span style='color:#".($index == -1 ? $color : $colors[$index])."'>".$name."</span>";
}

if($result == false || mysqli_num_rows($result) == 0)
{
	echo "Nobody else is online...";
}
else
{
	$users = Array();
	while($row = mysqli_fetch_row($result))
	{
		array_push($users, $row[0]);
	}
	$commas = count($users)-1;
	echo "You are drawing with ";
	for($i = 0; $i < count($users); $i += 1)
	{
		echo get_color($users[$i],$colors,$i);
		if($i <= $commas-1)
			echo ", ";
		if($i == $commas-1)
			echo "and ";
		if($i == $commas)
			echo ".";
	}
}

?>