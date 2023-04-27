var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;
canvas.style.border = "1px solid #000";
var startBackgroundColor = "white";
ctx.fillStyle = startBackgroundColor;
ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(0, 0, canvas.width, canvas.height);
var drawColor = "black";
var drawWidth = 2;
var isDrawing = false;
var restoreArray = [];
var index = -1;
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);
function start(e) {
    isDrawing = true;
    ctx === null || ctx === void 0 ? void 0 : ctx.beginPath();
    ctx === null || ctx === void 0 ? void 0 : ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    e.preventDefault();
}
function draw(e) {
    if (isDrawing) {
        ctx === null || ctx === void 0 ? void 0 : ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = drawWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
    }
    e.preventDefault();
}
function stop(e) {
    if (isDrawing) {
        ctx === null || ctx === void 0 ? void 0 : ctx.stroke();
        ctx === null || ctx === void 0 ? void 0 : ctx.closePath();
        isDrawing = false;
    }
    e.preventDefault();
    if (e.type != "mouseout") {
        restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
}
function changeColor(element) {
    drawColor = element.style.background;
}
function clearCanvas() {
    ctx.fillStyle = startBackgroundColor;
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restoreArray = [];
    index = -1;
}
function undoLast() {
    if (index <= 0) {
        clearCanvas();
    }
    else {
        index -= 1;
        restoreArray.pop();
        ctx.putImageData(restoreArray[index], 0, 0);
    }
}
