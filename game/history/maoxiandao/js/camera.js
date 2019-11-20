var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var canTouch = true;
var canvasStyleWidth = parseInt(canvas.width);
var scaleFactor = canvas.width / canvasStyleWidth;
var viewableArea = canvasStyleWidth * scaleFactor;
var currentSelection;
var relativeMouse;
var relativeTouch1;
var relativeTouch2;
var pointerOn = false;
var mouseDown = false;
var mouseMoving = false;
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
var image1 = new Image();
var image2 = new Image();
var image3 = new Image();


image2.src='imgs/canvas_logo.png';
image2.onload = function(){
    image2.xPos = image2.width/2+10;
    image2.yPos = image2.height/2+20;
    image2.initWidth = image2.width;
    image2.initHeight = image2.height;
    image2.currentWidth = image2.width;
    image2.currentHeight = image2.height;
    image2.initAngle = 0;
    image2.angle = 0;
    update(image2);
};

image3.src='imgs/canvas_bottom.png';
image3.onload = function(){
    image3.xPos = image3.width / 2;
    image3.yPos = canvas.height - image3.height/2;
    image3.initWidth = image3.width;
    image3.initHeight = image3.height;
    image3.currentWidth = image3.width;
    image3.currentHeight = image3.height;
    image3.initAngle = 0;
    image3.angle = 0;
    update(image3);
};




function fileChange(e){
    var f = e.files[0];//一次只上传1个文件，其实可以上传多个的
    var FR = new FileReader();
    FR.onload = function(f){
        compressImg(this.result,canvas.width);
    };
    FR.readAsDataURL(f);//先注册onload，再读取文件内容，否则读取内容是空的
}

function compressImg(imgData,maxWidth){
    if(!imgData)return;
    image1.onload = function(){
        image1.xPos = canvas.width / 2;
        image1.yPos = canvas.height / 2;
        image1.initWidth = image1.width;
        image1.initHeight = image1.height;
        image1.currentWidth = scale(image1.initHeight, viewableArea, image1.initWidth);
        image1.currentHeight = viewableArea;
        //alert(image1.initWidth+','+image1.currentHeight);
        if (image1.currentWidth < viewableArea) {
            image1.currentWidth = viewableArea;
            image1.currentHeight = scale(image1.initWidth, viewableArea, image1.initHeight);
        }
        //alert(image1.currentWidth+','+image1.currentHeight);
        image1.initAngle = 0;
        image1.angle = 0;
        update(image1);
    };
    image1.src = imgData;
}

function getCurrentSelection(position){
    return image1;
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
canvas.addEventListener("touchcancel", function(event) {
    pointerEnd(event);
});

function scale(oldSize, newSize, other) {
    var scaleFactor = newSize / oldSize;
    return other * scaleFactor;
}

function pointerStart(event) {
    if(!canTouch) return;
    currentSelection=getCurrentSelection(event.touches[0]);
    var relativeTouch1;
    var relativeTouch2;

    // single touch
    if (event.touches !== undefined && event.touches.length === 1) {
        relativeTouch1 = getRelative(event.touches[0]);
        //position
        touch.touch1PosX = relativeTouch1.x;
        touch.touch1PosY = relativeTouch1.y;
        touch.offsetX = touch.touch1PosX - currentSelection.xPos;
        touch.offsetY = touch.touch1PosY - currentSelection.yPos;
    }
    // multi touch
    else if (event.touches !== undefined && event.touches.length > 1) {
        currentSelection.initAngle = currentSelection.angle;
        currentSelection.initWidth = currentSelection.currentWidth;
        currentSelection.initHeight = currentSelection.currentHeight;
        relativeTouch1 = getRelative(event.touches[0]);
        relativeTouch2 = getRelative(event.touches[1]);

        //position
        touch.touch1PosX = relativeTouch1.x;
        touch.touch1PosY = relativeTouch1.y;
        touch.touch2PosX = relativeTouch2.x;
        touch.touch2PosY = relativeTouch2.y;

        var mid = findMidPoint(relativeTouch1, relativeTouch2);
        touch.offsetX = mid.x - currentSelection.xPos;
        touch.offsetY = mid.y - currentSelection.yPos;

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
        moveImage(currentSelection, relativeTouch1);
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

        twoFingerRotate(currentSelection, mid);
        twoFingerResize(currentSelection, mid);
        mid.x -= touch.offsetX;
        mid.y -= touch.offsetY;
        moveImage(currentSelection, mid);
    }

    // Mouse
    if (mouseDown) {
        relativeMouse = {
            x: touch.touch1PosX - touch.offsetX,
            y: touch.touch1PosY - touch.offsetY
        };
        moveImage(currentSelection, relativeMouse);
    }
    update(currentSelection);
}

function pointerEnd(event) {
    if(!canTouch) return;

    currentSelection.initAngle = currentSelection.angle;
    currentSelection.initWidth = currentSelection.currentWidth;
    currentSelection.initHeight = currentSelection.currentHeight;

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
            touch.offsetX = touch.touch1PosX - currentSelection.xPos;
            touch.offsetY = touch.touch1PosY - currentSelection.yPos;
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
    ctx.save();
    ctx.translate(image.xPos, image.yPos);
    ctx.rotate(image.angle);
    ctx.translate(-image.xPos, -image.yPos);
    drawImageIOSFix(ctx,image, 0, 0, image.width, image.height, (image.xPos - (image.currentWidth / 2)), (image.yPos - (image.currentHeight / 2)), image.currentWidth, image.currentHeight);
    //ctx.drawImage(image, 0, 0, image.width, image.height, (image.xPos - (image.currentWidth / 2)), (image.yPos - (image.currentHeight / 2)), image.currentWidth, image.currentHeight);

    ctx.restore();
    ctx.save();
    ctx.translate(image2.xPos, image2.yPos);
    ctx.rotate(image2.angle);
    ctx.translate(-image2.xPos, -image2.yPos);
    ctx.drawImage(image2, 0, 0, image2.width, image2.height, image2.xPos - (image2.currentWidth / 2), image2.yPos - (image2.currentHeight / 2), image2.currentWidth, image2.currentHeight);
    ctx.restore();

    ctx.restore();
    ctx.save();
    ctx.translate(image3.xPos, image3.yPos);
    ctx.rotate(image3.angle);
    ctx.translate(-image3.xPos, -image3.yPos);
    ctx.drawImage(image3, 0, 0, image3.width, image3.height, image3.xPos - (image3.currentWidth / 2), image3.yPos - (image3.currentHeight / 2), image3.currentWidth, image3.currentHeight);
    ctx.restore();

    drawFont();
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

function update(image) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRotatedImage(image);
}

/*滤镜调整*/

var brighterMatrix =
    [
        1, 0, 0, 0, 30,
        0, 1, 0, 0, 30,
        0, 0, 1, 0, 30,
        0, 0, 0, 1, 0,
    ];

var darkerMatrix =
    [
        1, 0, 0, 0, -30,
        0, 1, 0, 0, -30,
        0, 0, 1, 0, -30,
        0, 0, 0, 1, 0,
    ];

var identityMatrix =
    [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0,
    ];

function loadColorMatrix(matrix){
    var imageData=ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.putImageData(colorMatrixFilter(imageData,matrix),0,0);
}

function colorMatrixFilter(pixels, m) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        var a = d[i + 3];

        d[i]   = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4];
        d[i+1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9];
        d[i+2] = r * m[10]+ g * m[11]+ b * m[12]+ a * m[13]+ m[14];
        d[i+3] = r * m[15]+ g * m[16]+ b * m[17]+ a * m[18]+ m[19];
    }
    return pixels;
};

function drawFont(){
    // var draw_name="郑小火";
    // var draw_position="解放中路支行";
    // var draw_say="希望够二十个字希望够二十个字希望够";
    //var draw_name=$('#js-name').val();
    //var draw_position=$('#js-position').val();
    //var draw_say=$('#js-say').val();
    //var _ret = draw_say.split('');
    //var draw_say_line=['','','','',''];
    //ctx.fillStyle="rgba(0,0,0,0.8)";  //填充的颜色
    //ctx.fillRect(20,400,200,200);  //填充颜色 x y坐标 宽 高
    //
    //ctx.font = "20px Microsoft Yahei";
    //ctx.fillStyle = "#FFFFFF";
    //ctx.fillText(draw_name, 40, 450);
    //ctx.fillText(draw_position, 40, 480);
    ////console.log(_ret);
    //ctx.font = "24px Microsoft Yahei";
    //for(var n in _ret){
    //    var _index=parseInt(n/8);
    //    //console.log(_index,_ret[n]);
    //    draw_say_line[_index]+=_ret[n];
    //}
    ////console.log(draw_say_line);
    //var _draw_y=510
    //for(var n in draw_say_line){
    //    ctx.fillText(draw_say_line[n], 40, _draw_y);
    //    _draw_y+=33;
    //}

    var _draw_y=440;
    var _draw_x=50;
    if(_mod_num==1){
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('本人', _draw_x, _draw_y);
        _draw_x=100;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(0).text()+'...', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=10;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('没什么特别嗜好...', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=120;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('但讨厌', _draw_x, _draw_y);
        _draw_x=205;
        ctx.font = "bold 30px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('被关注', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=50;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('讨厌其他职业装备比我好...', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=20;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我只想', _draw_x, _draw_y);
        _draw_x=115;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(1).text(), _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=85;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我为自己', _draw_x, _draw_y);
        _draw_x=185;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(2).text(), _draw_x, _draw_y);
    }
    if(_mod_num==2){
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(0).text(), _draw_x, _draw_y);
        _draw_x=260;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('参上!', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=130;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('如影如风', _draw_x, _draw_y);
        _draw_x=230;
        ctx.font = "bold 30px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('如空气', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=30;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('最爱一击出暴击,', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=120;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('最厌有人,', _draw_x, _draw_y);
        _draw_x=220;
        ctx.font = "bold 30px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('抢我怪,', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=20;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我就是', _draw_x, _draw_y);
        _draw_x=115;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(1).text(), _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=125;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我就是', _draw_x, _draw_y);
        _draw_x=220;
        ctx.font = "bold 30px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('暗影双刃', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=40;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我只为自己', _draw_x, _draw_y);
        _draw_x=190;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(2).text(), _draw_x, _draw_y);
    }
    if(_mod_num==3){
        _draw_x=50;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我是!', _draw_x, _draw_y);
        _draw_x=110;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(0).text(), _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=85;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我喜欢粉色花边蕾丝短裙', _draw_x, _draw_y);
        _draw_y+=40;
        _draw_x=25;
        ctx.font = "bold 30px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('讨厌', _draw_x, _draw_y);
        _draw_x=95;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('挂机被打蠢,', _draw_x, _draw_y);
        _draw_y+=45;
        _draw_x=65;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('最爱大把大把,', _draw_x, _draw_y);
        _draw_x=215;
        ctx.font = "bold 30px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('收糖果', _draw_x, _draw_y);
        _draw_y+=45;
        _draw_x=15;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('小萝莉,', _draw_x, _draw_y);
        _draw_x=105;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(1).text(), _draw_x, _draw_y);
        _draw_y+=45;
        _draw_x=15;
        ctx.font = "bold 24px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText('我只为自己,', _draw_x, _draw_y);
        _draw_x=180;
        ctx.font = "bold 45px Microsoft Yahei";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText($('.js-fb-main .ip').eq(2).text(), _draw_x, _draw_y);
    }


}


/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 * This is a bug in iOS6 devices. This function from https://github.com/stomita/ios-imagefile-megapixel
 *
 */
function detectVerticalSquash(img) {
    var iw = img.naturalWidth, ih = img.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = ih;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, 1, ih).data;
    // search image edge pixel position in case it is squashed vertically.
    var sy = 0;
    var ey = ih;
    var py = ih;
    while (py > sy) {
        var alpha = data[(py - 1) * 4 + 3];
        if (alpha === 0) {
            ey = py;
        } else {
            sy = py;
        }
        py = (ey + sy) >> 1;
    }
    var ratio = (py / ih);
    return (ratio===0)?1:ratio;
}

/**
 * A replacement for context.drawImage
 * (args are for source and destination).
 */
function drawImageIOSFix(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio = detectVerticalSquash(img);
    // Works only if whole image is displayed:
    // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
    // The following works correct also when only a part of the image is displayed:
    ctx.drawImage(img, sx * vertSquashRatio, sy * vertSquashRatio,
        sw * vertSquashRatio, sh * vertSquashRatio,
        dx, dy, dw, dh );
}