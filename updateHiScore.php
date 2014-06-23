<?php
$id = $_GET['id'];
$hiScore = $_GET['newHiScore'];
$level = $_GET['level'];
echo "hi-score is $hiScore and level is $level for user $id <br />";
updateHiScore($id, $hiScore, $level);
echo "hi-score updated!";
function updateHiScore($id, $hiScore, $level) {

  $db_hostname = '';
  $db_database = '';
  $db_username = '';
  $db_password = '';
  $db_server = mysql_connect($db_hostname, $db_username, $db_password);
  if (!$db_server) die("unable to log in");
  mysql_select_db($db_database) or die("unable to select db");
  $currLevel = 'level' . strval($level);
  echo 'currLevel = ' . $currLevel . '<br />';
  $query = "UPDATE users SET $currLevel = $hiScore where id = $id";
  echo $query . "<br />";
  $result = mysql_query($query);

  if (!$result) die ("db access denied");
}
?>
