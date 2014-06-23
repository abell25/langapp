var timer = new Timer();
var score = new Score();
var cursor = new Cursor(100, 50, 15);

//Singleton
function LevelManager() {
	this.gameBoard;
	this.levelMenu;
	this.level =    [ 1, 2, 3, 4, 5, 6, 7, 8];
	this.speed =    [ 1, 1, 2, 3, 4, 5, 6, 6];
	this.powerUps = [.0,.1,.2,.3,.4,.5,.6,.7];
	this.timeGiven = [60,60,60,60,60,60,60,60];
	this.currentLevel = 0;

	this.levelOver;
	this.gameOver;
	
	this.init = function() {
		this.levelOver = false;
		timer = new Timer();
		this.levelMenu = new EndOfLevel();
		this.gameBoard = new GameBoard();
		this.gameBoard.start(this.speed[this.currentLevel]);
	    timer.init(this.timeGiven[this.currentLevel]);
	}
	
	
	this.update = function() {
		if (!timer.timesUp) {
			this.gameBoard.update();
			timer.update();
			score.update();
		} else {
			if (this.levelOver == false) { this.levelFinished(); }
			this.levelMenu.update();
			if (this.levelMenu.retryLevel) { this.retryLevel(); }
			if (this.levelMenu.nextLevel) { this.nextLevel(); }
		}

	}
	
	this.draw = function(context) {
		//if (!timer.timesUp) {
		if (this.levelOver == false) {
			this.gameBoard.draw(context);
			timer.draw(context);
			score.draw(context);
		} else {
			//this.update();
			this.levelMenu.draw(context);
		}

	}
	
	//this is one-time function
	this.levelFinished = function() {
		debug("level finished called!");
		this.levelOver = true;
		debug("levelFinished");
		this.levelMenu.init(score.score);

	}
	
	this.retryLevel = function() {
		score.nextLevel();
		this.init();
	}
	
	this.nextLevel = function() {
		if (DEBUG_ON && this.currentLevel == 2) { this.gameOver = true; }
		else {
			this.currentLevel++;
			score.nextLevel();
			this.init();
		}
		//debug("level: " + String(this.currentLevel+1));
	}
	
	
}
