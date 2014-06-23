var wordList = [];

function  getWordList() {
    debug("starting ajax call.");
    //We need to make a async call to get words from getKeyValPair.php
    ajaxCall("http://www.anthonybell.net/code/js/LangApp/apptastic/getKeyValPair.php", fillWordList);
}
function updateHighScore(id, newHiScore, level) {
    debug("updating highscore");
    //debug("http://www.anthonybell.net/code/js/LangApp/apptastic/updateHiScore.php?id=" + id + "&newHiScore=" + newHiScore + "&level=" + level);
    ajaxCall("http://www.anthonybell.net/code/js/LangApp/apptastic/updateHiScore.php?id=" + id + "&newHiScore=" + newHiScore + "&level=" + level, scoreUpdated);
}
var obj;
function ajaxCall(url, callback) {
   if (window.XMLHttpRequest) {
       obj = new XMLHttpRequest();
       //obj.onreadystatechange = processChange;
       obj.onreadystatechange = function() {
           if (obj.readyState == 4 && obj.status == 200) {
               callback();
           }
       };
       obj.open("GET", url, true);
       obj.send(null);
       debug("end");
   } else if (window.ActiveXObject) {
       obj = new ActiveXObject("Microsoft.XMLHTTP");
       obj.onreadystatechange = processChange;
       obj.open("GET", url, true);
       obj.send();
   } else {
       alert("ajax not supported!");
   }
}

function fillWordList() {
    debug("status changed. readyState=" + obj.readyState + ", status=" + obj.status);
    debug("the_response_Text_=" + obj.responseText);
    var response = eval(obj.responseText);
    wordList = response;
}
function scoreUpdated() { debug("hiScore updated!"); }