//enum Directions {Left, TopLeft, TopRight, Right, DownRight, DownLeft};
//var d: Direction = Directions.Left;

//Canvas 
var canvas = document.createElement("canvas");
canvas.setAttribute("id", "canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    ctx.drawImage(bgImage, 0, 0);
};

size=22.01;

//Hex class
var Hex = function(id,direction,shade,position) {
    this.id = id;
	this.direction=direction;
	this.shade=shade;
	this.posx=position[0];
	this.posy=position[1];
    
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "hexagon_"+this.shade);
    this.div.setAttribute("onclick", "move(this)");
    
    //this.hexImage = new Image();
    //this.hexImage.src = "images/hero.png";
    
    document.body.insertBefore(this.div, canvas);
    //document.getElementById(id).appendChild(this.hexImage);
}

// Hex image
show = function(hex){
    document.getElementById(hex.id).style.position="fixed";
    document.getElementById(hex.id).style.left=hex.posx + "px";
    document.getElementById(hex.id).style.top=hex.posy + "px";
};

move = function(elm, dirn) {
    hex = hexArr[elm.id-1];
    direction = hex.direction;
    if (typeof dirn != 'undefined') {direction = dirn};
    console.log(direction);
    if (direction == "Left")       { hex.posx -= Math.sqrt(3)*size; }
	if (direction == "TopLeft")    { hex.posx -= Math.sqrt(3)*size/2; hex.posy -= 1.5*size; }
	if (direction == "TopRight")   { hex.posx += Math.sqrt(3)*size/2; hex.posy -= 1.5*size; }
	if (direction == "Right")      { hex.posx += Math.sqrt(3)*size; }
	if (direction == "DownRight")  { hex.posx += Math.sqrt(3)*size/2; hex.posy += 1.5*size; }
    if (direction == "DownLeft")   { hex.posx -= Math.sqrt(3)*size/2; hex.posy += 1.5*size; }
    push = null;
    for (i = 0; i<arrayLength; i++) {
        if (Math.abs(hexArr[i].posx - hex.posx)<0.1 && Math.abs(hexArr[i].posy - hex.posy)<0.1 && hexArr[i].id!=hex.id) {
            push = hexArr[i]; break;
    }}
    show(hex);
    if (push) {move(push.div, direction);}
};

var hexArr = [];
var myhex1 =new Hex(1,"Left",1,[165.5,161.4]);
var myhex2 =new Hex(2,"TopRight",2,[165.5-Math.sqrt(3)*size,161.4+3*size]);
var myhex3 =new Hex(3,"Right",3,[165.5-3*Math.sqrt(3)*size,161.4]);

hexArr.push(myhex1);
hexArr.push(myhex2);
hexArr.push(myhex3);

var arrayLength = hexArr.length;
for (i = 0; i<arrayLength; i++) {
    show(hexArr[i]);
}
