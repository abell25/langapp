var TILE_WIDTH = 50;
var TILE_HEIGHT = 50;
var TILES_PER_BOARD = 14;
var TILES_PER_COLUMN = 6;
//var SPEED = 4;
var BOARD_WIDTH = TILE_WIDTH * TILES_PER_BOARD;
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
	       "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
function TileBoard() {
	this.x = 0;
	//this.x = BOARD_WIDTH;
	this.columns = new Array(TILES_PER_BOARD);
	this.wordToFind = "";
	this.wordTranslation = "";
	this.wordLink = "";
	this.start = -1;
	this.lettersFound = new Array(TILES_PER_BOARD);
	this.scoreSent = false;
	this.speed = 1;
	
	this.newBoard = function(speed) {
		this.speed = speed;
		this.fillBoard();
		this.getNewWordPair();
		this.placeWord(this.wordToFind);
		this.initFoundArray();
		this.scoreSent = false;
	}
	
	
	this.fillBoard = function() {
		for(var i=0; i < TILES_PER_BOARD; i++) {
			this.columns[i] = new Array(TILES_PER_COLUMN);
			for (var j=0; j < TILES_PER_COLUMN; j++) {
				var myChar = letters[Math.floor(Math.random() * letters.length)];
				this.columns[i][j] = myChar; 
			}
		}
		//debug("fillBoard ran!");
	}
	
	this.getString = function() {
		n_debug("");
		n_debug("Word to find: " + this.wordToFind);
		for(var i=0; i < TILES_PER_COLUMN; i++) {
			var str = "[";
			for (var j=0; j < TILES_PER_BOARD;j++) {
				str += " (" + this.columns[j][i] + ") ";
			}
			str += "]";
			n_debug(str);
		}

	}
	
	this.placeWord = function(word) {
		this.wordToFind = word;
		var lastAvailColumn = (TILES_PER_BOARD - word.length)-1;
		//debug("last AvailColumn = " + lastAvailColumn);
		var start = Math.round(Math.random() * lastAvailColumn);
		this.start = start;
		//debug("selected index = " + start);
		prevIndex = 0;
		for (var i=0;i < word.length; i++) {
			var index = 0;
			if (i == 0) {
				index = Math.floor(Math.random() * TILES_PER_COLUMN);
				//debug(index + " out of " + TILES_PER_COLUMN);
			} else {
				if (prevIndex == 0) {
					index = Math.round(Math.random());
				}  else if (prevIndex == (TILES_PER_COLUMN-1)) {
					index = (TILES_PER_COLUMN-2) + Math.round(Math.random());
				} else {
					index = (prevIndex-1) + Math.round(Math.random() * 2);
				}
				//debug("(" + index + ")");
			}
			prevIndex = index;
			for(var j=0; j < TILES_PER_COLUMN;j++) {
				while (this.columns[(start+i)][j] == word.charAt(i)) {
					this.columns[(start+i)][j] = letters[Math.floor(Math.random() * letters.length)];
				}
			}
			this.columns[(start+i)][index] = word.charAt(i);
		}	
		
	}
	this.getNewWordPair = function() {
		//This is gonna use ajax
                /*
		var a1 = ["hola", "que pasa", "matador", "biblioteca", "paraguas"];
		var a2 = ["hello", "whats up", "killer", "library", "umbrella"];
		var index = Math.floor(Math.random() * a1.length);
		this.wordToFind = a1[index];
		this.wordTranslation = a2[index];
		*/
		
		if (wordList.length == 0) { getWordList(); }
		if (wordList.length == 0) { 
                    debug("hey wordList was not populated!");
                    var a1 = ["hola", "que pasa", "matador", "biblioteca", "paraguas"];
	 	    var a2 = ["hello", "whats up", "killer", "library", "umbrella"];
		    var index = Math.floor(Math.random() * a1.length);
		    this.wordToFind = a1[index];
		    this.wordTranslation = a2[index];
                }else {
		var index = Math.floor(Math.random() * wordList.length);
		while (wordList[index]['sp'] == null) index = Math.floor(Math.random() * wordList.length);
		this.wordToFind = wordList[index]['sp'];
		this.wordTranslation = wordList[index]['en'];
		this.wordLink = wordList[index]['link'];
		}
		
	}
	
	this.draw = function(context) {
		context.font = "50px serif";
		context.fillStyle = "#333333";
		context.strokeStyle = "#333333";
		context.textBaseline = "top";
		for (var i = 0; i < TILES_PER_BOARD; i++) {
			for (var j = 0; j < TILES_PER_COLUMN; j++) {
				this.drawTile(context, i, j);
			}
		}
		//letters found!
		context.fillStyle = "white";
		context.strokeStyle = "white";
		for (var i = 0; i < TILES_PER_BOARD; i++) {
			if (this.lettersFound[i] > -1) {
				this.drawTile(context, i, this.lettersFound[i]);
			}
		}

	}
	
	this.update = function() {
		this.x -= this.speed;
	}
	
	this.drawTile = function(context, i, j) { 
				var x_pos = this.x + (i*TILE_WIDTH);
				var y_pos = (j*TILE_HEIGHT);
				//context.strokeRect(x_pos, y_pos, TILE_WIDTH, TILE_HEIGHT);
				var theLetter = this.columns[i][j];
				var metrics = context.measureText(theLetter);
				var letterWidth = metrics.width;
				var letter_x_pos = x_pos + Math.round((TILE_WIDTH/2)-(letterWidth/2));
				context.fillText(theLetter, letter_x_pos, y_pos);
	}
	
	this.selectedTile = function(context, col, row) {
		context.fillStyle = "#FF00CC";
		context.font = "50px serif";
		context.textBaseline = "top";
		this.drawTile(context, col, row);
		var index = col - this.start;
		if ((col >= this.start) && index < this.wordToFind.length) {
			if (this.wordToFind.charAt(index) == this.columns[col][row]) {
				//they found it! but i want to make sure they got all the previous letters...
				var prevLettersFound = true;
				for (var i=0; i < index; i++) {
					if (this.lettersFound[this.start+i] < 0) { prevLettersFound = false;}
				}
				if(prevLettersFound) {
					this.lettersFound[col] = row;
					if (index == this.wordToFind.length-1) {
						this.entireWordFound();
					}
				}
				
				//debug("letterFound!!=" + this.wordToFind.charAt(index) + ", row=" + row + ", col=" + col);
			}
		}
	}
	
	this.initFoundArray = function() {
		for (var i = 0; i < TILES_PER_BOARD; i++) {
			this.lettersFound[i] = -1;
		}	
	}
	
	this.entireWordFound = function() {
		if (this.scoreSent == false) {
			//debug("You found the whole word! this.scoreSend=" + this.scoreSent);
			this.scoreSent = true;
			score.addPoints(this.wordToFind);
		}
	}
	
	
}
