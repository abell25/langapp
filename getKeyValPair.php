<?php
    $FILENAME = "SpanishEnglishAudio.txt";
    //printText($FILENAME);
    getNWords($FILENAME, 10);
    
    function printText($filename) {
      $fh = fopen($filename, "r");
      while (!feof($fh)) {
          $line = fgets($fh, 99);
          $words = explode("#", $line);
          echo $words[0] . " ---> " . $words[1] . '--->' . $words[2] . '<br />';
      }
    }
    
    function getNWords($filename, $no_words) {
        $fh = file($filename);
        shuffle($fh);
        $keys = array_rand($fh, $no_words);
        $words = array();
        foreach ($keys as $key) { 
            //echo $fh[$key];
            $word = array();
            $line = explode("#", $fh[$key]);
            //$words[$pair[0]] = rtrim($pair[1]);
            $word['sp'] = $line[0];
            $word['en'] = rtrim($line[1]);
            $word['link'] = rtrim($line[2]);
            array_push($words, $word);
        }
        echo json_encode($words);
    }
	//get a key/val and return it
?>