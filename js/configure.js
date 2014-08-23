//enum Directions {Left, TopLeft, TopRight, Right, DownRight, DownLeft};
//var d: Direction = Directions.Left;

//Canvas 

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

var hexReady = false;
var hexImage = new Image();
hexImage.onload = function () {
	hexReady = true;
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

//var destination = {
//	posx: 100;
//	posy:100;
//};

	// Hex image
Hex.prototype.show = function(){
 	console.log("image"+hexImage.src+". x-"+this.posx +". y-"+ this.posy);
 	console.log(hexReady);
 	if (hexReady) {
 		canvas.width = canvas.width;
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
	if (this.direction == "DownLeft") { // Hex direction is DownRight
		this.posx -= Math.sqrt(3)*size/2;
		this.posy += 1.5*size;
	}
	if (this.direction == "DownRight") { // Hex direction is DownLeft
		this.posx += Math.sqrt(3)*size/2;
		this.posy += 1.5*size;
	}
	//console.log("in move");
	// // Are they touching?
	// if (
	// 	this.posx <= (destination.posx + 32)
	// 	&& destination.posx <= (this.posx + 32)
	// 	&& this.posy <= (destination.posy + 32)
	// 	&& destination.posy <= (this.posy + 32)
	// ) {
	// 	console.log("Hex reached destination");
	//	//reset();
	//}
};

var myhex =new Hex("DownRight","Blue",[10,10]);
var hex2 =new Hex("Left","Red",[40,40]);


myFunction = function(){
	myhex.move();
	myhex.show();
	hex2.show();
};
// list of hexes, history, 
// function Map (){}