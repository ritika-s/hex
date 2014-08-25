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

var size = 21.95;

// Key classes ---------------------------------------------------------------------

// Hex class
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

// Changer class
var Changer = function(id,direction,shade,position) {
    this.id=id;
    this.direction=direction;
    this.shade=shade;
    this.posx=position[0];
    this.posy=position[1];

    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    if (direction==null && shade!=null){this.div.setAttribute("class", "cchanger_"+this.shade);}
    if (direction!=null && shade==null){this.div.setAttribute("class", "direction_"+this.direction);}
    document.body.insertBefore(this.div, canvas);
    for (i = 0; i<6; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "triangle");
        this.div.appendChild(tmp)
    }
}

// Generic functions ---------------------------------------------------------------

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

// update function
update = function(hex, direction, shade) {
    if (shade)        {hex.shade = shade};
    if (direction)    {hex.direction = direction};
    document.getElementById(hex.id).className = "hexagon_"+hex.shade+"_"+hex.direction;
};

// Initialize class arrays ---------------------------------------------------------

var anchor_x = 165.5;
var anchor_y = 162.5;

// Initialize Changer array
var changerArr = [];
var dir1 = new Changer('d1',2,null,[anchor_x-2*Math.sqrt(3)*size,anchor_y]);
var dir2 = new Changer('d2',4,null,[anchor_x,anchor_y-3*size]);
var cc1 =new Changer('c1',null,4,[anchor_x-2.5*Math.sqrt(3)*size,anchor_y-1.5*size])
var cc2 =new Changer('c2',null,5,[anchor_x+0.5*Math.sqrt(3)*size,anchor_y-1.5*size])
changerArr.push(dir1);
changerArr.push(dir2);
changerArr.push(cc1);
changerArr.push(cc2);
var changersLength = changerArr.length;
for (i = 0; i<changersLength; i++) {show(changerArr[i]);}

// Initialize Hex array
var hexArr = [];
var myhex1 = new Hex(1,1,1,[anchor_x+Math.sqrt(3)*size,anchor_y]);
var myhex2 = new Hex(2,3,2,[anchor_x-Math.sqrt(3)*size,anchor_y+3*size]);
var myhex3 = new Hex(3,4,3,[anchor_x-3*Math.sqrt(3)*size,anchor_y]);
hexArr.push(myhex1);
hexArr.push(myhex2);
hexArr.push(myhex3);
var hexarrayLength = hexArr.length;
for (i = 0; i<hexarrayLength; i++) { show(hexArr[i]);}

