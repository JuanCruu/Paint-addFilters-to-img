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
            if (img.width < 1600) {
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
    let pixeles = imgData.data;
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
    let pixeles = imgData.data;

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
    let pixeles = imgData.data;
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

function sepia() {
    let imgData = ctx.getImageData(0, 0, width, height);
    console.log(imgData)
    let pixeles = imgData.data;
    console.log(pixeles)

    for (let i = 0; i < (width * height); i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];

        pixeles[i * 4] = (r * .393) + (g * .769) + (b * .189);
        pixeles[i * 4 + 1] = (r * .349) + (g * .686) + (b * .168);
        pixeles[i * 4 + 2] = (r * .272) + (g * .534) + (b * .131);
    }
    ctx.putImageData(imgData, 0, 0)
}

function saturation() {

    let imgData = ctx.getImageData(0, 0, width, height);
    // console.log(imgData)
    let pixeles = imgData.data;
    // console.log(pixeles)

    for (let i = 0; i < (width * height); i++) {
        let r = pixeles[i * 4];
        let g = pixeles[i * 4 + 1];
        let b = pixeles[i * 4 + 2];

        let hsl = rgbToHsl(r, g, b); //algoritmo sacado de internet
        hsl[1] += hsl[1] + .2;
        let rgb = hslToRgb(hsl[0], hsl[1], hsl[2]) //algoritmo sacado de internet

        pixeles[i * 4] = rgb[0];
        pixeles[i * 4 + 1] = rgb[1];
        pixeles[i * 4 + 2] = rgb[2];
    }
    ctx.putImageData(imgData, 0, 0)
}

function setBlur() {
    let imgData = ctx.getImageData(0, 0, width, height);

    let matrizBlur = [
        [1 / 9, 1 / 9, 1 / 9],
        [1 / 9, 1 / 9, 1 / 9],
        [1 / 9, 1 / 9, 1 / 9]
    ]
    for (let x = 0; x < imgData.width; x++) {
        for (let y = 0; y < imgData.height; y++) {
            setearPixel(imgData, x, y, matrizBlur)
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

function detectarBordes() {
    BlackAndWhite()
    let imgData = ctx.getImageData(0, 0, width, height);

    let kernel = [
        [-1, -1, -1],
        [-1, 4, -1],
        [-1, -1, -1]
    ]

    for (let x = 0; x < imgData.width; x++) {
        for (let y = 0; y < imgData.height; y++) {
            setearPixel(imgData, x, y, kernel)
        }
    }

    ctx.putImageData(imgData, 0, 0);
}

let setearPixel = (imgData, x, y, kernel) => {
    let ul = ((x - 1 + imgData.width) % imgData.width + imgData.width * ((y - 1 + imgData.height) % imgData.height)) * 4;
    let uc = ((x - 0 + imgData.width) % imgData.width + imgData.width * ((y - 1 + imgData.height) % imgData.height)) * 4;
    let ur = ((x + 1 + imgData.width) % imgData.width + imgData.width * ((y - 1 + imgData.height) % imgData.height)) * 4;
    let ml = ((x - 1 + imgData.width) % imgData.width + imgData.width * ((y + 0 + imgData.height) % imgData.height)) * 4;
    let mc = ((x - 0 + imgData.width) % imgData.width + imgData.width * ((y + 0 + imgData.height) % imgData.height)) * 4;
    let mr = ((x + 1 + imgData.width) % imgData.width + imgData.width * ((y + 0 + imgData.height) % imgData.height)) * 4;
    let ll = ((x - 1 + imgData.width) % imgData.width + imgData.width * ((y + 1 + imgData.height) % imgData.height)) * 4;
    let lc = ((x - 0 + imgData.width) % imgData.width + imgData.width * ((y + 1 + imgData.height) % imgData.height)) * 4;
    let lr = ((x + 1 + imgData.width) % imgData.width + imgData.width * ((y + 1 + imgData.height) % imgData.height)) * 4;

    let red = pixelSeteado(ul, uc, ur, ml, mc, mr, ll, lc, lr, imgData, kernel, 0);
    let green = pixelSeteado(ul, uc, ur, ml, mc, mr, ll, lc, lr, imgData, kernel, 1);
    let blue = pixelSeteado(ul, uc, ur, ml, mc, mr, ll, lc, lr, imgData, kernel, 2);

    imgData.data[mc] = red;
    imgData.data[mc + 1] = green;
    imgData.data[mc + 2] = blue;
    imgData.data[mc + 3] = imgData.data[lc + 3];
}

function pixelSeteado(ul, uc, ur, ml, mc, mr, ll, lc, lr, imgData, kernel, x) {
    let p0, p1, p2, p3, p4, p5, p6, p7, p8
    p0 = imgData.data[ul + x] * kernel[0][0];
    p1 = imgData.data[uc + x] * kernel[0][1];
    p2 = imgData.data[ur + x] * kernel[0][2];
    p3 = imgData.data[ml + x] * kernel[1][0];
    p4 = imgData.data[mc + x] * kernel[1][1];
    p5 = imgData.data[mr + x] * kernel[1][2];
    p6 = imgData.data[ll + x] * kernel[2][0];
    p7 = imgData.data[lc + x] * kernel[2][1];
    p8 = imgData.data[lr + x] * kernel[2][2];

    return (p0 + p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8);
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}