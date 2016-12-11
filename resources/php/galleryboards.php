<?php

session_start();

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$name = $_SESSION['user']['username'];

$query = "
	SELECT id, name, owner, writers, modified
	FROM boards
	WHERE public=1
	OR owner='".$name."'
	OR writers LIKE '%[".$name."]%'
	OR readers LIKE '%[".$name."]%';";

$results = mysqli_query($link,$query);

$boards = array();

while($row = mysqli_fetch_row($results))
{
	$data = [
		'id' => (int)$row[0],
		'name' => $row[1],
		'owner' => $row[2],
		'thumb' => './resources/img/boards/'.$row[0].'.png?'.time(),
		'modified' => $row[4]
	];
	if($row[2] == $name || strpos($row[3],'['.$name.']') != false)
		$data['read_write'] = 'write';
	else
		$data['read_write'] = 'read';
	array_push($boards,$data);
}
$boards = json_encode($boards);
echo $boards;

?>