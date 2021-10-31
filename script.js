var buttonCapture = document.getElementById("buttonCapture");
var buttonSave = document.getElementById("buttonSave");
var savedImages = document.getElementById("savedImages");
var canvas = document.getElementById("canvas");
var video = document.getElementById("video");

var context;
var width = 450; //set width of the video and image
var height;

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer, Inc/.test(navigator.vendor);

video.width = width;

var canvas = canvas;
canvas.style.width = width + "px";
canvas.width = width;

context = canvas.getContext("2d");

if((isChrome || isSafari) && window.location.protocol == "http:") {
    savedImages.innerHTML = "<h1>This browser only supports camera streams over https:</h1>";
} else {
    startWebcam();
}

function startWebcam() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mediaDevices || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

    if (navigator.mediaDevices){
        navigator.mediaDevices.getUserMedia({video: true}, handleVideo, videoError).then(function(stream){
            video.onloadedmetadata = setHeight;
            buttonCapture.disabled = false;
            return video.srcObject = stream;
        }).catch(function(e) {
            console.log(e.name + ": "+ e.message);
            
            buttonCapture.disabled = true;
            
            switch(e.name) {
                case "NotAllowedError":
                    savedImages.innerHTML = "<h3>You can't use this app because you denied camera access. Refresh the page and allow the camera to be used by this app.</h3>";
                    break;
                case "NotReadableError":
                    savedImages.innerHTML = "<h3>Camera not available. Your camera may be used by another application.</h3>";
                    break;
                case "NotFoundError":
                    savedImages.innerHTML = "<h3>Camera not available. Please connect a camera to your device.</h3>";
                    break;
            }
        });
    } else {
        savedImages.innerHTML = "<h3>Camera not supported.</h3>";
    }

    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }

    function videoError(e) {
        savedImages.innerHTML = "<h3>" + e +"</h3>";
    }
    
    function setHeight() {
        var ratio = video.videoWidth / video.videoHeight;
        height = width/ratio;
        canvas.style.height = height + "px";
        canvas.height = height;
    }

    //add event listener and handle the capture button
    buttonCapture.addEventListener("mousedown", handleButtonCaptureClick);

    function handleButtonCaptureClick() {
        if(canvas.style.display == "none" || canvas.style.display == ""){
            canvas.style.display = "block";
            buttonCapture.innerHTML = "Retake";
            
            setHeight();
            context.drawImage(video, 0, 0, width, height);

            buttonSave.innerHTML = "Save";
            buttonSave.disabled = false;
        } else {
            makeCaptureButton();
        }
    }
    
    function makeCaptureButton() {
        canvas.style.display = "none";
        buttonCapture.innerHTML = "Capture";
        buttonSave.innerHTML = "Save";
        buttonSave.disabled = true;
    }

    //add event listener and handle the save button
    buttonSave.addEventListener("mousedown", handleButtonSaveClick);
    
    function handleButtonSaveClick() {
        var dataURL = canvas.toDataURL("image/jpg");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "save.php"); //change this to .php or .asp, depending on your server
        xhr.onload = function() {
            if (xhr.readyState == 4 ) {
                if(xhr.status == 200) {
                    var image = new Image();
                    image.src = "images/" + xhr.responseText;
                    savedImages.insertAdjacentElement('afterbegin', image);
                    buttonSave.innerHTML = "Saved";
                    buttonSave.disabled = true;
                    makeCaptureButton();
                }
            }
        };
        var form = new FormData();
        form.append("image", dataURL);
        xhr.send(form);
    }
}