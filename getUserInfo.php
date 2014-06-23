<?php
  //$id = $_GET['id'];
//$name = $_GET['name'];
//echo "hi $name, your id is $id";
//getUserInfo($id, $name);
  //gets our data from the db using the facebook id
function queryUsersTable($queryString) {
  $db_hostname = '';
  $db_database = '';
  $db_username = '';
  $db_password = '';
  $db_server = mysql_connect($db_hostname, $db_username, $db_password);
  if (!$db_server) die("unable to log in");
  mysql_select_db($db_database) or die("unable to select db");
  $query = $queryString;
  $result = mysql_query($query);

  if (!$result) die ("db access denied, query: $queryString");
  return $result;
}

function userExists($id) {
  $result = queryUsersTable("SELECT COUNT(*) FROM users WHERE id = $id");
  $rows = mysql_fetch_assoc($result);
  return $rows['COUNT(*)'] != 0; 
}

function getUserInfo($id, $name) {
  //echo "name= [$name], id= [$id]";
  if (!userExists($id)) { makeNewUser($id, $name); } 
  $result = queryUsersTable("SELECT * FROM users WHERE id = $id");
  $data = mysql_fetch_assoc($result);
  return $data;
}

function makeNewUser($id, $name) {
  queryUsersTable("INSERT INTO users (id, name) VALUES ($id, '$name')");
}
?>
