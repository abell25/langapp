var BOARD_WIDTH = TILES_PER_BOARD*TILE_WIDTH;
//This guy manages the position of the two boards, determaining when to refill and move a board
function GameBoard() {
	this.board_A;
	this.board_B;
    this.onBoard_A = true;
    this.row = 0;
    this.column = 0; 
    this.currentWord = "";
    this.speed;

   
	this.start = function (speed) {
		this.speed = speed;
		this.board_A = new TileBoard();
		this.board_B = new TileBoard();
		this.board_A.newBoard(speed);
		this.board_B.newBoard(speed);
		this.board_B.x = BOARD_WIDTH;
	}
	
	this.draw = function(context) {
		this.board_A.draw(context);
		this.board_B.draw(context);
		//ball.draw(context);
		this.drawCurrentWord(context);
		if (this.onBoard_A) { this.board_A.selectedTile(context, this.column, this.row);}
		else { this.board_B.selectedTile(context, this.column, this.row); }
	}
	
	this.update = function() {
		this.board_A.update();
		this.board_B.update();
		this.updateCurrentWord();
		//ball.update();
		cursor.update();
		if((this.board_A.x+BOARD_WIDTH) <= 0) {
			this.board_A.x = (this.board_B.x+BOARD_WIDTH);
			this.board_A.newBoard(this.speed);
			var audioSrc = "http://wordsgalore.com/wordsgalore/languages/spanish/" + this.board_A.wordLink;
			debug(audioSrc);
			document.getElementById("GameAudio").setAttribute("src", audioSrc);
			document.getElementById("GameAudio").play();
			//this.board_A.getString();
		}
		if((this.board_B.x+BOARD_WIDTH) <= 0) {
			this.board_B.x = (this.board_A.x+BOARD_WIDTH);
			this.board_B.newBoard(this.speed);
			var audioSrc = "http://wordsgalore.com/wordsgalore/languages/spanish/" + this.board_B.wordLink;
			debug(audioSrc);
			document.getElementById("GameAudio").setAttribute("src", audioSrc);
			document.getElementById("GameAudio").play();
			//this.board_B.getString();
		}
		//this.selectedTile(ball.x, ball.y);
		this.selectedTile(cursor.x, cursor.y);
		//debug("row=" + this.row + ", column=" + this.column);
	}
	
	//Determains which tile is selected
	this.selectedTile = function(x_pos, y_pos) {
		this.row = Math.floor(y_pos/TILE_HEIGHT);
		if (x_pos > this.board_A.x && x_pos < (this.board_A.x + BOARD_WIDTH)) {
			this.column = Math.floor((x_pos-this.board_A.x)/TILE_WIDTH);
			this.onBoard_A = true;
			//this.board_A.selectedTile(getContext(), this.column, this.row);
		} else {
			this.column = Math.floor((x_pos-this.board_B.x)/TILE_WIDTH);
			if (this.column == TILES_PER_BOARD) {this.column = TILES_PER_BOARD-1;} //occurs at the boundery between the boards
			this.onBoard_A = false;
			//this.board_B.selectedTile(context, this.column, this.row);
		}
	}
	
	//Based on the position of the boards, determains what word is the current word
	var whereToSwitch = Math.floor(CANVAS_WIDTH*1);
	this.updateCurrentWord = function() {
		
		if      (this.board_A.x > whereToSwitch)
                    { this.currentWord = this.board_B.wordTranslation; }
		else if (this.board_B.x > whereToSwitch)
                    { this.currentWord = this.board_A.wordTranslation; }
		else
                    { this.currentWord = (this.board_A.x > this.board_B.x) ?
                    this.board_A.wordTranslation : this.board_B.wordTranslation; }
	}
	
	this.drawCurrentWord = function(context) {
		//var height = Math.floor(CANVAS_HEIGHT * 0.1);
		var width =  Math.floor(CANVAS_WIDTH  * 0.8);
		var textHeight = 80;
		context.font = textHeight+"px serif";
		context.fillStyle = "rgba(0, 0, 200, 0.5)";
		context.textBaseline = "top";
		var metrics = context.measureText(this.currentWord);
		var wordWidth = metrics.width;
		var word_x_pos = Math.round((CANVAS_WIDTH/2)-(wordWidth/2));
		var y_pos = 20;
		var x_offset= 10; var y_offset = 5;
		context.fillRect(word_x_pos-x_offset, y_pos-y_offset, wordWidth+(2*x_offset), 80+(2*y_offset));
		context.fillStyle = "rgba(255, 255, 255, 0.5)";
		context.fillText(this.currentWord, word_x_pos, y_pos);
	}
	
	
}
