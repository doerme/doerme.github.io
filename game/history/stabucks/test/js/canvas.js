(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());





//画画
var context, image1, image2;
var canvas = document.getElementById("myCanvas");
var w, h;
var canvasStyleWidth;
var scaleFactor;
var viewableArea;
var currentSelection;
var relativeMouse;
var relativeTouch1;
var relativeTouch2;
var pointerOn = false;
var mouseDown = false;
var mouseMoving = false;
var mouse = {
    x: 0,
    y: 0
};
var canTouch = true;

var touches = [];
var fingerSize = 24;
var touch = {
    touch1PosX: 0,
    touch1PosY: 0,
    touch2PosX: 0,
    touch2PosY: 0,
    initAngle: 0,
    angle: 0,
    angleChange: 0,
    initLength: 0,
    length: 0,
    fingerLength: 0,
    lengthChange: 0
};







function createCanvas() {
    loader.removeClass('hide');

    $('#canvasWrap .canvasImg').remove();
    $('.button').addClass('hide');


    canTouch = true;
    context = canvas.getContext("2d");

    w = canvas.width;
    h = canvas.height;
    canvasStyleWidth = parseInt(window.getComputedStyle(canvas).width);
    scaleFactor = canvas.width / canvasStyleWidth;
    viewableArea = canvasStyleWidth * scaleFactor;

    // regular rotation about point
    image1 = new Image();
    image2 = new Image();

    image2.src = model.cover;

    image2.onload = function() {
        image1.src = model.uploadImg;
        image1.onload = function() {
            initCanvas();
        }
    }



    canvas.addEventListener("touchstart", function(event) {
        pointerStart(event);
    });

    canvas.addEventListener("touchmove", function(event) {
        pointerMove(event);
    });

    canvas.addEventListener("touchend", function(event) {
        pointerEnd(event);
    });
}
function removeEventListener(){
    canTouch = false;
}

function initCanvas(){
    // regular rotation about a point

    context.save();
    context.drawImage(image1, 0, 0);
    context.restore();
    context.drawImage(image2, 0, 0, 240, 360);


    image1.xPos = w / 2;
    image1.yPos = h / 2;
    image1.initWidth = image1.width;
    image1.initHeight = image1.height;
    image1.currentWidth = scale(image1.initHeight, viewableArea, image1.initWidth);
    image1.currentHeight = viewableArea;
    if (image1.currentWidth < viewableArea) {
        image1.currentWidth = viewableArea;
        image1.currentHeight = scale(image1.initWidth, viewableArea, image1.initHeight);
    }
    image1.initAngle = 0;
    image1.angle = 0;


    window.requestAnimationFrame(update);
    loader.addClass('hide');
    $('.operate').removeClass('hide');
}


function scale(oldSize, newSize, other) {
    var scaleFactor = newSize / oldSize;
    return other * scaleFactor;
}





function pointerStart(event) {
    if(!canTouch) return;

    var relativeTouch1;
    var relativeTouch2;

    // single touch
    if (event.touches !== undefined && event.touches.length === 1) {
        relativeTouch1 = getRelative(event.touches[0]);
        //position
        touch.touch1PosX = relativeTouch1.x;
        touch.touch1PosY = relativeTouch1.y;

        touch.offsetX = touch.touch1PosX - image1.xPos;
        touch.offsetY = touch.touch1PosY - image1.yPos;
    }
    // multi touch
    else if (event.touches !== undefined && event.touches.length > 1) {
        image1.initAngle = image1.angle;
        image1.initWidth = image1.currentWidth;
        image1.initHeight = image1.currentHeight;
        relativeTouch1 = getRelative(event.touches[0]);
        relativeTouch2 = getRelative(event.touches[1]);

        //position
        touch.touch1PosX = relativeTouch1.x;
        touch.touch1PosY = relativeTouch1.y;
        touch.touch2PosX = relativeTouch2.x;
        touch.touch2PosY = relativeTouch2.y;

        var mid = findMidPoint(relativeTouch1, relativeTouch2);
        touch.offsetX = mid.x - image1.xPos;
        touch.offsetY = mid.y - image1.yPos;

        //angle
        touch.initAngle = slopeAngle(relativeTouch1, relativeTouch2);
        touch.angle = slopeAngle(relativeTouch1, relativeTouch2);
        touch.angleChange = 0;
        //length
        touch.initLength = findLength(relativeTouch1, relativeTouch2);
        touch.lengthChange = 0;
    }
}

function pointerMove(event) {
    if(!canTouch) return;

    var relativeTouch1;
    var relativeTouch2;
    event.preventDefault();
    touches = event.touches;
    // single touch
    if (event.touches !== undefined && event.touches.length === 1) {
        relativeTouch1 = getRelative(event.touches[0]);

        //position
        touch.touch1PosX = relativeTouch1.x;
        touch.touch1PosY = relativeTouch1.y;

        relativeTouch1 = {
            x: touch.touch1PosX - touch.offsetX,
            y: touch.touch1PosY - touch.offsetY
        };
        moveImage(image1, relativeTouch1);
    }
    // multi touch
    if (event.touches !== undefined && event.touches.length > 1) {
        relativeTouch1 = getRelative(event.touches[0]);
        relativeTouch2 = getRelative(event.touches[1]);

        //position
        touch.touch1PosX = relativeTouch1.x;
        touch.touch1PosY = relativeTouch1.y;
        touch.touch2PosX = relativeTouch2.x;
        touch.touch2PosY = relativeTouch2.y;
        //angle
        touch.angle = slopeAngle(relativeTouch1, relativeTouch2);
        touch.angleChange = touch.angle - touch.initAngle;

        //length
        touch.length = findLength(relativeTouch1, relativeTouch2);
        touch.lengthChange = touch.length - touch.initLength;

        relativeTouch1 = {
            x: touch.touch1PosX,
            y: touch.touch1PosY
        };
        relativeTouch2 = {
            x: touch.touch2PosX,
            y: touch.touch2PosY
        };
        var mid = findMidPoint(relativeTouch1, relativeTouch2);

        twoFingerRotate(image1, mid);
        twoFingerResize(image1, mid);
        mid.x -= touch.offsetX;
        mid.y -= touch.offsetY;
        moveImage(image1, mid);
    }

    // Mouse
    if (mouseDown) {
        relativeMouse = {
            x: touch.touch1PosX - touch.offsetX,
            y: touch.touch1PosY - touch.offsetY
        };
        moveImage(image1, relativeMouse);
    }
}

function pointerEnd(event) {
    if(!canTouch) return;

    image1.initAngle = image1.angle;
    image1.initWidth = image1.currentWidth;
    image1.initHeight = image1.currentHeight;

    //position
    //angle
    touch.angle = 0;
    touch.angleChange = 0;
    //length
    touch.length = 0;
    touch.lengthChange = 0;

    if (event !== undefined) {
        if (event.touches !== undefined && event.touches.length == 1) {
            relativeTouch1 = getRelative(event.touches[0]);
            touch.touch1PosX = relativeTouch1.x;
            touch.touch1PosY = relativeTouch1.y;
            touch.offsetX = touch.touch1PosX - image1.xPos;
            touch.offsetY = touch.touch1PosY - image1.yPos;
        }
    }
}

function moveImage(image, location) {
    if (isInsideImage(image, location)) {
        image.xPos = location.x;
        image.yPos = location.y;
    }
}
function getRelative(position) {
    return {
        x: makeRelative(position).x,
        y: makeRelative(position).y
    };
}

function makeRelative(object) {
    var relativeCoords;

    //touch
    if (typeof object.clientX !== "undefined") {
        relativeCoords = {
            x: (object.clientX - canvas.getBoundingClientRect().left) * scaleFactor,
            y: (object.clientY - canvas.getBoundingClientRect().top) * scaleFactor
        };
        // mouse
    } else {
        relativeCoords = {
            x: (object.x - canvas.getBoundingClientRect().left) * scaleFactor,
            y: (object.y - canvas.getBoundingClientRect().top) * scaleFactor
        };
    }
    return relativeCoords;
}
function isInsideImage(image, pointer) {
    return isInside(image.xPos - image.currentWidth / 2, image.yPos - image.currentHeight / 2, image.currentWidth, image.currentHeight, pointer.x, pointer.y);
}

function isInside(x1, y1, width1, height1, x2, y2) {
    return x2 >= x1 &&
        x2 < x1 + width1 &&
        y2 >= y1 &&
        y2 < y1 + height1;
}


function drawRotatedImage(image) {
    context.save();
    context.translate(image.xPos, image.yPos);
    context.rotate(image.angle);
    context.translate(-image.xPos, -image.yPos);
    context.drawImage(image, 0, 0, image.width, image.height, image.xPos - (image.currentWidth / 2), image.yPos - (image.currentHeight / 2), image.currentWidth, image.currentHeight);
    context.restore();

    context.drawImage(image2, 0, 0, 240, 360);
}







function findLength(start, end) {
    var a = end.x - start.x;
    var b = end.y - start.y;
    var csq = (a * a) + (b * b);
    return Math.floor(Math.sqrt(csq));
}

function findMidPoint(start, end) {
    return {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
    };
}

function slopeAngle(start, end) {
    var run = end.x - start.x;
    var rise = end.y - start.y;
    return Math.atan2(run, rise);
}


function resizeImage(image, newWidth) {
    var origHeight = image.currentHeight;
    var origWidth = image.currentWidth;

    if (newWidth < 100) {
        newWidth = 100;
    } else {
        newWidth = newWidth;
    }
    image.currentWidth = newWidth;
    image.currentHeight = (origHeight / origWidth) * newWidth;
}

function twoFingerResize(image, location) {
    if (isInsideImage(image, location)) {
        touch.lengthChange = touch.length - touch.initLength;
        resizeImage(image, image.initWidth + touch.lengthChange);
    }
}

function twoFingerRotate(image, location) {
    if (isInsideImage(image, location)) {
        image.angle = image.initAngle - touch.angleChange;
    }
}

function downImg() { //下载图片
    var image = canvas.toDataURL("image/jpeg", 0.5).replace("image/jpeg|image/png", "image/octet-stream");
    return image;
}

function update() {
    context.clearRect(0, 0, w, h);
    context.fillStyle = "#a50c0c";
    context.fillRect(0, 0, w, h);

    drawRotatedImage(image1);
    window.requestAnimationFrame(update);
}