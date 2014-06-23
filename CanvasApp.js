function init() {
	n_debug("app started");
	getWordList();
	addListeners();
	var theCanvas = document.getElementById("GameCanvas");
	var context = theCanvas.getContext("2d");
	setInterval(runApp, 33);
	initApp();

	function runApp() {
		if (!PAUSED) {
			updateScreen();
			drawScreen(context);
		} else {
			//updatePauseScreen();
			//drawPauseScreen(context);
		}
	}

}

window.onload = init;

var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 300;
var levelManager = new LevelManager();
var startMenu = new StartMenu();
var gameOverMenu = new GameOverMenu();
var gameOver = false;
var onStartScreen = true;
var PAUSED = false;

function initApp() {
	//levelManager.init();
}

function updateScreen() {
	if (onStartScreen) { 
		startMenu.update(); 
		if (onStartScreen && startMenu.startButton.pressed)  { levelManager.init(); }
		onStartScreen = (startMenu.startButton.pressed) ? false : true; 
	}
	else if (!gameOver){ levelManager.update(); 
		gameOver = levelManager.gameOver;
		if (gameOver) { gameOverMenu.init(); debug("initialize!");}
	}
	else { gameOverMenu.update(); }
	
	
}

function drawScreen(context) {
	context.fillStyle = "#99cccc";
	context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	if (onStartScreen) { startMenu.draw(context); }
	else if (!gameOver){ levelManager.draw(context); }
	else { gameOverMenu.draw(context); }
}



