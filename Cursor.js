var X_POS = 100;
var Y_POS = 100;

var CLICK_X = 0;
var CLICK_Y = 0;
var CLICK_TIME = 0;

function Cursor(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	
	this.update = function() {
		//this.inBounds();
		this.x = X_POS;
		this.y = Y_POS;	
			
		
	}
	this.draw = function(context) {
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		//debug("drawBall called");
	}
	
}