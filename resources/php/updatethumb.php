<?php


$data = $_POST['data'];
$id = $_POST['id'];

list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);

file_put_contents('./../img/boards/'.$id.'.png', $data);

?>