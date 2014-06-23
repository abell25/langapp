<?php

require 'php-sdk/facebook.php';
require 'getUserInfo.php';
$debug = false;
$appId = '';
$facebook = new Facebook(array(
			       'appId'  => '',
			       'secret' => '',
			       'cookie' => true,  
			       //'scope' => 'publish_stream,read_stream,offline_access,manage_pages,user_photos,friends_photos' 
  'scope' =>  'user_photos,friends_photos'
			       ));


// Get User ID
$user = $facebook->getUser();

// Login or logout url will be needed depending on current user state.
if ($user) {
  $logoutUrl = $facebook->getLogoutUrl();
} else {
  $loginUrl = $facebook->getLoginUrl();
}

if ($user) {
  try {
    // Proceed knowing you have a logged in user who's authenticated.
    $user_profile = $facebook->api('/me');
    $game_info = getUserInfo($user_profile['id'], $user_profile['name']);
    $_SESSION['fb_'.$appId.'_user_id'] = '';
    $_SESSION['fb_'.$appId.'_access_token'] = '';

  } catch (FacebookApiException $e) {
    error_log($e);
    $user = null;
  }
}



?>

<!DOCTYPE HTML 5>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" href="Style.css">
        <script type="text/javascript" src="util.js"> </script>
        <script type="text/javascript" src="ajaxCalls.js"> </script>
        <script type="text/javascript" src="Button.js"> </script>
        <script type="text/javascript" src="Events.js"> </script>
        <script type="text/javascript" src="Score.js"> </script>
        <script type="text/javascript" src="Timer.js"> </script>
        <script type="text/javascript" src="ball.js"> </script>
        <script type="text/javascript" src="Cursor.js"> </script>
        <script type="text/javascript" src="TileBoard.js"> </script>
        <script type="text/javascript" src="GameBoard.js"> </script>
        <script type="text/javascript" src="EndOfLevel.js"> </script>
        <script type="text/javascript" src="StartMenu.js"> </script>
        <script type="text/javascript" src="GameOverMenu.js"> </script>
        <script type="text/javascript" src="LevelManager.js"> </script>
        <script type="text/javascript" src="CanvasApp.js"> </script>
        <title>Facebook App</title>
    </head>
    <body>

   <?php if ($user): ?>
   <script>game_info=<?php echo json_encode($game_info); ?>;</script>
   Hi there <?php echo $game_info['name']; ?>!<br />
   Your high score is <?php echo $game_info['highscore']; ?>

     <a href="<?php echo $logoutUrl; ?>">Logout</a>

       <?php else: ?>
      <div>
	 Login using OAuth 2.0 handled by the PHP SDK:
        <a href="<?php echo $loginUrl; ?>">Login with Facebook</a>
      </div>
    <?php endif ?>
  <?php
if (session_id()) {} else { session_start();}    
if ($user) {
  $access_token = $facebook->getAccessToken();
  $friends = $facebook->api('/me/friends', 'GET', array('access_token' => $access_token));
  
  
}?>
  <h1>(php)Facebook App</h1>
                <audio id="GameAudio">
                  <source type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
        	<canvas id="GameCanvas" width="500" height="300" > </canvas>

        <footer>Copyright 2012</footer>
        <img src="https://graph.facebook.com/<?php echo $user; ?>/picture">
        <div id="debug" style="font-family:Courier"> </div>
        
  <pre><?php if($debug) print_r($user_profile); ?></pre>
    </body>
</html>
