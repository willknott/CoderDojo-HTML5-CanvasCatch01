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


// Draw everything
var render = function () {
	{
		ctx.drawImage(bgImage, 0, 0);
	}
var symbolCaught = 0
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

setInterval(main, 1); // Execute as fast as possible