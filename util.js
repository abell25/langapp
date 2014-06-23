DEBUG_ON = false;

function debug(txt) {
	if (DEBUG_ON){
		var div = document.getElementById("debug");
		var text = document.createTextNode(" [" + txt + "] ");
		div.appendChild(text);
	}
}
function n_debug(txt) {
	if (DEBUG_ON) {
		var div = document.getElementById("debug");
		var text = document.createTextNode(txt);
		div.appendChild(text);
		var br = document.createElement("br");
		div.appendChild(br);
	}
}

function center(x1, x2, word, context) {
	var metrics = context.measureText(word);
	var wordWidth = metrics.width;
	return ((x2-x1) - wordWidth)/2;
}

