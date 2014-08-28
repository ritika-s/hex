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
document.body.style.backgroundImage="url('images/hexbg2.png')";
document.body.style.backgroundPosition="center center"

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

//Rotator class
var Rotator =function(id,limit,position){
    this.id=id;
    this.limit=limit;
    this.posx=position[0];
    this.posy=position[1];

    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "rotator_"+this.limit);
    
    if (limit==1){
        this.div.innerHTML = "1";};
    if (limit==2){
        this.div.innerHTML = "2";};
    if (limit==-1){
        this.div.innerHTML = "-1";};
    if (limit==-2){
        this.div.innerHTML = "-2";};
    if (limit==0){
        this.div.innerHTML = "0";};

    document.body.insertBefore(this.div, canvas);
    for (i = 0; i<6; i++) {
        tmp = document.createElement("div");
        tmp.setAttribute("class", "triangle");
        this.div.appendChild(tmp)
    }

}
// Level class
var Level = function(){
    this.id = id;
    this.changerArr = changerArr;
    this.hexArr = hexArr;
}

// Generic functions ---------------------------------------------------------------

// show function
show = function(obj){
    document.getElementById(obj.id).style.position="fixed";
    document.getElementById(obj.id).style.left=anchor_x+Math.sqrt(3)*obj.posx*size + "px";
    document.getElementById(obj.id).style.top=anchor_y+obj.posy*size + "px";
};

// move function
move = function(elm, dirn) {
    hex = hexArr[elm.id-1];
    direction = hex.direction;
    if (typeof dirn != 'undefined') {direction = dirn};
    if (direction == 1)  { hex.posx -= 1; }
    if (direction == 2)  { hex.posx -= 0.5; hex.posy -= 1.5; }
    if (direction == 3)  { hex.posx += 0.5; hex.posy -= 1.5; }
    if (direction == 4)  { hex.posx += 1; }
    if (direction == 5)  { hex.posx += 0.5; hex.posy += 1.5; }
    if (direction == 6)  { hex.posx -= 0.5; hex.posy += 1.5; }
    push = null;
    for (i = 0; i<hexArr.length; i++) {
        if (Math.abs(hexArr[i].posx - hex.posx)<0.1 && Math.abs(hexArr[i].posy - hex.posy)<0.1 && hexArr[i].id!=hex.id) {
            push = hexArr[i]; break; }}
    for (i = 0; i<changerArr.length; i++) {
        if (Math.abs(changerArr[i].posx - hex.posx)<0.1 && Math.abs(changerArr[i].posy - hex.posy)<0.1) {
            update(hex, changerArr[i].direction, changerArr[i].shade); break; }}

    show(hex);
    if (push) {move(push.div, direction);}
};

// update function
update = function(hex, direction, shade) {
    if (shade)        {hex.shade = shade};
    if (direction)    {hex.direction = direction};
    document.getElementById(hex.id).className = "hexagon_"+hex.shade+"_"+hex.direction;
};

// resize all function
resizeAll = function(){
    console.log(3*Math.floor(window.innerHeight/(size*6))+1);
    anchor_x = window.innerWidth/2 - 15.3;
    anchor_y = 6+size*(3*Math.floor(window.innerHeight/(size*6))+1);
    for (i = 0; i<changerArr.length; i++) {
        show(changerArr[i]);}
    for (i = 0; i<hexArr.length; i++) { 
        show(hexArr[i]);}
}

// Initialize class arrays ---------------------------------------------------------

var size = 41.65;
var anchor_x = window.innerWidth/2 - 15.3;
var anchor_y = 5.9+size*(3*Math.floor(window.innerHeight/(size*6))+1);

// Initialize Changer array
var changerArr = [];
// var dir1 = new Changer('d1',2,null,[-2,0]);
// var dir2 = new Changer('d2',4,null,[0,-3]);
var r1 = new Changer('r1',1,[-2,0]);
var r2 = new Changer('r2',2,[0,-3]);

var cc1 =new Changer('c1',null,4,[-2.5,-1.5])
var cc2 =new Changer('c2',null,5,[0.5,-1.5])
changerArr.push(r1);
changerArr.push(r2);
changerArr.push(cc1);
changerArr.push(cc2);

// Initialize Hex array
var hexArr = [];
var myhex1 = new Hex(1,1,1,[0,0]);
var myhex2 = new Hex(2,3,2,[-1,3]);
var myhex3 = new Hex(3,4,3,[-3,0]);
hexArr.push(myhex1);
hexArr.push(myhex2);
hexArr.push(myhex3);

resizeAll();

window.addEventListener('resize', resizeAll);

