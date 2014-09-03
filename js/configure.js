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
var Hex = function(id,shade,direction,posx,posy) {
    this.id = id;
    this.posx=parseFloat(posx);
    this.posy=parseFloat(posy);
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
    this.div.setAttribute("class", "hexagon");
	this.div.setAttribute("shade", shade);
    this.div.setAttribute("onclick", "move(this)");
    document.body.insertBefore(this.div, canvas);
	this.tri = document.createElement("div");
	this.tri.setAttribute("class", "triangle");
	this.tri.setAttribute("shade", shade);
	this.tri.setAttribute("direction", direction);
	this.div.appendChild(this.tri)
}

// Changer class
var Changer = function(id,shade,direction,posx,posy) {
    this.id=id;
    this.posx=parseFloat(posx);
    this.posy=parseFloat(posy);
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
	document.body.insertBefore(this.div, canvas);
    if (direction=='null' && shade!='null'){
		this.div.setAttribute("class", "hexagon fill");
		this.div.setAttribute("shade", shade);
		this.tri = document.createElement("div");
		this.tri.setAttribute("direction", "null");
	}
    if (direction!='null' && shade=='null'){
		this.div.setAttribute("class", "hexagon");
		this.div.setAttribute("shade", "whi");
		this.div.style.opacity = 1;
		this.tri = document.createElement("div");
		this.tri.setAttribute("class", "triangle");
		this.tri.setAttribute("shade", "whi");
		this.tri.setAttribute("direction", direction);
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
	this.div.setAttribute("shade", shade);
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
clear = function(arrays){
	for (i = 0; i<hexArr.length; i++) {
        document.getElementById(hexArr[i].div.id).remove();}
    for (i = 0; i<changerArr.length; i++) {
        document.getElementById(changerArr[i].div.id).remove();}
    for (i = 0; i<targetArr.length; i++) {
        document.getElementById(targetArr[i].div.id).remove();}
	if (arrays != undefined){
		hexArr = [];
		changerArr = [];
		targetArr = [];}
}

// load function
load = function(obj, hidescreen){
	if (hidescreen == undefined)
		hideLevelScreen();
	resetbutton.level = obj.id.slice(-1);
	levelindicator.div.innerHTML = resetbutton.level;
    //console.log(resetbutton.level);
	var level = levelArr[obj.id.slice(-1)-1];
    var data = levels_data[obj.id.slice(-1)];
    if (level.open){
        clear();
        changerArr = [];
		if (data.changers != undefined) {
			for (i = 0; i<data.changers.length; i++) {
				tmp = new Changer('c'+(i+1),data.changers[i][0],data.changers[i][1],data.changers[i][2],data.changers[i][3]);
				changerArr.push(tmp);}}
        targetArr = [];
        for (i = 0; i<data.targets.length; i++) {
            tmp = new Target('t'+(i+1),data.targets[i][0],data.targets[i][1],data.targets[i][2]);
            targetArr.push(tmp);}
        hexArr = [];
        for (i = 0; i<data.hexers.length; i++) {
            tmp = new Hex(i+1,data.hexers[i][0],data.hexers[i][1],data.hexers[i][2],data.hexers[i][3]);
            hexArr.push(tmp);}
        rotatorArr = [];
        resizeAll();
    }
}

// show function
show = function(obj){
	document.getElementById(obj.id).style.position="fixed";
    document.getElementById(obj.id).style.left = anchor_x+Math.sqrt(3)*obj.posx*size + "px";
    document.getElementById(obj.id).style.top = anchor_y+obj.posy*size + "px";
	document.getElementById(obj.id).animation = "";
};

// isSolved function
isSolved = function(){
	solved = true;
	for (i = 0; i<hexArr.length; i++){
		if (hexArr[i].posx != targetArr[i].posx || hexArr[i].posy != targetArr[i].posy){
			solved = false;
			break}}
	if (solved == true){
		console.log('solved: '+resetbutton.level);
		load(levelArr[resetbutton.level].div,false)}
}

// move function
move = function(elm, dirn) {
	hex = hexArr[elm.id-1];
	direction = hex.tri.getAttribute("direction");
	if (typeof dirn != 'undefined') {direction = dirn};
	//hex.div.setAttribute("animate",direction);
	//show(hex);
	if (direction == 'lft')  { hex.posx -= 1; }
    if (direction == 'tlft')  { hex.posx -= 0.5; hex.posy -= 1.5; }
    if (direction == 'trgh')  { hex.posx += 0.5; hex.posy -= 1.5; }
    if (direction == 'rgh')  { hex.posx += 1; }
    if (direction == 'drgh')  { hex.posx += 0.5; hex.posy += 1.5; }
    if (direction == 'dlft')  { hex.posx -= 0.5; hex.posy += 1.5; }
	push = null;
    for (i = 0; i<hexArr.length; i++) {
        if (hexArr[i].posx==hex.posx && hexArr[i].posy==hex.posy && hexArr[i].id!=hex.id) {
            push = hexArr[i]; break; }}
    for (i = 0; i<changerArr.length; i++) {
        if (changerArr[i].posx==hex.posx && changerArr[i].posy==hex.posy) {
            update(hex, changerArr[i].tri.getAttribute("direction"), changerArr[i].div.getAttribute("shade")); break; }}
	show(hex);
	if (push) {move(push.div, direction);}
	isSolved();
};

// update function
update = function(hex, direction, shade) {
	if (shade && shade!='whi') {
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
	show(lvlscreen.div);
	show(resetbutton.div);
	show(levelindicator.div);
}

showLevelScreen = function() {
	//console.log('here');
	if (lvlscreen.flag != true) {
		clear(true);
		lvlscreen.flag = true;
		for (i = 0; i<levelArr.length; i++) {
			levelArr[i].div.posx -= 1000;
			show(levelArr[i].div);}}
};

hideLevelScreen = function() {
	lvlscreen.flag = false;
	for (i = 0; i<levelArr.length; i++) {
		levelArr[i].div.posx += 1000;
		show(levelArr[i].div);}
};

resetLevel = function() {
	lvlscreen.flag = false;
	if (resetbutton.level > 0)
		load(levelArr[resetbutton.level-1].div,false);
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
for (i = 0; i<Object.keys(levels_data).length; i++) {
	tmp = new Level(i+1,[-4+i,-6]);
	levelArr.push(tmp);
	show(tmp.div);}

// level screen button functionality
lvlscreen = new Level('Levels',[7,-6]);
lvlscreen.flag = false;
lvlscreen.div.setAttribute("onclick", "showLevelScreen()");
hideLevelScreen();

// reset level functionality
resetbutton = new Level('&#x27f3',[7.5,-4.5]);
resetbutton.level = 0;
resetbutton.div.setAttribute("onclick", "resetLevel()");

// level indicator
levelindicator = new Level('0',[-7,-6]);
levelindicator.div.setAttribute("onclick", "");
levelindicator.div.setAttribute("shade", "whi");
levelindicator.div.setAttribute("class", "level_indicator");

resizeAll();
window.addEventListener('resize', resizeAll);
