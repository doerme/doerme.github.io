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
	//last.row = now.row;
	//last.col = now.col;
	//if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
})


$(document).swipeDown(function(){
	if (isAnimating) return;
	//last.row = now.row;
	//last.col = now.col;
	//if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
})

/*monkey*/
$("#js-closegz").tap(function(){
	$("#js-gz").addClass("pt-page-moveToTopFade");
	setTimeout(function(){$("#js-gz").removeClass("pt-page-moveToTopFade").addClass("hide pt-page-moveFromTopFade");},1000);
});
$("#js-opengz").tap(function(){
	$("#js-gz").removeClass("hide");
	setTimeout(function(){$("#js-gz").removeClass("pt-page-moveFromTopFade");},1000);
});
$("#js-beginbt").tap(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
});
/*跳转到游戏界面*/
$("#js-gameplay").tap(function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
	setTimeout(function(){
    $("#js-the_net_aim").addClass("hide");
	},1500);
});
$("#js-game-block").tap(function(e){

});

/*倒计时*/
var start_second=30;
var start_date=new Date();
var no_end=0;
function daojishi(){
	var pass_second=parseInt(Math.abs(new Date()-start_date)/1000);
	$("#js-gametime").html(start_second-pass_second);
if(pass_second<start_second && no_end==0) {
	setTimeout(function(){daojishi();},1000);
}else if(pass_second>=start_second){gameend(0);};
}

/*猴子重置*/
var outplace=[
[0,200],[75,200],[150,200],[225,200],[300,200],[375,200],[450,200],
[0,300],[75,300],[150,300],[225,300],[300,300],[375,300],[450,300],
[0,400],[75,400],[150,400],[225,400],[300,400],[375,400],[450,400],
[0,500],[75,500],[150,500],[225,500],[300,500],[375,500],[450,500],
[0,600],[75,600],[150,600],[225,600],[300,600],[375,600],[450,600]
];
var outimgclass=['imgy0','imgy180','img45']
function gameplayini(){
	var random_1=parseInt(Math.random()*outplace.length);
	var random_2=parseInt(Math.random()*outplace.length);
	while(random_2==random_1){
    random_2=parseInt(Math.random()*outplace.length);
	}
	var random_class_1=parseInt(Math.random()*outimgclass.length);
	var random_class_2=parseInt(Math.random()*outimgclass.length);

	//console.log(random_class_1,random_class_2,random_1,random_2);
	//console.log(random_1,random_2,outplace);
	$("#js-mk_true").css({"left":outplace[random_1][0],"top":outplace[random_1][1]}).removeClass("imgy0 imgy180 img45").addClass(outimgclass[random_class_1]);
	$("#js-mk_false").css({"left":outplace[random_2][0],"top":outplace[random_2][1]}).removeClass("imgy0 imgy180 img45").addClass(outimgclass[random_class_2]);
	$("#js-mk_true , #js-mk_false").removeClass("pt-page-moveCircle").removeClass("hide");
	var tmp_timeout=0;
	switch(parseInt($("#js-gametime").html()/10)){
	case 3:
	case 2:tmp_timeout=1000;break;
	case 1:tmp_timeout=800;break;
	case 0:tmp_timeout=600;break;
	}
	autoplaymkgo=setTimeout(function(){autoplaymk();},tmp_timeout);
}

/*猴子点击*/
var autoplaymkgo='';
var zhuoqunum=0;
var zhuoqufen=0;
var isgamebegin=0;
var ismktap=false;
$("#js-mk_true , #js-mk_false").tap(function(e){
	if(ismktap){return;}
	ismktap=true;
	clearTimeout(autoplaymkgo);
	if($(this).data("fen")==1){
		++zhuoqunum;
		zhuoqufen+=10;
	}
	var tmp_left=$(this).offset().left;
	var tmp_top=$(this).offset().top;
	//console.log(tmp_left,tmp_top);
	$(this).addClass("pt-page-bounceOut");
	$("#js-the_net_aim").removeClass("hide pt-page-moveFromLeft pt-page-moveCircle");
	$("#js-the_net_aim").css({"top":tmp_top+45,"left":tmp_left+20},100).addClass("pt-page-moveCircle");
	$("#js-the_net").animate({"top":tmp_top+50,"left":tmp_left+160},100);

	$("#js-the_net").removeClass("hide").addClass("rotateInDownRight");
	setTimeout(function(){
		$("#js-the_net").removeClass("pt-page-moveFromLeft rotateInDownRight").addClass("hide");
		$("#js-mk_true , #js-mk_false").removeClass("pt-page-moveCircle pt-page-bounceOut").addClass("hide");
		if(isgamebegin==0){
			isgamebegin=1;
			start_date=new Date();
			daojishi();
		}
		gameplayini();
		$("#js-clicktrue").html(zhuoqunum);
		$("#js-score").html(zhuoqufen);
		$("#js-the_net_aim").addClass("hide");
		ismktap=false;
	},500);
});

/*自动出猴子*/
function autoplaymk(){
    if(ismktap){return;}
    $("#js-the_net").removeClass("pt-page-moveFromLeft rotateInDownRight").addClass("hide");
	$("#js-mk_true , #js-mk_false").removeClass("pt-page-moveCircle pt-page-bounceOut").addClass("hide");
	gameplayini();
	$("#js-clicktrue").html(zhuoqunum);
	$("#js-score").html(zhuoqufen);
	$("#js-the_net_aim").addClass("hide");
	ismktap=false;
}


function gameend(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
	$("#js-fenshow").html(zhuoqufen);
}

/*replay*/
$("#js-replay").tap(function(){
	window.location.href=window.location.href;
});
/*share*/
$("#share").tap(function(){
	closeDialog();
});

/*monkey end*/

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