<?php

session_start();

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$query = "
	SELECT user
	FROM Online
	WHERE user<>'".$_SESSION['user']['username']."' 
	AND board_id='".$_POST['board_id']."';";

$result = mysqli_query($link,$query);

$colors = Array(
	'#f00',
	'#f80',
	'#ff0',
	'#8f0',
	'#0f0',
	'#0f8',
	'#0ff',
	'#08f',
	'#00f',
	'#80f',
	'#f0f',
	'#f08'
);

function get_color($name,$colors,$index=-1){
	$color = $colors[rand(0,count($colors)-1)];
	if($index >= count($colors))
		$index = $index % count($colors);
	return "<span style='color:".($index == -1 ? $color : $colors[$index])."'>".$name."</span>";
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