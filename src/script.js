let canvas = document.getElementById("PhotoPreview")
let ctx = canvas.getContext("2d", {willReadFrequently: true})
let videoElement = document.getElementById("vid");
let cameraHeader= document.getElementById("CameraHeader")
let mediaDevices = navigator.mediaDevices;
let camActDiv = document.getElementById("CamActivator");
let camActText = document.getElementById("CameraActText")
let canvasInterval
let camActive = false;
vid.muted = true;
let globalStream
let fps = 60
function WebCamAct(){
    if(camActive)
    {
        window.clearInterval(canvasInterval)
        globalStream.getTracks()[0].stop()
        return
    }
    camActive = true

    camActText.innerText = "Connecting, please allow acces to your camera"
        mediaDevices
            .getUserMedia({
                video: true,
                audio: false, 
            })
            .then((stream) => {
                videoElement.srcObject = stream
                globalStream = stream
                videoElement.addEventListener("loadedmetadata", () => {
                    videoElement.play();
                canvas.height = stream.getTracks()[0].getSettings().height
                canvas.width = stream.getTracks()[0].getSettings().width
                cameraHeader.innerText = stream.getVideoTracks()[0].label
                
                activateCamera()
                });
            })
    }

function drawImage(dat) {
    ctx.drawImage(dat, 0, 0, canvas.width, canvas.height);
    let webFeed = ctx.getImageData(0,0,canvas.width,canvas.height)
    ctx.putImageData(webFeed, 0, 0);
}

function activateCamera()
{
camActDiv.style.backgroundColor = "unset"
camActText.innerText = ""
canvasInterval = window.setInterval(() => {
    drawImage(videoElement);
}, 1000 / fps);
}