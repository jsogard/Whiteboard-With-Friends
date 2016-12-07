<?php

session_start();

if(isset($_SESSION['user']))
{
	echo $_SESSION['user']['username'];
}
else
{
	session_destroy();
	echo "";
}

?>