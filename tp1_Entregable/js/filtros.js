let canvas2 = document.getElementById("filtros");
let ctx = canvas2.getContext("2d");

let inputFile = document.getElementById("cargarImagen")

let width = canvas.width;
let height = canvas.height;

let imgTemporal;

function changeResolution(ancho, alto) {
    width = ancho;
    height = alto;
}
inputFile.addEventListener("change", function() {
    var reader = new FileReader();
    reader.onload = () => {
        let img = new Image();
        img.src = reader.result;

        img.onload = () => {
            if (img.width < 1500) {
                changeResolution(img.width, img.height)
                canvas2.width = width;
                canvas2.height = height;
            }
            imgTemporal = img;
            ctx.drawImage(img, 0, 0, width, height);
            ctx.putImageData(ctx.getImageData(0, 0, width, height))
        }
    };
    reader.readAsDataURL(inputFile.files[0]);
});

function reset() {
    if (imgTemporal != null) {
        ctx.drawImage(imgTemporal, 0, 0, width, height);
        ctx.putImageData(ctx.getImageData(0, 0, width, height))

    }
}

function borrar() {
    ctx.clearRect(0, 0, width, height)
    inputFile.value = "";

}

function BlackAndWhite() {
    let imgData = ctx.getImageData(0, 0, width, height);
    console.log(imgData)
    let pixeles = imgData.data;
    console.log(pixeles)

    for (let i = 0; i < (width * height); i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];

        let gris = (r + g + b) / 3

        pixeles[i * 4] = gris;
        pixeles[i * 4 + 1] = gris;
        pixeles[i * 4 + 2] = gris;
    }
    ctx.putImageData(imgData, 0, 0)
}

function brillo() {
    let imgData = ctx.getImageData(0, 0, width, height);
    console.log(imgData)
    let pixeles = imgData.data;
    console.log(pixeles)

    for (let i = 0; i < (width * height); i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];


        pixeles[i * 4] = r + 85;
        pixeles[i * 4 + 1] = g + 85;
        pixeles[i * 4 + 2] = b + 85;
    }
    ctx.putImageData(imgData, 0, 0)
}

function negativo() {
    let imgData = ctx.getImageData(0, 0, width, height);
    console.log(imgData)
    let pixeles = imgData.data;
    console.log(pixeles)

    for (let i = 0; i < (width * height); i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];


        pixeles[i * 4] = 255 - r;
        pixeles[i * 4 + 1] = 255 - g;
        pixeles[i * 4 + 2] = 255 - b;
    }
    ctx.putImageData(imgData, 0, 0)
}

function binarizacion() {
    let imgData = ctx.getImageData(0, 0, width, height);
    console.log(imgData)
    let pixeles = imgData.data;
    console.log(pixeles)

    for (let i = 0; i < (width * height); i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];

        let gray = (0.299 * r + 0.587 * g + 0.114 * b)

        if (gray < 120) {
            r = 0;
            g = 0;
            b = 0;
        } else {
            r = 255;
            g = 255;
            b = 255;
        }
        pixeles[i * 4] = r;
        pixeles[i * 4 + 1] = g;
        pixeles[i * 4 + 2] = b;
    }
    ctx.putImageData(imgData, 0, 0)
}