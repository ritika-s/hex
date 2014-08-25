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

size=21.95;

//Hex class
var Hex = function(id,direction,shade,position) {
    this.id = id;
	this.direction=direction;
	this.shade=shade;
	this.posx=position[0];
	this.posy=position[1];
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "hexagon_"+this.shade+"_"+this.direction);

    this.div.setAttribute("onclick", "move(this)");
    document.body.insertBefore(this.div, canvas);
    
    for (i = 0; i<6; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "triangle");
        this.div.appendChild(tmp)
    }
}

// show function
show = function(obj){
    console.log(obj.id + " " + obj.posx + " " + obj.posy);
    document.getElementById(obj.id).style.position="fixed";
    document.getElementById(obj.id).style.left=obj.posx + "px";
    document.getElementById(obj.id).style.top=obj.posy + "px";
};

// move function
move = function(elm, dirn) {
    hex = hexArr[elm.id-1];
    console.log(elm.id);
    direction = hex.direction;
    if (typeof dirn != 'undefined') {direction = dirn};
    if (direction == 1)  { hex.posx -= Math.sqrt(3)*size; }
	if (direction == 2)  { hex.posx -= Math.sqrt(3)*size/2; hex.posy -= 1.5*size; }
	if (direction == 3)  { hex.posx += Math.sqrt(3)*size/2; hex.posy -= 1.5*size; }
	if (direction == 4)  { hex.posx += Math.sqrt(3)*size; }
	if (direction == 5)  { hex.posx += Math.sqrt(3)*size/2; hex.posy += 1.5*size; }
    if (direction == 6)  { hex.posx -= Math.sqrt(3)*size/2; hex.posy += 1.5*size; }
    push = null;
    for (i = 0; i<hexarrayLength; i++) {
        if (Math.abs(hexArr[i].posx - hex.posx)<0.1 && Math.abs(hexArr[i].posy - hex.posy)<0.1 && hexArr[i].id!=hex.id) {
            push = hexArr[i]; break;   
    }}
    for (i = 0; i<changersLength; i++) {
        if (Math.abs(changerArr[i].posx - hex.posx)<0.1 && Math.abs(changerArr[i].posy - hex.posy)<0.1) {
            update(hex, changerArr[i].direction, changerArr[i].shade); break;
    }}

    show(hex);
    if (push) {move(push.div, direction);}


};

// Update function
update = function(hex, direction, shade) {
    if (shade)        {hex.shade = shade};
    if (direction)    {hex.direction = direction};
    document.getElementById(hex.id).className = "hexagon_"+hex.shade+"_"+hex.direction;
};

// direction changer function
var Dir_changer = function(id,direction,position){
    this.id = id;
    this.direction = direction;
    this.posx = position[0];
    this.posy = position[1];
    
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "direction_"+this.direction);
    document.body.insertBefore(this.div, canvas);
    for (i = 0; i<6; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "triangle");
        this.div.appendChild(tmp)
    }
}

//Color Changer
var ColorChanger = function(id,shade,position) {
    this.id=id;
    this.shade=shade;
    this.posx=position[0];
    this.posy=position[1];

    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "cchanger");
    document.body.insertBefore(this.div, canvas);
    for (i = 0; i<6; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "triangle");
        this.div.appendChild(tmp)
    }
}

var Changer = function(id,direction,shade,position) {
    this.id=id;
    this.direction=direction;
    this.shade=shade;
    this.posx=position[0];
    this.posy=position[1];

    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    if (direction==null && shade!=null){this.div.setAttribute("class", "cchanger");}
    if (direction!=null && shade==null){this.div.setAttribute("class", "direction_"+this.direction);}
    document.body.insertBefore(this.div, canvas);
    for (i = 0; i<6; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "triangle");
        this.div.appendChild(tmp)
    }
}

var changerArr = [];
var dir1 = new Changer('d1',2,null,[166.3-2*Math.sqrt(3)*size,162.5]);
changerArr.push(dir1);
var dir2 = new Changer('d2',4,null,[166.3,162.5-3*size]);
changerArr.push(dir2);
var cc1 =new Changer(4,null,1,[166.3-2.5*Math.sqrt(3)*size,162.5-1.5*size])
changerArr.push(cc1);

var changersLength = changerArr.length;
for (i = 0; i<changersLength; i++) {
    show(changerArr[i]);}

// Initialize Hex array
// Hex(id,direction,shade,position)
var hexArr = [];
var myhex1 = new Hex(1,1,1,[166.3,162.5]);
var myhex2 = new Hex(2,3,2,[166.3-Math.sqrt(3)*size,162.5+3*size]);
var myhex3 = new Hex(3,4,3,[166.3-3*Math.sqrt(3)*size,162.5]);

hexArr.push(myhex1);
hexArr.push(myhex2);
hexArr.push(myhex3);

var hexarrayLength = hexArr.length;
for (i = 0; i<hexarrayLength; i++) { show(hexArr[i]);}
