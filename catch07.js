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

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Reset the game when the player catches a symbols
var reset = function () {

	// Throw the symbols somewhere on the screen randomly
	symbols.x = symbolsImage.width + (Math.random() * (canvas.width - (2 * symbolsImage.width)));
	symbols.y = symbolsImage.height + (Math.random() * (canvas.height - (2 * symbolsImage.height)));
};

// Update game objects called from the main function
// delta = number of miliseconds between calls
var update = function (delta) {
	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * delta;
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * delta;
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * delta;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * delta;
	}
	
	symbols.x += (symbols.speed * direction * delta);

	// Are they touching?
	if (
		hero.x <= (symbols.x + symbolsImage.width)
		&& symbols.x <= (hero.x + heroImage.width)
		&& hero.y <= (symbols.y + symbolsImage.height)
		&& symbols.y <= (hero.y + heroImage.height)
	) {
		++symbolCaught;
		reset();
	}	
	
	// Setting boundaries
	if(hero.x < 0) {
		hero.x = 0;
	}

	if(hero.y < 0) {
		hero.y = 0;
	}
	
	if(symbols.x < 0) {
		direction = -direction;
	}

	if(hero.x > canvas.width-heroImage.width ) {
		hero.x = canvas.width-heroImage.width;
	}
	if(hero.y > canvas.height-heroImage.height) {
		hero.y = canvas.height-heroImage.height;
	}
	if(symbols.x > canvas.width -symbolsImage.width ) {
		direction = -direction;
	}

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
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible