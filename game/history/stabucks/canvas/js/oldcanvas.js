/*------------------------------------ canvas /*------------------------------------*/
function fileChange(e){
    var f = e.files[0];//一次只上传1个文件，其实可以上传多个的
    var FR = new FileReader();
    FR.onload = function(f){
    compressImg(this.result,640,function(data){//压缩完成后执行的callback
    });
    };
    FR.readAsDataURL(f);//先注册onload，再读取文件内容，否则读取内容是空的
}

function compressImg(imgData,maxWidth,onCompress){
    if(!imgData)return;
    onCompress = onCompress || function(){};
    maxWidth = maxWidth || 640;
    

    img.onload = function(){ 
    if(img.width > maxWidth) {//按最大高度等比缩放
    img.height *= maxWidth / img.height; 
    img.width = maxWidth; 
    }
    imgW=img.height;
    imgH=img.width;
    PO={x:LT.x+imgW/2,y:LT.y+imgH/2};
    console.log(PO);
    ctx.translate(PO.x,PO.y);//载入时将canvas坐标系原点移到图片中心点上
    onDraw();

    //ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
    //ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上 
    onCompress(canvas.toDataURL("image/jpeg"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布
    };
    img.src = imgData;
}

function startMove(){
        event.preventDefault();
        isDown=true;
        var loc=getEvtLoc();//获取鼠标事件在屏幕坐标系的位置（原点在canvas标签左上角）
        var x=loc.x,y=loc.y;
        beginX=x,beginY=y;
        console.log(loc);
        var cLoc=convertCoor(loc);
        var Xc=cLoc.x,Yc=cLoc.y;
        moveAble=imgIsDown(Xc,Yc);
        rotateAble=RTIsDown(Xc,Yc);     
        if (moveAble) canvas.style.cursor="move";
        if (rotateAble) canvas.style.cursor="crosshair";
}

function moving(){
    event.preventDefault();
    if(isDown==false) return;
    var loc=getEvtLoc();
    console.log(moveAble);
    if(moveAble){
        var x=loc.x,y=loc.y;
        var dx=x-beginX,dy=y-beginY;
        var mPO={x:PO.x+dx,y:PO.y+dy};//因为鼠标移动dx dy,所以PO在屏幕坐标系的坐标也 移动dx dy
        var cPO=convertCoor(mPO);//屏幕坐标系移动后的PO转换成canvas坐标系的坐标
        ctx.translate(cPO.x,cPO.y);//canvas坐标系原点移动到新的图片中心点      
        onDraw();
        
        PO.x=PO.x+dx;//记录下屏幕坐标系上PO的坐标变化
        PO.y=PO.y+dy;
        beginX=x,beginY=y;//记录移动后鼠标在屏幕坐标系的新位置   
    }else if(rotateAble){
        var cLoc=convertCoor(loc);
        var Xc=cLoc.x,Yc=cLoc.y;
        var newR = Math.atan2(Xc,-Yc);//在旋转前的canvas坐标系中 move的角度（因为旋钮在上方，所以跟，应该计算 在旋转前canvas坐标系中，鼠标位置和原点连线 与 y轴反方向的夹角）
        ctx.rotate(newR);
        rotate_radian+=newR;
        onDraw();
    }
}

function endMove(){
    event.preventDefault();
    isDown=false;
    moveAble=rotateAble=false;
    canvas.style.cursor="auto";
}

function getEvtLoc(){//获取相对canvas标签左上角的鼠标事件坐标
        var touch = event.touches[0];
        endX = touch.pageX;
        endY = touch.pageY;
        return {x:endX,y:endY};
}

function convertCoor(P) {//坐标变换 屏幕坐标系的点 转换为canvas坐标系的点
    console.log(P,PO);
    var x=P.x-PO.x;//在屏幕坐标系中，P点相对canvas坐标系原点PO的偏移
    var y=P.y-PO.y; 
    if(rotate_radian!=0){
        var len = Math.sqrt(x*x + y*y);
        var oldR=Math.atan2(y,x);//屏幕坐标系中 PO与P点连线 与屏幕坐标系X轴的夹角弧度         
        var newR =oldR-rotate_radian;//canvas坐标系中PO与P点连线 与canvas坐标系x轴的夹角弧度
        x = len*Math.cos(newR);
        y = len*Math.sin(newR);             
    }
    return {x:x,y:y};
}

function imgIsDown(x,y){
    return (-imgW/2<=x && x<=imgW/2 && -imgH/2<y && y<=imgH/2);
}

function RTIsDown(x,y){
    var round_center={x:0,y:-imgH/2-Selected_Round_R};
    var bool=getPointDistance({x:x,y:y},round_center)<=Selected_Round_R;
    return bool;
}

//获取两点距离
function getPointDistance(a,b){
    var x1=a.x,y1=a.y,x2=b.x,y2=b.y;
    var dd= Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    return dd;
}


function onDraw(){
    ctx.clearRect(-cvsW,-cvsH,2*cvsW,2*cvsH);
    ctx.drawImage(img,-imgW/2,-imgH/2); 
    //旋转控制旋钮
    ctx.beginPath();
    ctx.arc(0,-imgH/2-Selected_Round_R,Selected_Round_R,0,Math.PI*2,false);
    ctx.closePath();
    ctx.lineWidth=2;
    ctx.strokeStyle="#0000ff";
    ctx.stroke();
}