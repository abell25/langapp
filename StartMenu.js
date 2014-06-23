function StartMenu() {
	this.startButtonWidth = 200;
	this.startButtonX = Math.floor((CANVAS_WIDTH - this.startButtonWidth)/2);
	this.startButton = new Button(this.startButtonX, Math.floor(0.6*CANVAS_HEIGHT), this.startButtonWidth, 60, "Start!");
	
	this.draw = function(context) {
	    this.drawTitle(context);
	    
	    this.startButton.draw(context);
	}
	
	this.update = function() {
		this.startButton.update();
	}
	
	this.drawTitle = function(context) {
		context.fillStyle = "white";
		context.font = "90 px serif";
		context.textBaseline = "top";
		var title = "LangApp";
		var x = center(0, CANVAS_WIDTH, title, context);
		var y = 40;
		context.fillText(title, x, y);
	}
	
}