<?
const
 VERSION = 4/1000,
 MAINTENANCE = true,
 HOME_IP = '35.138.226.122',
 LIBRARY_IP = '97.76.210.20',
 PHONE_IP = '174.211.102.42',
 JASON_IP = '99.108.88.76',
 TRAVEL_IP = '172.58.149.106',
 THEME = '#414243';

$host = $_SERVER['HTTP_HOST'];
$user =  $_SERVER['REMOTE_ADDR'];
$uri = ltrim($_SERVER['REQUEST_URI'], '/');
$public = $user != HOME_IP && $user != LIBRARY_IP && $user != PHONE_IP && $user != JASON_IP && $user != TRAVEL_IP;

if (MAINTENANCE)
 header("Expires: Sun, 20 Jul 1969 20:17:00 UTC");

include
 MAINTENANCE && $public ?
 'server/maintenance.php' :
 "server/bootstrap.php";