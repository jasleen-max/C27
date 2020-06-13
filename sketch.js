var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(400, 400);
   //canvas.parent('canvasContainer');
    database = firebase.database()
    background(51);
    var button=createButton('clear');
    button.position(200,380);
   button.mousePressed(clearDrawing);
    
}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
  background(0);
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }
    //button.mousePressed(clearDrawing);
}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}



function clearDrawing() {
 db_drawing = [];
 var adaRef = database.ref('drawing');
  adaRef.remove()
}