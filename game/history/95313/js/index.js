(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);

$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);

$(document).swipeUp(function(){
	if (isAnimating) return;
	if($('.page-'+now.row+'-'+now.col).data("lock")==1) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 6) { 
	now.row = last.row+1; now.col = 1;
	pagefilter(now.row);
	pageMove(towards.up);
	}	
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	if($('.page-'+now.row+'-'+now.col).data("lock")==1) return;
	last.row = now.row;
	last.col = now.col;
	console.log(last);
	if (last.row!=1) { 
	now.row = last.row-1; now.col = 1; 
	pagefilter(now.row);
	pageMove(towards.down);
	}	
})

/*页数开始的逻辑*/
function pagefilter(page){
	if(page==4){
		$("#outer").removeClass(); /*重置转盘样式*/
	}
	if(page==3){
		check95313();/*95313验证*/
	}

} 

/*95313界面*/
var click_str=['9','5','3','1','3']; /*记录95313 的顺序*/
var click_index=0; /*记录当前点击的次序*/
function check95313(){
   $("#loading-line").removeClass("pt-page-moveFromTop pt-page-mkloading");	
   var img_code=['0','5','4','1','3','3','6','9','8','2'];
   img_code=shuffle(img_code);
   var tmp_html='';
   for(n=0;n<img_code.length;n++){
    tmp_html+='<img data-val="'+img_code[n]+'" src="imgb/p3_gs_'+img_code[n]+'.jpg" class="js-check-code" />';
   }
   $("#gs_main_ctrl").html(tmp_html);
   $(".js-check-code").bind("tap",function(){
   	$(this).addClass("pt-page-bounceOut");
   	if($(this).data("val")==click_str[click_index]){
     ++click_index;
     if(click_index==5){
     	setTimeout(function(){
     		$(".gs_block").hide();
     		$("#loading-line").addClass("pt-page-mkloading");
     		$("#js-restnum").html(js_restnum);
     		$("#js-jifen").html(js_jifen);
     	},200);/*95313输入完毕 隐藏gs_block  开始游戏倒计时  loading动画在css里面调 120s */
     }
   	}else{
   	  click_index=0;	
      check95313();
      /*输入错误 重置95313 方法*/
   	}

   });
   $(".gs_block").show();
}



/*数组乱序*/
function shuffle (inputArr) {
    var valArr = [],k = ''; 
    for (k in inputArr) { // Get key and value arrays
      if (inputArr.hasOwnProperty(k)) {
        valArr.push(inputArr[k]);
      }
    }
    valArr.sort(function () {
      return 0.5 - Math.random();
    });
    return valArr;
}

//$(document).swipeLeft(function(){
//	if (isAnimating) return;
//	last.row = now.row;
//	last.col = now.col;
//	if (last.row>1 && last.row<5 && last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}	
//})
//
//$(document).swipeRight(function(){
//	if (isAnimating) return;
//	last.row = now.row;
//	last.col = now.col;
//	if (last.row>1 && last.row<5 && last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}	
//})

/*hb*/
/*
7 45 iphone
6 90 10
5 135 again
4 180 300
3 225 200
2 270 100
1 315 again
0 360 5
*/
var canzp=1;
$("#js-go-zp").tap(function(){
	if(canzp==2){ return;}
	canzp=2;
	var tmp_css_array=["pt-page-rotate360","pt-page-rotate315","pt-page-rotate270","pt-page-rotate225","pt-page-rotate180","pt-page-rotate135","pt-page-rotate90","pt-page-rotate45"];
	/*随机获得转盘需要到的值*/
	var tmp_css_num=parseInt(Math.random()*(tmp_css_array.length-1));
	/*ajax*/
	$("#outer").removeClass();
	setTimeout(function(){$("#outer").addClass(tmp_css_array[tmp_css_num]);},10)
	$(".xjj_dh,.djj_dh,.xjj_num,.djj_num").addClass("shide");
	$(".prize_main").removeClass("xjj djj wzj");
	switch(tmp_css_num){
		case 0:$(".xjj_num").html("5元");$(".xjj_dh,.xjj_num").removeClass("shide");$(".prize_main").addClass("xjj");break;
		case 1:$(".prize_main").addClass("wzj");break;
		case 2:$(".djj_num").html("￥100元");$(".djj_dh,.djj_num").removeClass("shide");$(".prize_main").addClass("djj");break;
		case 3:$(".djj_num").html("￥200元");$(".djj_dh,.djj_num").removeClass("shide");$(".prize_main").addClass("djj");break;
		case 4:$(".djj_num").html("￥300元");$(".djj_dh,.djj_num").removeClass("shide");$(".prize_main").addClass("djj");break;
		case 5:$(".prize_main").addClass("wzj");break;
		case 6:$(".xjj_num").html("10元");$(".xjj_dh,.xjj_num").removeClass("shide");$(".prize_main").addClass("xjj");break;
		case 7:break;
	}
	setTimeout(function(){
		$(".prize_result").show();
		canzp=1;
	},6000);
	
});

$(".close_bt").tap(function(){
	$(".prize_result").hide();
});

/*gameagain*/
$("#gameagain").tap(function(){
	$("#js-restnum").html(js_restnum);
    $("#js-jifen").html(js_jifen);
    if(js_restnum>0){
	init();
	}else{
		alert("尊敬的用户，您今天剩余游戏次数为0;");
	}
});

/*gamenext*/
$("#gamenext").tap(function(){
    if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 6) { 
	now.row = last.row+1; now.col = 1;
	pagefilter(now.row);
	pageMove(towards.up);
	}	
});

/*godonate*/
$("#godonate").tap(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 6) { 
	now.row = last.row+1; now.col = 1;
	pagefilter(now.row);
	pageMove(towards.up);
	}	
});

/*hb*/


function pageMove(tw){
	var lastPage = ".page-"+last.row+"-"+last.col,
		nowPage = ".page-"+now.row+"-"+now.col;
	
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		$(lastPage).find("div").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		$(nowPage).find("div").removeClass("hide");
		
		isAnimating = false;
	},600);
}
})();
//ping
var pop_up_note_mode = true;
        var note_id = 1;

        function $$(name) {
            return document.getElementById(name);
        }
        function switchsound() {
            au = $$('bgsound');
            ai = $$('sound_image');
            if (au.paused) {
                au.play();
                ai.src = "img/music_note_big.png";
                pop_up_note_mode = true;
                popup_note();
                $$("music_txt").innerHTML = "打开";
                $$("music_txt").style.visibility = "visible";
                setTimeout(function () { $$("music_txt").style.visibility = "hidden" }, 2500);
            }
            else {
                pop_up_note_mode = false;
                au.pause();
                ai.src = "img/music_note_big.png";
                $$("music_txt").innerHTML = "关闭";
                $$("music_txt").style.visibility = "visible";
                setTimeout(function () { $$("music_txt").style.visibility = "hidden" }, 2500);
            }
        }

        function on_pop_note_end(event) {
            note = event.target;

            if (note.parentNode == $$("note_box")) {
                $$("note_box").removeChild(note);
             }
        }

        function popup_note() {
            box = $$("note_box");

            note = document.createElement("span");
            note.style.cssText = "visibility:visible;position:absolute;background-image:url('img/music_note_small.png');width:15px;height:25px";
            note.style.left = Math.random() * 20 + 20;
            note.style.top = "75px";
            this_node = "music_note_" + note_id;
            note.setAttribute("ID", this_node);
            note_id += 1;
            scale = Math.random() * 0.4 + 0.4;
            note.style.webkitTransform = "rotate(" + Math.floor(360 * Math.random()) + "deg) scale(" + scale + "," + scale + ")";
            note.style.webkitTransition = "top 2s ease-in, opacity 2s ease-in, left 2s ease-in";
            note.addEventListener("webkitTransitionEnd", on_pop_note_end);
            box.appendChild(note);

            setTimeout("document.getElementById('" + this_node + "').style.left = '0px';", 100);
            setTimeout("document.getElementById('" + this_node + "').style.top = '0px';", 100);
            setTimeout("document.getElementById('" + this_node + "').style.opacity = '0';", 100);

            if (pop_up_note_mode) {
                setTimeout("popup_note()", 600);
            }
        }        
        function playbksound() {
            var audiocontainer = $$('audiocontainer');
            if (audiocontainer != undefined) {
                audiocontainer.innerHTML = '<audio id="bgsound" loop="loop" autoplay="autoplay"> <source src="' + gSound + '" /> </audio>';
            }
           
            var audio = $$('bgsound');
            audio.play();
            sound_div = document.createElement("div");
            sound_div.setAttribute("ID", "cardsound");
            sound_div.style.cssText = "position:fixed;right:20px;top:20px;z-index:50000;visibility:visible;";
            sound_div.onclick = switchsound;
            if (document.body.offsetWidth > 400) {
                bg_htm = "<img id='sound_image' src='img/music_note_big.png'>";
                box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-20px;top:-80px'></div>";
            }
            else {
                bg_htm = "<img id='sound_image' width='30px' src='img/music_note_big.png'>";
                box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-5px;top:-80px'></div>";
            }
            txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-40px;top:30px;width:60px'></div>"
            sound_div.innerHTML = bg_htm + box_htm + txt_htm;
            document.body.appendChild(sound_div);
            setTimeout("popup_note()", 100);
        } 
		
		//分享
		function shareFriend() {
			WeixinJSBridge.invoke('sendAppMessage', {
				"appid": appid,
				"img_url": imgUrl,
				"img_width": "640",
				"img_height": "640",
				"link": lineLink,
				"desc": descContent,
				"title": shareTitle
			},
			function(res) {
				_report('send_msg', res.err_msg);
			})
		}
		function shareTimeline() {
			WeixinJSBridge.invoke('shareTimeline', {
				"img_url": imgUrl,
				"img_width": "640",
				"img_height": "640",
				"link": lineLink,
				"desc": descContent,
				"title": shareTitle
			},
			function(res) {
				_report('timeline', res.err_msg);
			});
		}
		function shareWeibo() {
			WeixinJSBridge.invoke('shareWeibo', {
				"content": descContent,
				"url": lineLink,
			},
			function(res) {
				_report('weibo', res.err_msg);
			});
		}
		document.addEventListener('WeixinJSBridgeReady',
		function onBridgeReady() {
			// 发送给好友
			WeixinJSBridge.on('menu:share:appmessage',
			function(argv) {
				shareFriend();
			});
			// 分享到朋友圈
			WeixinJSBridge.on('menu:share:timeline',
			function(argv) {
				shareTimeline();
			});
			// 分享到微博
			WeixinJSBridge.on('menu:share:weibo',
			function(argv) {
				shareWeibo();
			});
		},
		false); 