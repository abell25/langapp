function Button(x, y, width, height, text) {
	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.text = text;
	
	//Set these manually
	this.enabled = true;
	this.color = "#0066CC";
	this.textColor = "white";
	this.textHoverColor = "red";
	this.textX;
	this.offSetX = 20;
	this.textOffSetY = 10;
	this.pressed = false;
	this.hover = false;
	this.born = (new Date()).getTime();
	this.font = String(this.height-2*this.textOffSetY)+"px serif";
	
	this.draw = function(context) {
		context.fillStyle = this.color;
		context.font = this.font;
		context.textBaseline = "top";
		var buttonWidth = this.width - (2*this.offSetX);
		var leftOffset = this.x + this.offSetX;
		context.fillRect(leftOffset, this.y, buttonWidth, height);
		context.fillStyle = (this.hover) ? this.textHoverColor : this.textColor;
		this.textX = x + center(x, x + width, this.text, context);
		context.fillText(this.text, this.textX, this.y + this.textOffSetY);
		this.update();
	}
	
	this.update = function() {
		if (this.onButton(X_POS, Y_POS)) { this.hover = true; }
		else { this.hover = false; }
		if (!this.pressed && CLICK_TIME > this.born && this.onButton(CLICK_X, CLICK_Y)) {
			debug("button pressed! by :" + this.text);
			this.pressed = true;
		}
		
	}
	
	this.onButton = function(x, y) {
		if (x > this.x && x < this.x + this.width) {
			if ( y > this.y && y < this.y + this.height) {
				return true;
			}
		}
		return false;
	}
	
}
