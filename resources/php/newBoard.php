<?php

session_start();

$link = mysqli_connect(
	"mysql.cs.iastate.edu",
	"dbu319t17",
	"g=frAr4s",
	"db319t17");

$json = json_decode($_POST['json']);

if($json->public == false)
	$json->public = 0;
else
	$json->public = 1;

if($json->owner == null || $json->owner == "")
	$json->owner = $_SESSION['user']['username'];

$writers = "";
if($json->writers != null){
	foreach ($json->writers as $key => $value) {
		if($value == null) continue;
		$writers .= '['.$value.']';
	}
}


$readers = "";
if($json->readers != null){
	foreach ($json->readers as $key => $value) {
		if($value == null) continue;
		$readers .= '['.$value.']';
	}
}

var_dump($json,$writers,$readers);


$query = "
	INSERT INTO boards(owner,name,writers,readers,public,creation,modified)
	VALUES (
		\"".$json->owner."\",
		\"".$json->name."\",
		\"".$writers."\",
		\"".$readers."\",
		".$json->public.",
		NOW(),
		NOW());";

echo $query;

mysqli_query($link,$query);

$query = "
	SELECT id
	FROM boards
	WHERE owner=\"".$json->owner."\"
	AND name=\"".$json->name."\";";

$results = mysqli_query($link,$query);

$id = mysqli_fetch_row($results)[0];

copy('./../img/boards/default.png','./../img/boards/'.$id.".png");

$_SESSION['board'] = [
	'id' => $id,
	'name' => $json->name,
	'owner' => $json->owner,
	'read_write' => 'write'
];

var_dump($_SESSION);

?>