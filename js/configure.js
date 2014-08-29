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
document.body.style.backgroundImage="url('images/background4.png')";
document.body.style.backgroundPosition="center center"

// Key classes ---------------------------------------------------------------------

// Hex class
var Hex = function(id,direction,shade,posx,posy) {
    console.log('Hexing:::'+id+' '+direction+' '+shade+' '+posx+' '+posy);
    this.id = id;
    this.posx=parseFloat(posx);
    this.posy=parseFloat(posy);
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "hexagon");
	this.div.setAttribute("shade", "c"+shade);
    this.div.setAttribute("onclick", "move(this)");
    document.body.insertBefore(this.div, canvas);
	this.tri = document.createElement("div");
	this.tri.setAttribute("class", "triangle");
	this.tri.setAttribute("shade", "c"+shade);
	this.tri.setAttribute("direction", "d"+direction);
	this.div.appendChild(this.tri)
}

// Changer class
var Changer = function(id,direction,shade,posx,posy) {
    this.id=id;
    this.posx=parseFloat(posx);
    this.posy=parseFloat(posy);
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
	document.body.insertBefore(this.div, canvas);
    if (direction=='null' && shade!='null'){
		this.div.setAttribute("class", "hexagon fill");
		this.div.setAttribute("shade", "c"+shade);
		this.tri = document.createElement("div");
		this.tri.setAttribute("direction", "null");
	}
    if (direction!='null' && shade=='null'){
		this.div.setAttribute("class", "hexagon");
		this.div.setAttribute("shade", "c7");
		this.tri = document.createElement("div");
		this.tri.setAttribute("class", "triangle");
		this.tri.setAttribute("shade", "c7");
		this.tri.setAttribute("direction","d"+direction);
		this.div.appendChild(this.tri)
    }
}

// Target class
var Target = function(id,shade,posx,posy) {
    this.id = id;
    this.posx=parseFloat(posx);
    this.posy=parseFloat(posy);
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "target");
	this.div.setAttribute("shade", "c"+shade);
    document.body.insertBefore(this.div, canvas);
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
var Level = function(id, position){
    this.id = id;
    this.open = true;
    this.posy=position[1];
    this.div = document.createElement("div");
    this.div.setAttribute("id", 'l'+id);
    this.div.posx=position[0];
    this.div.posy=position[1];
    this.div.innerHTML=id;
    this.div.setAttribute("class", "level_button");
    this.div.setAttribute("onclick", "load(this)");
    this.changerArr = changerArr;
    this.hexArr = hexArr;
    this.rotatorArr = rotatorArr;
    this.targetArr = targetArr;
    document.body.insertBefore(this.div, canvas);
}

// Generic functions ---------------------------------------------------------------

// functions to remove div tags
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// clear html function
clear = function(obj){
    for (i = 0; i<hexArr.length; i++) {
        document.getElementById(hexArr[i].div.id).remove();}
    for (i = 0; i<changerArr.length; i++) {
        document.getElementById(changerArr[i].div.id).remove();}
    for (i = 0; i<targetArr.length; i++) {
        document.getElementById(targetArr[i].div.id).remove();}
}

// load function
load = function(obj){
    console.log(obj.id);
    var level = levelArr[obj.id.slice(-1)-1];
    var data = levels_data[obj.id.slice(-1)];
    if (level.open){
        clear();
        changerArr = [];
        for (i = 0; i<data.changers.length; i++) {
            tmp = new Changer(data.changers[i][0],data.changers[i][1],data.changers[i][2],data.changers[i][3],data.changers[i][4]);
            changerArr.push(tmp);}
        targetArr = [];
        for (i = 0; i<data.targets.length; i++) {
            tmp = new Target(data.targets[i][0],data.targets[i][1],data.targets[i][2],data.targets[i][3]);
            targetArr.push(tmp);}
        hexArr = [];
        for (i = 0; i<data.hexers.length; i++) {
            tmp = new Hex(data.hexers[i][0],data.hexers[i][1],data.hexers[i][2],data.hexers[i][3],data.hexers[i][4]);
            hexArr.push(tmp);}
        console.log(hexArr.length);
        rotatorArr = [];
        resizeAll();
    }
}

// show function
show = function(obj){
	console.log(obj.id);
	document.getElementById(obj.id).style.position="fixed";
    document.getElementById(obj.id).style.left = anchor_x+Math.sqrt(3)*obj.posx*size + "px";
    document.getElementById(obj.id).style.top = anchor_y+obj.posy*size + "px";
	document.getElementById(obj.id).animation = "";
};

// move function
move = function(elm, dirn) {
	hex = hexArr[elm.id-1];
	console.log(hex.tri.getAttribute("direction"));
    direction = hex.tri.getAttribute("direction");
	if (typeof dirn != 'undefined') {direction = dirn};
	hex.div.setAttribute("animate",direction);
	show(hex);
	if (direction == 'd1')  { hex.posx -= 1; }
    if (direction == 'd2')  { hex.posx -= 0.5; hex.posy -= 1.5; }
    if (direction == 'd3')  { hex.posx += 0.5; hex.posy -= 1.5; }
    if (direction == 'd4')  { hex.posx += 1; }
    if (direction == 'd5')  { hex.posx += 0.5; hex.posy += 1.5; }
    if (direction == 'd6')  { hex.posx -= 0.5; hex.posy += 1.5; }
    push = null;
    for (i = 0; i<hexArr.length; i++) {
        if (hexArr[i].posx==hex.posx && hexArr[i].posy==hex.posy && hexArr[i].id!=hex.id) {
            push = hexArr[i]; break; }}
    for (i = 0; i<changerArr.length; i++) {
        if (changerArr[i].posx==hex.posx && changerArr[i].posy==hex.posy) {
            update(hex, changerArr[i].tri.getAttribute("direction"), changerArr[i].div.getAttribute("shade")); break; }}
	if (push) {move(push.div, direction);}
};

// update function
update = function(hex, direction, shade) {
	if (shade && shade!='c7') {
		hex.div.setAttribute("shade", shade)
		hex.tri.setAttribute("shade", shade)};
    if (direction!='null') {
		hex.tri.setAttribute("direction", direction)};
};

// resize all function
resizeAll = function(){
    anchor_x = window.innerWidth/2 - 28;
    anchor_y = 6+size*(3*Math.floor(window.innerHeight/(size*6))+1);
    for (i = 0; i<changerArr.length; i++) {
        show(changerArr[i]);}
    for (i = 0; i<hexArr.length; i++) { 
        show(hexArr[i]);}
	for (i = 0; i<targetArr.length; i++) { 
        show(targetArr[i]);}
}

// Initialize class arrays ---------------------------------------------------------

var size = 41.65;
var anchor_x = window.innerWidth/2 - 28;
var anchor_y = 5.9+size*(3*Math.floor(window.innerHeight/(size*6))+1);

// Initialize arrays
var changerArr = [];
var targetArr = [];
var hexArr = [];
var rotatorArr = [];
var targetArr = [];

// Initialize levels
var levelArr = [];
var level1 = new Level(1,[-4,-6]);
var level2 = new Level(2,[-3,-6]);
levelArr.push(level1);
levelArr.push(level2);

show(level1.div);
show(level2.div);

resizeAll();

window.addEventListener('resize', resizeAll);
