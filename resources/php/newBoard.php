<?php

session_start();

$link = mysqli_connect(
	"192.169.0.33",
	"root",
	"fsh36w44",
	"whiteboard");

// format data

$json = json_decode($_POST['json']);

if($json->public == false)
	$json->public = 0;
else
	$json->public = 1;

if($json->owner == null || $json->owner == "")
	$json->owner = $_SESSION['user']['username'];

$writers = Array();
if($json->writers != null){
	foreach ($json->writers as $key => $value) {
		if($value == null) continue;
		array_push($writers,$value);
	}
}

$readers = Array();
if($json->readers != null){
	foreach ($json->readers as $key => $value) {
		if($value == null) continue;
		array_push($readers,$value);
	}
}

var_dump($json,$writers,$readers);

// create board

$query = "
	INSERT INTO Board(owner,title,public,creation,modified)
	VALUES (
		\"".$json->owner."\",
		\"".$json->name."\",
		".$json->public.",
		NOW(),
		NOW());";

echo $query;

mysqli_query($link,$query);

// get id of board inserted to create a thumbnail for it

$query = "
	SELECT id
	FROM Board
	WHERE owner=\"".$json->owner."\"
	AND title=\"".$json->name."\"
	LIMIT 1
	ORDER BY id DESC;";

$results = mysqli_query($link,$query);

$id = mysqli_fetch_row($results)[0];

copy('./../img/boards/default.png','./../img/boards/'.$id.".png");

// mark user as online on the board

$query = "
	INSERT INTO Online(user, board_id)
	VALUES(\"".$json->owner."\",".$id.");";

mysqli_query($link,$query);

// update session (is this at all necessary???)

$_SESSION['board'] = [
	'id' => $id,
	'name' => $json->name,
	'owner' => $json->owner,
	'read_write' => 'write'
];

var_dump($_SESSION);

?>