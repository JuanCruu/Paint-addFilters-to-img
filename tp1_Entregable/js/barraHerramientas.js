let canvas = document.getElementById("paint");
let context = canvas.getContext("2d");

context.lineWidth = 1;

let trazo = false;

function draw(event) {

    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;

    if (trazo == true) {
        context.lineTo(x, y);
        context.stroke();
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

function colorLinea(color) {
    console.log(color.value);
    context.strokeStyle = color.value;
}

function anchoLinea(ancho) {
    console.log(ancho.value);

    context.lineWidth = ancho.value;
    document.getElementById("valor").innerHTML = ancho.value;
}

function limpiar() {
    context.clearRect(0, 0, canvas.width, canvas.height)
}