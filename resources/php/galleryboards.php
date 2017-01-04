<?php

session_start();

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

$name = $_SESSION['user']['username'];

// get public boards

$query = "
	SELECT id, title, owner, modified
	FROM Board
	WHERE public = true
	ORDER BY id DESC";

$results = mysqli_query($link,$query);

$boards = array();

while($row = mysqli_fetch_row($results))
{
	$id = (int)$row[0];
	$boards[$id] = [
		'id' => $id,
		'name' => $row[1],
		'owner' => $row[2],
		'thumb' => './resources/img/boards/'.$id.'.png?'.time(),
		'modified' => $row[3],
		'read_write' => 'write'
	];
}

// get boards user belongs to

$query = "
	SELECT b.id, b.title, b.owner, b.modified, p.can_read, p.can_write
	FROM Permission p, Board b
	WHERE b.id = p.board_id
	AND p.user = \"".$name."\"
    ORDER BY board_id DESC;";

$results = mysqli_query($link,$query);

while($row = mysqli_fetch_row($results))
{
	$id = (int)$row[0];
	if(!isset($boards[$id])){
		$data [
			'id' => $id
			'name' => $row[1],
			'owner' => $row[2],
			'thumb' => './resources/img/boards/'.$id.'.png?'.time(),
			'modified' => $row[3]
		];
		if($row[5])
			$data['read_write'] = 'write';
		else
			$data['read_write'] = 'read';
		$boards[$id] = $data;
	}
}
var_dump($boards);
$boards = json_encode($boards);
//echo $boards;

?>