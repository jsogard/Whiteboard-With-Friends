<?php

$pass = $_POST['password'];
$id = $_POST['id'];
//$pass = 'chocolate';
if($pass != 'chocolate')
{
	echo "You do not have permission";
	die();
}

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$query = "
SELECT json
FROM strokes
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