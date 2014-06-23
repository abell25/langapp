
function Timer() {
	//Keep all time in milliseconds and only convert if needed
	this.millisecsTotal;
	this.timeStart;
	this.timeLeftString;
	this.timesUp;
	
        this.pauseStart;
        this.pause = function() {
            var clock = new Date();
            this.pauseStart = clock.getTime();
        }
        this.resume = function() {
            var clock = new Date();
            var timePaused = clock.getTime() - this.pauseStart;
            this.timeStart += timePaused;
            //this.millisecsTotal += timePaused;
	}
	this.init = function(seconds) {
		this.timesUp = false;
		this.millisecsTotal = seconds*1000;
		var clock = new Date();
		this.timeStart = clock.getTime();
		this.update();
	}
	
	
	this.draw = function(context) {
		var textHeight = 30;
		context.font = textHeight+"px serif";
		context.textBaseline = "top";
		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		context.fillText("Time Left", 350, 240);
		context.fillText(this.timeLeftString, 350, 270);
	}
	
	this.update = function() {
		var clock = new Date();
		var timeElapsed = clock.getTime() - this.timeStart;
		var timeRemaining = this.millisecsTotal - timeElapsed;
		//debug(timeRemaining);
		var secondsRemaining = timeRemaining/1000;
		var mins = String(Math.floor(secondsRemaining/60));
		var secs = String(Math.floor(secondsRemaining%60));
		if (secs.length == 1) { secs = "0" + secs; }
		
		this.timeLeftString = mins + ":" + secs;
		if (timeRemaining <= 0) { this.timesUp = true;  this.timeLeftString = "Times up!"; }
	}
	
	this.nextLevel = function(secondsForLevel) {
		this.init(secondsForLevel);
	}
	
}
