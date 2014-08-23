// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 22.01 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keyUp = {};

addEventListener("keydown", function (e) {
	keyUp[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keyUp[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = 32*5 - 3;
	hero.y = 32*5 - 4;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32*(Math.floor(Math.random() * (canvas.width)/32.0)) - 3;
	monster.y = 32*(Math.floor(Math.random() * (canvas.height)/32.0)) - 3;
};

// Update game objects
var update = function () {
	if (65 in keyUp) { // Player holding up
		hero.x -= Math.sqrt(3)*hero.speed;
		delete keyUp[65];
	}
	if (87 in keyUp) { // Player holding down
		hero.x -= Math.sqrt(3)*hero.speed/2;
		hero.y -= 1.5*hero.speed;
		delete keyUp[87];
	}
	if (69 in keyUp) { // Player holding left
		hero.x += Math.sqrt(3)*hero.speed/2;
		hero.y -= 1.5*hero.speed;
		delete keyUp[69];
	}
	if (68 in keyUp) { // Player holding left
		hero.x += Math.sqrt(3)*hero.speed;
		delete keyUp[68];
	}
	if (90 in keyUp) { // Player holding left
		hero.x -= Math.sqrt(3)*hero.speed/2;
		hero.y += 1.5*hero.speed;
		delete keyUp[90];
	}
	if (88 in keyUp) { // Player holding right
		hero.x += Math.sqrt(3)*hero.speed/2;
		hero.y += 1.5*hero.speed;
		delete keyUp[88];
	}
	
	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
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

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Destination reached: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	
	update();
  	render();
	// Request to do this again ASAP
	
	then = now;
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
