function GameOverMenu() {
	this.startOverButton;
	this.tellMyFriendsButton;
	
	this.init = function() {
		this.startOverButton = new Button(0, 220, CANVAS_WIDTH/2, 60, "Restart!");
		this.tellMyFriendsButton = new Button(CANVAS_WIDTH/2, 220, CANVAS_WIDTH/2, 60, "Post Score!");
	}
	
	this.draw = function(context) {
		this.drawTitle(context);
		this.startOverButton.draw(context);
		this.tellMyFriendsButton.draw(context);
	}
	
	this.update = function() {
		this.startOverButton.update();
		this.tellMyFriendsButton.update();
	}
	
	this.drawTitle = function(context) {
		context.fillStyle = "white";
		context.font = "90 px serif";
		context.textBaseline = "top";
		var title = "Game Over";
		var x = center(0, CANVAS_WIDTH, title, context);
		var y = 40;
		context.fillText(title, x, y);
	}
	
}
