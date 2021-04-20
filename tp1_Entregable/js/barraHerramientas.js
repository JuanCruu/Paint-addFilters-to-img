let canvas = document.getElementById("paint");
let context = canvas.getContext("2d");

context.lineWidth = 1;

let trazo = false;
let colorTemporal = "black";
console.log(colorTemporal);

function draw(event) {
    // x = event.clientX - canvas.offsetLeft;
    // y = event.clientY - canvas.offsetTop;
    x = MousePos(canvas, event).x
    y = MousePos(canvas, event).y
    if (trazo == true) {
        context.lineTo(x, y);
        context.stroke();
    }
}

function MousePos(canvas, evt) {
    var ClientRect = canvas.getBoundingClientRect();
    return {
        x: Math.round(evt.clientX - ClientRect.left),
        y: Math.round(evt.clientY - ClientRect.top)
    }
}

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mousedown', function() {
    trazo = true;
    context.beginPath();
    context.moveTo(x, y);
    canvas.addEventListener('mousemove', draw);
});

canvas.addEventListener('mouseup', function() {
    trazo = false;
})
canvas.addEventListener('mouseout', function() {
    trazo = false;
})

function colorLinea(color) {
    colorTemporal = color.value;
    context.strokeStyle = color.value;
    console.log(context.strokeStyle)
}

function colorLineatemporal() {
    context.strokeStyle = colorTemporal;
}

function anchoLinea(ancho) {
    context.lineWidth = ancho.value;
    document.getElementById("valor").innerHTML = ancho.value;
}

function limpiar() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}

function eraser() { //reacer la goma
    context.strokeStyle = "white";
}