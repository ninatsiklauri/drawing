const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")


canvas.width = 600;
canvas.height = 400;
canvas.style.border = "1px solid #000"
let startBackgroundColor = "white"

ctx!.fillStyle = startBackgroundColor
ctx?.fillRect(0,0,canvas.width, canvas.height)

let drawColor: string = "black"
let drawWidth:number = 2
let isDrawing:boolean = false

let restoreArray: any[] = []
let index = -1

canvas.addEventListener("touchstart", start, false)
canvas.addEventListener("touchmove", draw, false)
canvas.addEventListener("mousedown", start, false)
canvas.addEventListener("mousemove", draw, false)


canvas.addEventListener("touchend", stop, false)
canvas.addEventListener("mouseup", stop, false)
canvas.addEventListener("mouseout", stop, false)


function start(e:any) {
    isDrawing = true;
    ctx?.beginPath()
    ctx?.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    e.preventDefault()
}
function draw(e:any) {
    if(isDrawing) {
        ctx?.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
        ctx!.strokeStyle = drawColor;
        ctx!.lineWidth = drawWidth
        ctx!.lineCap = "round"
        ctx!.lineJoin = "round"
        ctx?.stroke()
    }
    e.preventDefault()
}

function stop(e:any) {
    if(isDrawing){
        ctx?.stroke()
        ctx?.closePath()
    isDrawing = false;

    }
    e.preventDefault()
    if(e.type != "mouseout"){
        restoreArray.push(ctx!.getImageData(0, 0, canvas.width, canvas.height))
        index += 1  
    }
}

function changeColor(element:any){
    drawColor = element.style.background
}


function clearCanvas() {
    ctx!.fillStyle = startBackgroundColor;
    ctx?.clearRect(0,0, canvas.width, canvas.height)
    ctx!.fillRect(0,0, canvas.width, canvas.height)
    restoreArray = []
    index = -1
}

function undoLast() {
    if(index <= 0 ) {
        clearCanvas()
    }else{
        index -= 1;
        restoreArray.pop()
        ctx!.putImageData(restoreArray[index], 0, 0)
    }
}
