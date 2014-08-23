//enum Directions {Left, TopLeft, TopRight, Right, DownRight, DownLeft};
//var d: Direction = Directions.Left;

//Canvas 
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    console.log("onload");
    ctx.drawImage(bgImage, 0, 0);
};

var hexReady = false;
var hexImage = new Image();
hexImage.onload = function () {
	hexReady = true;
    console.log("onload hex");
};
hexImage.src = "images/hero.png";
size=22.01;

//Hex class
var Hex = function(direction,shade,position) {
	this.direction=direction;
	this.shade=shade;
	this.posx=position[0];
	this.posy=position[1];
//	console.log("Hex created. direction - "+direction+". shade - "+shade+". x - "+self.posx+". y - "+self.posy);	
}


// Hex image
Hex.prototype.show = function(){
 	console.log("image"+hexImage.src+". x-"+this.posx +". y-"+ this.posy);
    console.log(bgImage.src);
    
 	if (hexReady) {
 		canvas.width = canvas.width;
        ctx.drawImage(bgImage, 0,0);
 		ctx.drawImage(hexImage, this.posx, this.posy);
	}
};

Hex.prototype.move = function() {
	if (this.direction == "Left") { // Hex direction is Left
		this.posx -= Math.sqrt(3)*size;
	}
	if (this.direction == "TopLeft") { // Hex direction is TopLeft
		this.posx -= Math.sqrt(3)*size/2;
		this.posy -= 1.5*size;
	}
	if (this.direction == "TopRight") { // Hex direction is TopRight
		this.posx += Math.sqrt(3)*size/2;
		this.posy -= 1.5*size;
	}
	if (this.direction == "Right") { // Hex direction is Right
		this.posx += Math.sqrt(3)*size;
	}
	if (this.direction == "DownRight") { // Hex direction is DownRight
		this.posx -= Math.sqrt(3)*size/2;
		this.posy += 1.5*size;
	}
	if (this.direction == "DownLeft") { // Hex direction is DownLeft
		this.posx += Math.sqrt(3)*size/2;
		this.posy += 1.5*size;
	}
};

var myhex =new Hex("Right","Blue",[157,156]);

myFunction = function(){
	myhex.move();
	myhex.show();
};
// list of hexes, history, 
// function Map (){}
