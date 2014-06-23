//THis will show the total score, their best score (with db implimentation), and friend's score (with open graph implimentation)
function EndOfLevel() {
	this.score = 0;
	this.hiScore = 0;
        this.retryText = "retry?";
	this.nextText = "next level";
	this.retryButton;
	this.nextButton;
	this.newHiScore = false;
	this.retryLevel = false;
	this.nextLevel  = false;
	
	this.init = function(levelScore) {
	    this.score = levelScore;
	    debug("this.score=" + String(this.score));
	    this.retryButton = new Button(0, 220, CANVAS_WIDTH/2, 60, "retry?");
	    this.nextButton  = new Button(CANVAS_WIDTH/2, 220, CANVAS_WIDTH/2, 60, "next level");
	    debug("buttons init!  score:----------->" + this.score);
            if (game_info["level"+levelManager.currentLevel]<this.score){
	        this.newHiScore = true;
                game_info["level"+levelManager.currentLevel] = this.score;
		updateHighScore(game_info["id"], this.score, levelManager.currentLevel);
            } else {
		this.newHiScore = false;
            }
	}
	
	this.update = function() {
		if (this.retryButton.pressed) {
			this.retryLevel = true;
		} else if (this.nextButton.pressed) {
			this.nextLevel = true;
		} else {
			
		}
		
	}
	
	this.draw = function(context) {
		var topBarColor = "#0066CC";
		context.fillStyle = topBarColor;
		context.fillRect(0, 0, CANVAS_WIDTH, 60);
		var levelText = "Level " + String(levelManager.currentLevel + 1);
		var textHeight = 40;
		context.font = textHeight+"px serif";
		context.textBaseline = "top";
		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		var scoreText = "You scored " + String(this.score) + " points!";
                context.fillText(scoreText, 30, 80);
		context.fillText(levelText, 30, 10);
		var hiScoreText = this.newHiScore ? "New Hi Score! " : 
                    "Hi Score: " + game_info["level"+levelManager.currentLevel];
                context.fillText(hiScoreText, 30, 150);
                this.retryButton.draw(context);
		this.nextButton.draw(context);
	}
	
	
}
