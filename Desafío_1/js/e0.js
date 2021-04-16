let canvas2 = document.getElementById("desafio");
let ctx2 = canvas2.getContext("2d");

ctx2.fillStyle = 'lightblue';

ctx2.beginPath();
ctx2.arc(290, 75, 50, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.fillStyle = 'black';

ctx2.beginPath();
ctx2.arc(270, 60, 5, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.arc(310, 60, 5, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.fillStyle = 'lightblue';

ctx2.beginPath();
ctx2.arc(290, 175, 70, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.arc(290, 300, 100, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.fillStyle = 'black';

ctx2.beginPath();
ctx2.arc(290, 150, 5, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.arc(290, 200, 5, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.arc(290, 250, 5, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.beginPath();
ctx2.arc(290, 320, 5, 0, 180);
ctx2.fill();
ctx2.closePath();

ctx2.fillStyle = 'brown';
//////////////////////////////////////////////////////
// let canvas1 = document.getElementById("practica");
// let ctx1 = canvas.getContext('2d');
// let image = new Image();
// image.onload = () => {
//     canvas1.height = image1.height;
//     canvas1.width = image1.width;
//     myDrawImage2(image);

// };
// const myDrawImage2 = (image) => {
//         ctx.drawImage(image, 0, 0);
//     }
//////////////////////////////////////////////////////

let canvas = document.getElementById("practica");
let ctx = canvas.getContext('2d');
//let imageData = new Image();

let image1 = new Image();
image1.src = './images/w4mqr8p8a7661.jpg'
image1.onload = () => {
    canvas.height = image1.height;
    canvas.width = image1.width;

    // image1.crossOrigin = '';
    myDrawImage(image1);

};

const myDrawImage = (image1) => {
    ctx.drawImage(image1, 0, 0);
};

///////////////////////
let filtrado = document.getElementById("filtrado");
let context = filtrado.getContext('2d');

let imagen = new Image();
imagen.src = './images/w4mqr8p8a7661.jpg'
imagen.onload = () => {
    filtrado.height = imagen.height;
    filtrado.width = imagen.width;
    MydrawImage2(imagen)
    let imageData = context.getImageData(0, 0, imagen.width, imagen.height);

    for (let i = 0; i < (imagen.width * imagen.height); i++) {
        imageData.data[i * 4] = 0;
        //     imageData.data[i * 4 + 1] = 0;
    }
    context.putImageData(imageData, 0, 0);
    console.log(imageData);

}
const MydrawImage2 = (imagen) => {
        context.drawImage(imagen, 0, 0)
    }
    // imageData.src = './images/w4mqr8p8a7661.jpg';

// imageData.onload = () => {

//     let algo = ctx.getImageData(0, 0, imageData.width, imageData.height);
//     myDrawImage(imageData);
// }
// const myDrawImage = (imgData) => {
//         ctx.drawImage(imgData, 0, 0);
//     }
//     //////////////////////////////////////////////////////
// let filtro = document.getElementById("filtrado");
// let ctxf = filtro.getContext('2d');
// let imageData2 = new Image();

// imageData2.src = './images/w4mqr8p8a7661.jpg';

// imageData2.onload = () => {
//     myDrawImage(imageData2);
// }

// const myDrawImage2 = (img) => {
//     ctxf.drawImage(img, 0, 0);
// }


//////////////////////////////////////////////////////
for (let x = 0; x < whidt; x++) {
    for (let y = 0; y < height; y++) {
        setPixel(imageData, x, y, 255, 0, 0, 255)
    }
}
ctx.putImageData(imageData, 50, 50);