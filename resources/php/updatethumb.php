<?php


$data = $_POST['data'];
$id = $_POST['id'];

list($type, $data) = explode(';', $data);
list(, $data)      = explode(',', $data);
$data = base64_decode($data);
$path = './../img/boards/'.$id.'.png';

if (!file_exists($path)) { 
    die('File does not exist');
}
else
{
	echo "file exists!";
}

$f = fopen(realpath($path),'w');
$f1 = fwrite($f,$data);
$f2 = fclose($f);

var_dump($f,$f1,$f2);

file_put_contents($path, $data);

echo 'writing data to '.realpath($path);

?>