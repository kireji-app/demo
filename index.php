<?
$host = $_SERVER['HTTP_HOST'];
$public = $_SERVER['REMOTE_ADDR'] != '35.138.226.122';
$uri = ltrim($_SERVER['REQUEST_URI'],'/');
include $public ? 'placeholder.php' : 'makefile.php';