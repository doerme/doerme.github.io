$(function(){
    $('#gameCanvas').css({'width':window.innerWidth+'px','height':window.innerHeight+'px'}).attr({'width':window.innerWidth,'height':window.innerHeight});
    var canvas = $("#gameCanvas");
    var canvasWidth = canvas.attr('width');
    var canvasHeight = canvas.attr('height');
    var game_start_time=new Date();
    var last_time_step=0;

    var cur_select=0;

    var m_canvas = document.createElement('canvas');
    m_canvas.width = canvasWidth;
    m_canvas.height = canvasHeight;
    var ctx = m_canvas.getContext('2d');
    var m_context = canvas.get(0).getContext("2d");

    var rc={};/*role config*/
    var gameRoadVate = 100;/*X轴移动速度*/
    var gameRoadOffsetX=0;/*路面偏移量*/
    var stoneOutChange=38;/*石头出现几率*/
    var stoneCount=0;
    var y_ini=0;/*路面基础Y值*/
    var gameplay=false;
    var image_run = new Image();
    var image_stone_0 = new Image();
    var image_stone_1 = new Image();
    var image_stone_2 = new Image();
    var image_stone_02 = new Image();
    var image_stone_12 = new Image();
    var image_stone_22 = new Image();
	var image_stone_03 = new Image();
    var image_stone_13 = new Image();
    var image_stone_23 = new Image();
    var image_bg = new Image();
    var image_road = new Image();
    var stone_array=[];
    image_stone_0.src='./imgs/gameview/bgs0_1.png?v=1';
    image_stone_02.src='./imgs/gameview/bgs0_2.png?v=1';
	image_stone_03.src='./imgs/gameview/bgs0_3.png?v=1';
    image_stone_1.src='./imgs/gameview/bgs1_1.png?v=1';
    image_stone_12.src='./imgs/gameview/bgs1_2.png?v=1';
	image_stone_13.src='./imgs/gameview/bgs1_3.png?v=1';
    image_stone_2.src='./imgs/gameview/bgs2_1.png?v=1';
    image_stone_22.src='./imgs/gameview/bgs2_2.png?v=1';
	image_stone_23.src='./imgs/gameview/bgs2_3.png?v=1';

    

    var drawRoleCommon=function(){
        ctx.drawImage(image_run,getRcStep(),0,rc.unit_width,rc.unit_height,rc.x,rc.y,rc.unit_width,rc.unit_height);
    }
    image_run.onload = function(){
        drawRoleCommon();
    };

    var drawRoad = function(TimeStamp){
        gameRoadOffsetX-=gameRoadVate*TimeStamp/1000;
        //$('.js-game_bg_bottom').css('background-position',gameRoadOffsetX+'px 0px');
        var changewidh=image_road.width*50/image_road.height;
        var gameRoadOffsetX_use=gameRoadOffsetX%changewidh;
        ctx.drawImage(image_road,0,0,image_road.width,image_road.height,gameRoadOffsetX_use,canvasHeight-50,image_road.width*50/image_road.height,50);
        ctx.drawImage(image_road,0,0,image_road.width,image_road.height,gameRoadOffsetX_use+changewidh,canvasHeight-50,changewidh,50);
        ctx.drawImage(image_road,0,0,image_road.width,image_road.height,gameRoadOffsetX_use+changewidh*2,canvasHeight-50,changewidh,50);

        // var changewidh_bg=image_bg.width*(canvasHeight-50)/image_bg.height;
        // var gameBgOffsetX_use=gameRoadOffsetX/10%changewidh_bg;
        // ctx.drawImage(image_bg,0,0,image_bg.width,image_bg.height,gameBgOffsetX_use,0,changewidh_bg,canvasHeight-50);
        // ctx.drawImage(image_bg,0,0,image_bg.width,image_bg.height,gameBgOffsetX_use+changewidh_bg,0,changewidh_bg,canvasHeight-50);
        // ctx.drawImage(image_bg,0,0,image_bg.width,image_bg.height,gameBgOffsetX_use+changewidh_bg*2,0,changewidh_bg,canvasHeight-50);
    };

    var getRcStep = function(){
        rc.stepsum++;
        if(parseInt(rc.stepsum/rc.stepstamp)==1){
            rc.curstep++;
            rc.stepsum=0;
        }
        if(rc.curstep>=rc.unit_step.length){
            rc.curstep=0;
        }
        return rc.unit_step[rc.curstep];
    }

    var setRcY = function(TimeStamp){
        if(rc.offset_y>=0){
             rc.vy-=TimeStamp*520/1000;
             rc.offset_y+=TimeStamp*rc.vy/1000;
        }
        if(rc.offset_y<0){
            rc.offset_y=0;
            rc.vy=0;
            rc.jumpcur=0;
        }
        rc.y = y_ini;
        rc.y -= rc.offset_y+rc.offset_y_add;
    }

    var setRcX = function(TimeStamp){
        rc.x = canvasWidth/4;
        rc.x += rc.offset_x;
    }

    /*石头出现*/
    var setStone = function(TimeStamp){
        var mf = parseInt(Math.random()*1000);
        var nostone=100;
        if(Math.abs(parseInt(gameRoadOffsetX/10))<nostone){
            return;
        }
        if(stoneCount*10>(Math.abs(parseInt(gameRoadOffsetX/10))-nostone)/8){
            return;
        }
        rc.stone_index=Math.round(Math.random()*2);
        if(1000-mf<stoneOutChange){
            stone_array.push(new stone_small(rc.stone[rc.stone_index],canvasWidth,canvasHeight-50-rc.stone[rc.stone_index].height+rc.stone_y_offset,gameRoadVate,0,rc.stone[rc.stone_index].width,rc.stone[rc.stone_index].height));
            stoneCount++;
        }
    }

    /*设置路面移动速度*/
    var setRoadVate = function(TimeStamp){
        gameRoadVate=Math.abs(parseInt(gameRoadOffsetX/10))/10+300;
        var tmp_num=Math.abs(parseInt(gameRoadOffsetX/1000))/3;
        if(tmp_num<8){
            rc.stepstamp=10-tmp_num;
        }
    }

    /*碰撞检测*/
    var setWar = function(stone){
        if(Math.abs(rc.x+rc.offset_x_add-stone.x) <= (rc.unit_width+stone.width-40)/2){
            if(Math.abs(rc.y-stone.y) <= (rc.unit_height+stone.height-20)/2){
                gameplay=false;
                $('.js-rs_num').html(Math.abs(parseInt(gameRoadOffsetX/10)));
                console.log('crash');
                goNext();
                window.location.href='game_rank.html?cur_select='+cur_select;
            }
        }
    }

    /*石头逻辑*/
    var drawStone = function(TimeStamp){
        for(var n in stone_array){
            ctx.drawImage(stone_array[n].obj,0,0,stone_array[n].width,stone_array[n].height,stone_array[n].x,stone_array[n].y,stone_array[n].width,stone_array[n].height);
            stone_array[n].x-=gameRoadVate*TimeStamp/1000;
            setWar(stone_array[n]);
            if(stone_array[n].x<-stone_array[n].width){
                stone_array.shift();
            }
        }
    }

    var drawGameRole = function(TimeStamp){
        setRcY(TimeStamp);
        setRcX(TimeStamp);
        drawRoleCommon(TimeStamp);
    };

    

    var drawGameUI = function(TimeStamp){
        $('.js-game_score_ui').html(Math.abs(parseInt(gameRoadOffsetX/10))+' 米');
    }

    var updateTimeStamp = function(TimeStamp){
        if(TimeStamp>0){
            last_time_step =  TimeStamp;
        }else{
            requestAnimationFrame(updateTimeStamp);
        }
    }

    var repeatGame = function(){
        updateTimeStamp(0)
        stone_array=[];
        gameRoadOffsetX=0;
        rc.stepstamp=8;
        stoneCount=0;
        gameplay=true;
        animate(last_time_step);
    }

    var gameIni = function(index){
        console.log(index);

        index=parseInt(index);
        switch(index){
            case 0:
                cur_select=0;
                image_run.src='./imgs/pao1_n.png';
                image_road.src='./imgs/gameview/bg_ground1.jpg?v=1';
                image_bg.src='./imgs/gameview/bg1.jpg?v=1';
                rc.unit_width=70;
                rc.unit_height=80;
                rc.unit_step=[0,70,140,210];
                rc.curstep=0;
                rc.stepstamp=8;
                rc.stepsum=1;
                rc.x=0;
                rc.y=0;
                rc.offset_x=0;
                rc.offset_y=0;
                rc.offset_y_add=-10;
                rc.offset_x_add=0;
                rc.vx=0;
                rc.vy=0;
                rc.jumplimit=2;
                rc.jumpcur=0;
                rc.stone=[image_stone_1,image_stone_12,image_stone_13];
                rc.stone_index=0;
                rc.stone_y_offset=0;

                $('.js-game_bg_bottom').css({'background':'url(./imgs/gameview/bg_ground1.jpg) repeat-x left top','background-size':'auto 100%'});
                $('.game_bg_top').css({'background':'url(./imgs/gameview/bg1.jpg) repeat-x left top','background-size':'auto 100%'}).addClass('game_bgtop_move1').removeClass('shide');
            break;
            case 1:
                cur_select=1;
                image_run.src='./imgs/pao2_n2.png';
                image_road.src='./imgs/gameview/bg_ground0.jpg?v=1';
                image_bg.src='./imgs/gameview/bg0.jpg?v=1';
                rc.unit_width=80;
                rc.unit_height=80;
                rc.unit_step=[0,80,160];
                rc.curstep=0;
                rc.stepstamp=8;
                rc.stepsum=1;
                rc.x=0;
                rc.y=0;
                rc.offset_x=0;
                rc.offset_y=0;
                rc.offset_y_add=-5;
                rc.offset_x_add=0;
                rc.vx=0;
                rc.vy=0;
                rc.jumplimit=2;
                rc.jumpcur=0;
                rc.stone=[image_stone_0,image_stone_02,image_stone_03];
                rc.stone_index=0;
                rc.stone_y_offset=0;
  
                $('.js-game_bg_bottom').css({'background':'url(./imgs/gameview/bg_ground0.jpg) repeat-x left top','background-size':'auto 100%'});
                $('.game_bg_top').css({'background':'url(./imgs/gameview/bg0.jpg) repeat-x left top','background-size':'auto 100%'}).addClass('game_bgtop_move1').removeClass('shide');
            break;
            case 2:
                cur_select=2;
                image_run.src='./imgs/pao3_n.png';
                image_road.src='./imgs/gameview/bg_ground2.jpg?v=1';
                image_bg.src='./imgs/gameview/bg2.jpg?v=1';
                rc.unit_width=55;
                rc.unit_height=80;
                rc.unit_step=[0,55,110];
                rc.curstep=0;
                rc.stepstamp=8;
                rc.stepsum=1;
                rc.x=0;
                rc.y=0;
                rc.offset_x=0;
                rc.offset_y=0;
                rc.offset_y_add=-12;
                rc.offset_x_add=0;
                rc.vx=0;
                rc.vy=0;
                rc.jumplimit=2;
                rc.jumpcur=0;
                rc.stone=[image_stone_2,image_stone_22,image_stone_23];
                rc.stone_index=0;
                rc.stone_y_offset=0;
 
                $('.js-game_bg_bottom').css({'background':'url(./imgs/gameview/bg_ground2.jpg) repeat-x left top','background-size':'auto 100%'});
                $('.game_bg_top').css({'background':'url(./imgs/gameview/bg2.jpg) repeat-x left top','background-size':'auto 100%'}).addClass('game_bgtop_move1').removeClass('shide');
            break;

        }
        y_ini=canvasHeight-50-rc.unit_height;
        setTimeout(function(){
            repeatGame();
        },600);
    }

    console.log(!isNaN(getUrlPara('cur_select')));
    if(getUrlPara('cur_select')&&!isNaN(getUrlPara('cur_select'))){
        gameIni(getUrlPara('cur_select'));
        goNext();
    }

    $('#gameCanvas').on('fastClick',function(){
        if(rc.jumpcur<rc.jumplimit){
            rc.vy=300;
        }
        rc.jumpcur++;
    })

    $('.js-restart').on('fastClick',function(){
            goPrev();
            setTimeout(function(){
                repeatGame();
            },600);
    });

    $('.js-select-role').on('fastClick',function(){
        var index=$(this).index();
        gameIni(index);
    })

    function animate(TimeStamp){
        //console.log(TimeStamp);
        if(!gameplay){
            last_time_step=TimeStamp;
            return;
        }
        m_context.clearRect(0, 0, canvasWidth, canvasHeight);
        m_context.drawImage(m_canvas, 0, 0);
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        

        drawRoad(TimeStamp-last_time_step);
        drawGameRole(TimeStamp-last_time_step);
        setStone(TimeStamp-last_time_step);
        setRoadVate(TimeStamp-last_time_step);
        drawStone(TimeStamp-last_time_step);
        drawGameUI(TimeStamp-last_time_step);
        last_time_step=TimeStamp;

        

        requestAnimationFrame(animate);
    }

});

var stone_small = function(obj,x,y,vx,vy,width,height){
    this.obj=obj;
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.width=width;
    this.height=height;
};