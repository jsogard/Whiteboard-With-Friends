<?php

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$query = "
	SELECT json
	FROM Stroke
	WHERE board_id=".$id."
	ORDER BY id ASC;";
$result = mysqli_query($link,$query);

if($result == false)
{
	echo "[]";
}
else
{
	$data = Array();
	while($row = mysqli_fetch_row($result))
	{
		array_push($data, $row[0]);
	}
	$json = json_encode($data);
	echo $json;
}

?>