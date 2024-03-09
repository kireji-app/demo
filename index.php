<?
const
 VERSION = 15 / 1000,
 MAINTENANCE = true,
 HOME_IP = '35.138.226.122',
 LIBRARY_IP = '97.76.210.20',
 PHONE_IP = '174.211.102.42',
 JASON_IP = '99.108.88.76',
 THEME = '#414243';

$host = $_SERVER['HTTP_HOST'];
$user =  $_SERVER['REMOTE_ADDR'];
$uri = ltrim($_SERVER['REQUEST_URI'], '/');
$public = $user != HOME_IP && $user != LIBRARY_IP && $user != PHONE_IP && $user != JASON_IP;

function b64($uri)
{
 return base64_encode(file_get_contents($uri));
}

function a($uri)
{
 return trim(json_encode(file_get_contents($uri)), '"');
}

if (MAINTENANCE)
 header("Expires: Sun, 20 Jul 1969 20:17:00 UTC");

include
 MAINTENANCE && $public ?
 'maintenance.php' :
 "bootstrap.php";