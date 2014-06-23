
function Ball(x, y, v_x, v_y, r) {
	this.x = x;
	this.y = y;
	this.v_x = v_x;
	this.v_y = v_y;
	this.r = r;
	
	this.update = function() {
		this.inBounds();
		this.x += this.v_x;
		this.y += this.v_y;	
			
		
	}
	this.draw = function(context) {
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
		//debug("drawBall called");
	}
	this.inBounds = function() {
		//width = document.getElementById("GameCanvas").getAttribute("width");
		//height = document.getElementById("GameCanvas").getAttribute("height");
		
		if (this.x > (CANVAS_WIDTH-this.r)) {
			this.x = (CANVAS_WIDTH-this.r);
			this.v_x = -Math.abs(this.v_x);
		}
		if (this.x < this.r) {
			this.x = this.r;
			this.v_x = Math.abs(this.v_x);
		}
		if (this.y > (CANVAS_HEIGHT-this.r)) {
			this.y = (CANVAS_HEIGHT-this.r);
			this.v_y = -Math.abs(this.v_y);
		}
		if (this.y < this.r) {
			this.y = this.r;
			this.v_y = Math.abs(this.v_y);
		}
		
	}
}

