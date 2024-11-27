<? const
 stagingUsers = ['173.168.55.24'],
 stagingPrefix = "dev.",
 releasePrefix = "",
 scriptBaseName = "server.js";

$host = $_SERVER["HTTP_HOST"];
$isStagingHost = str_starts_with($host, stagingPrefix);

$user = $_SERVER['REMOTE_ADDR'];
$isStagingUser = in_array($user, stagingUsers);

$useStagingScript = $isStagingUser && $isStagingHost;
$scriptPrefix = ($useStagingScript ? stagingPrefix : releasePrefix);
$scriptSrc = "https://$host/$scriptPrefix".scriptBaseName;

echo <<<HTML
<!DOCTYPE html>
<html lang=en>
 <head>
  <!-- © 2013 - 2024 Eric Augustinowicz and Kristina Soriano -->
  <link rel=manifest>
  <meta name=robots content=noindex>
  <meta name=viewport content="width=device-width,initial-scale=1">
  <script defer src=$scriptSrc></script>
  <title>Loading $host...</title>
  <!-- user: $user -->
 </head>
</html>
HTML;