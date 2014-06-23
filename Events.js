function addListeners() {
	window.addEventListener("keyup", eventKeyPressed, true);
	var canvas = document.getElementById("GameCanvas");
	canvas.addEventListener("mousemove", eventMouseMoved, true);
	canvas.addEventListener("click", eventMouseClicked, true);
}

function eventKeyPressed(e) {
	var keyPressed = String.fromCharCode(e.keyCode);
	notifyController(keyPressed);
	debug("you pressed a " + keyPressed + "!");
}

function eventMouseMoved(e) {
	
	X_POS = e.layerX;
	Y_POS = e.layerY;
	//debug("x: " + X_POS + ", y: " + Y_POS);
}

function eventMouseClicked(e) {
	debug("click!: x=" + e.layerX + ", y=" + e.layerY + " at " + (new Date()).getTime());
	CLICK_X = e.layerX;
	CLICK_Y = e.layerY;
	CLICK_TIME = (new Date()).getTime();
}

function notifyController(keyPressed) {
	if (keyPressed == "K") {
		debug("puased toggled! PAUSE is :" + PAUSED);
		PAUSED = !PAUSED;
                if (PAUSED) {timer.pause();}
                else {timer.resume();}
	}
}