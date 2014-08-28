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
    this.posx=position[0];
    this.posy=position[1];
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
var Changer = function(id,direction,shade,position) {
    this.id=id;
    this.posx=position[0];
    this.posy=position[1];
    this.div = document.createElement("div");
    this.div.setAttribute("id", id);
	document.body.insertBefore(this.div, canvas);
    if (direction==null && shade!=null){
		this.div.setAttribute("class", "hexagon fill");
		this.div.setAttribute("shade", "c"+shade);
		this.tri = document.createElement("div");
		this.tri.setAttribute("direction", "null");
	}
    if (direction!=null && shade==null){
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
var Target = function(id,shade,position) {
    this.id = id;
    this.posx=position[0];
    this.posy=position[1];
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
var Level = function(){
    this.id = id;
    this.changerArr = changerArr;
    this.hexArr = hexArr;
}

// Generic functions ---------------------------------------------------------------

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
	for (i = 0; i<tgtArr.length; i++) { 
        show(tgtArr[i]);}
}

// Initialize class arrays ---------------------------------------------------------

var size = 41.65;
var anchor_x = window.innerWidth/2 - 28;
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

// Initialize Target array
var tgtArr = [];
var mytgt1 = new Target('t1',1,[0,3]);
var mytgt2 = new Target('t2',2,[-2.5,1.5]);
var mytgt3 = new Target('t3',3,[2,-3]);
tgtArr.push(mytgt1);
tgtArr.push(mytgt2);
tgtArr.push(mytgt3);

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
