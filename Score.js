
function Score() {
	this.score = 0;
	this.totalScore = 0;
	this.congrats = ["good!", "great!", "good work!", "excellent!", "wow!"];
	this.currCongrat = "";
	this.currWordPoints = 0;
	this.congratStart = 0;
	this.congratLength = 3000;
	this.showingCongrat = false;
	
	this.draw = function(context) {
		var textHeight = 30;
		context.font = textHeight+"px serif";
		context.textBaseline = "top";
		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		context.fillText("score", 5, CANVAS_HEIGHT-(2*textHeight));
		context.fillText(String(this.score), 5, CANVAS_HEIGHT-textHeight);
		if (this.showingCongrat) { 
			this.drawAddPoints(context);
		}
	}
	
	this.update = function() {
		if (this.showingCongrat) {
			var d = new Date();
			if ( (d.getTime() - this.congratStart) > this.congratLength) { this.showingCongrat = false; }
		}

	}
	
	
	this.addPoints = function(foundWord) {
		this.score += foundWord.length;
		this.currWordPoints = foundWord.length;
		//debug("score=" + this.score);
		
		
		this.showingCongrat = true;
		var congratIndex = Math.floor(Math.random()*this.congrats.length);
		this.currCongrat = this.congrats[congratIndex];
		var d = new Date();
		this.congratStart = d.getTime();
	}
	
	this.drawAddPoints = function(context) {
		var textHeight = 60;
		context.font = textHeight+"px serif";
		context.textBaseline = "top";
		context.fillStyle = "rgba(255, 255, 255, 0.9)";
		context.fillText(this.currCongrat, 200, CANVAS_HEIGHT-(2*textHeight));//180
		var points = "+" + String(this.currWordPoints);
		context.fillText(points, 200, CANVAS_HEIGHT-textHeight);
		//context.fillText(String(this.score), 200, 240);
	}
	
	this.nextLevel = function() {
		this.totalScore += this.score;
		this.score = 0;
	}
	
}
