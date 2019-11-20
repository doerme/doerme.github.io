(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);

$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

document.addEventListener('touchmove',function(event){event.preventDefault(); },false);
/*
$(".page-1-1").get(0).addEventListener('touchmove',function(event){event.preventDefault(); },false);
$(".page-2-1").get(0).addEventListener('touchmove',function(event){event.preventDefault(); },false);
$(".page-3-1 .img_1").get(0).addEventListener('touchmove',function(event){event.preventDefault(); },false);
$(".page-3-1 .mb-title").get(0).addEventListener('touchmove',function(event){event.preventDefault(); },false);
$(".page-3-1 .mb-bt-block").get(0).addEventListener('touchmove',function(event){event.preventDefault(); },false);
$(".page-3-1 .mb-bt-note").get(0).addEventListener('touchmove',function(event){event.preventDefault(); },false);
*/
$(document).swipeUp(function(){
	/*
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 3) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
	*/
})

$(document).swipeDown(function(){
	/*
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
	*/
})

/*maoxian*/

/*share*/
$("#js-share-bt").tap(function(){
    shareDialog();
});

$("#share").tap(function(){
	closeDialog();
});

/*again*/
$("#js-again").tap(function(){
	window.location.href=window.location.href;
});

/*guize*/
$("#js-gz-bt,#js-gz-bt2").tap(function(){
	$("#js-gz-block").removeClass("hide");
	setTimeout(function(){$("#js-gz-block").removeClass("pt-page-moveFromTopFade");},1000);
});
$("#js-closegz").tap(function(){
	$("#js-gz-block").addClass("pt-page-moveToTopFade");
	setTimeout(function(){$("#js-gz-block").removeClass("pt-page-moveToTopFade").addClass("hide pt-page-moveFromTopFade");},1000);
})

/*to the game page*/
$("#js-start-game").tap(function(){
    if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 3) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
});

/*rank-list*/
$("#tmp_gonext").tap(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 3) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
//document.addEventListener('touchmove', bodyScroll(e), false);
});

var _box_y = 300; 
$(".rank-list").swipeUp(function(){
 var _offset_val=$(".mb-list-block").scrollTop();	
 $(".mb-list-block").get(0).scrollTop = _offset_val+_box_y; 

 //console.log(_box_y,_offset_val);
})

$(".rank-list").swipeDown(function(){ 
 var _offset_val=$(".mb-list-block").scrollTop();	
 $(".mb-list-block").get(0).scrollTop = _offset_val-_box_y; 
})

$(".rank-list").eq(0).show();
$("#js-zhichi").tap(function(){
	$(".rank-list").hide();
	$("#list_type").html("点赞");
    $(".rank-list").eq(0).show();
});
$("#js-nengli").tap(function(){
	$(".rank-list").hide();
	$("#list_type").html("成绩");
    $(".rank-list").eq(1).show();	
});

/*game main tap*/
$(".ac_list").eq(0).show();

var game_index=0;
var game_score=0;
var game_rest=30;
var game_start=0;
var game_time_ini;
$(".tgm").each(function(index, element) {
    $(this).get(0).addEventListener("touchstart", touchStart, false);
	$(this).get(0).addEventListener("touchmove", touchMove, false);
	$(this).get(0).addEventListener("touchend", touchEnd, false);
	$(this).get(0).addEventListener("touchcancel", touchCancel, false);
});
function touchStart(event) {
	var touch = event.touches[0];
	startY = touch.pageY;
	startX = touch.pageX;
	left_offset=startX-$(this).offset().left;
	top_offset=startY-$(this).offset().top;
}
function touchMove(event) {
	var touch = event.touches[0];
	//endX = touch.pageX;
	endY = touch.pageY;
	//$(this).css({"left":endX-left_offset,"top":endY-top_offset});
	if(endY-top_offset>80){
		game_index++;
		top_offset=endY;
		if(game_index>2){game_index=0;}
		if(game_start==0){game_start=1;gametimestart();}
		game_score++;
		if(game_score>0){
			$(".ac_list").hide();
			$(".ac_list").eq(1).show();
		}

		if(game_score>100){
			$(".ac_list").hide();
			$(".ac_list").eq(2).show();
		}

		if(game_score>200){
			$(".ac_list").hide();
			$(".ac_list").eq(3).show();
		}

		$("#js-game-score").html(game_score);
	}
/*
	if(top_offset-endY>80){
		game_index--;
		top_offset=endY;
		if(game_index<0){game_index=2;}
		if(game_start==0){game_start=1;gametimestart();}
	}
*/
	showgameimg(game_index);
}
function touchEnd(event){
}
function touchCancel(event){
}
function showgameimg(n){
	$(".tgm").addClass("gh");
	$(".gm_"+n).removeClass("gh");
}
function gametimestart(){
	$("#js-guide").hide();
    game_time_ini=setInterval(function(){
    	if(game_rest>0){game_rest--;$("#js-game-resttime").html(game_rest);}else{gameEnd();}
    },1000);
}

function gameEnd(){
	clearInterval(game_time_ini);
	$("#js-fl-score").html(game_score);
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 3) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
}

//document.removeEventListener('touchmove', bodyScroll(e), false);
//<div class="mb-title">活动剩余时间：<span>73</span>天<span>23</span>小时<span>25</span>分<span>59</span>秒</div>
/*set time*/
setInterval(function(){
actdaoshu();
},200);
function actdaoshu(){
    var now = new Date();
	var grt= new Date("3/18/2015 00:00:00");
	var clock='';
	if(now>grt){
		clock = '活动剩余时间：<span>0</span>天<span>0</span>小时<span>0</span>分<span>0</span>秒';
	}
	else{
		now.setTime(now.getTime()+250);
		days = (grt - now) / 1000 / 60 / 60 / 24;
		dnum = Math.floor(days);
		hours = (grt - now) / 1000 / 60 / 60 - (24 * dnum);
		hnum = Math.floor(hours);
		if(String(hnum).length ==1 ){hnum = "0" + hnum;}
		minutes = (grt - now) / 1000 /60 - (24 * 60 * dnum) - (60 * hnum);
		mnum = Math.floor(minutes);
		if(String(mnum).length ==1 ){mnum = "0" + mnum;}
		seconds = (grt - now) / 1000 - (24 * 60 * 60 * dnum) - (60 * 60 * hnum) - (60 * mnum);
		snum = Math.round(seconds);
		if(String(snum).length ==1 ){snum = "0" + snum;}		
		//clock = '<p>距离除夕还有 </p><p><span>'+dnum+'</span>'+'天<span>'+hnum+'</span>小时<span>'+mnum+'</span>分钟<span>'+snum+'</span>秒</p>'
		clock='活动剩余时间：<span>'+dnum+'</span>天<span>'+hnum+'</span>小时<span>'+mnum+'</span>分<span>'+snum+'</span>秒'
	}		
	$(".mb-title").html(clock);
}

/*maoxian end*/



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