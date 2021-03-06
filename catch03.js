// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image(); //we have an image object
bgImage.src = "chpaper.png";
bgImage.onload = function () {
	//different way to create a function
	bgReady = true;
};

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "redl.png";

var hero = {
	speed: 200 // movement in pixels per second
};  //created and edited an aspect of the hero object
hero.x = canvas.width / 2;
hero.y = canvas.height / 2;

// symbol image
var symbolsReady = false;
var symbolsImage = new Image();
symbolsImage.onload = function () {
	symbolsReady = true;
};
symbolsImage.src = "logo.png";

var symbols = {
	speed: 100};
var symbolCaught = 0;
var direction = -1;


// Reset the game when the player catches a symbols
var reset = function () {

	// Throw the symbols somewhere on the screen randomly
	symbols.x = symbolsImage.width + (Math.random() * (canvas.width - (2 * symbolsImage.width)));
	symbols.y = symbolsImage.height + (Math.random() * (canvas.height - (2 * symbolsImage.height)));
};



// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (symbolsReady) {
		ctx.drawImage(symbolsImage, symbols.x, symbols.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px serif";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Symbols collected: " + symbolCaught , 32, 32);
};

// The main game loop
var main = function () {
	render();
};

// Let's play this game!

reset();
setInterval(main, 1); // Execute as fast as possible