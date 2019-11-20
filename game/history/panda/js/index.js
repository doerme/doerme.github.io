(function(){

var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;

s=window.innerHeight/500;
ss=250*(1-s);

s=1;ss=0;

$('.wrap').css('-webkit-transform','scale('+s+','+s+') translate(0px,-'+ss+'px)');

if(typeof(dontprevent)=='undefined'){
document.addEventListener('touchmove',function(event){
	event.preventDefault(); },false);
}

// $(document).swipeUp(function(){
// 	if (isAnimating) return;
// 	if($('.page-'+now.row+'-'+now.col).data("lock")==1) return;
// 	last.row = now.row;
// 	last.col = now.col;
// 	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
// })

// $(document).swipeDown(function(){
// 	if (isAnimating) return;
// 	if($('.page-'+now.row+'-'+now.col).data("lock")==1) return;
// 	last.row = now.row;
// 	last.col = now.col;
// 	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
// })

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
/*sx*/
$('.bxslider').bxSlider({
    'controls':true
});

$('.select_file').eq(1).on('change',function(){
    gSound = 'music/wa.wav'; 
    playbksound();
    $('.bxw').hide();
     goNext();
});


$('.p2_bt2').on('fastClick',function(){
    gSound = 'music/bucuo.mp3'; 
    playbksound();
    goNext();
    $('.rs_img1').attr('src',canvas.toDataURL());
    $('.rs_img2').attr('src',canvas2.toDataURL());
});

$('.p2_guize').on('fastClick',function(){
    $('#guize').show();
})
$('#guize').on('fastClick',function(){
    $('#guize').hide();
})

$('.p3_bt2').on('fastClick',function(){
    $('#share').show();
})
$('#share').on('fastClick',function(){
    $('#share').hide();
})

$('.p3_bt1').on('fastClick',function(){
    window.location.href= window.location.href;
})

$('.go_list,.go_list_font').on('fastClick',function(){
    window.location.href= 'list.html';
})

/*list*/
$('.list_p1_bt').on('fastClick',function(){
    window.location.href= 'index.html';
})

$('.share_close,.share_mask').on('fastClick',function(){
    $('.list_share').hide();
})

$('.list_block').on('fastClick',function(){
    $('.list_share').show();
})

goNext=function(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}
}

goPrev=function(){
    if (isAnimating) return;
    last.row = now.row;
    last.col = now.col;
    if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}
}

// $('#js-game_ctrl_ui').get(0).addEventListener("touchstart", touchStart, false);
// $('#js-game_ctrl_ui').get(0).addEventListener("touchmove", touchMove, false);
// $('#js-game_ctrl_ui').get(0).addEventListener("touchend", touchEnd, false);
// $('#js-game_ctrl_ui').get(0).addEventListener("touchcancel", touchEnd, false);

var startX, startY, endX, endY;
var left_offset=0;
var cur_offset=0;
var max_p=725;
var guanxing;
function touchStart(event){
    clearInterval(guanxing);
    var touch = event.touches[0];
    startX = touch.pageX;
    beginTimeOut();
}

function touchMove(event){
    if(endX>startX){return;}
    var touch = event.touches[0];
    endX = touch.pageX;
    left_offset=left_offset+endX-startX;
    $('#js-game_canvas').css('background-position',left_offset+'px 0px').hide();
    $('#js-game_canvas_move').css('background-position',left_offset+'px 0px').show();
    cur_offset=0;
    cur_offset=startX-endX;
}

function touchEnd(){
    var gxv=cur_offset;
    guanxing=setInterval(function(){
        left_offset-=gxv;
        gxv-=2;
        $('#js-game_canvas').css('background-position',left_offset+'px 0px').hide();
        $('#js-game_canvas_move').css('background-position',left_offset+'px 0px').show();
        if(gxv<=0){
            clearInterval(guanxing);
            $('#js-game_canvas').show();
            $('#js-game_canvas_move').hide();
        }
    },10);
    if(cur_offset>50){
        addScore();
    }
}
/*sx*/

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
            //ai = $$('sound_image');
            if (au.paused) {
                au.play();
                //ai.src = "/Starbucks/Tpl/Wap/starbucks/img/music_note_open.png";
                pop_up_note_mode = true;
                //popup_note();
                // $$("music_txt").innerHTML = "打开";
                // $$("music_txt").style.visibility = "visible";
                // setTimeout(function () { $$("music_txt").style.visibility = "hidden" }, 2500);
            }
            else {
                pop_up_note_mode = false;
                au.pause();
                //ai.src = "/Starbucks/Tpl/Wap/starbucks/img/music_note_close.png";
                // $$("music_txt").innerHTML = "关闭";
                // $$("music_txt").style.visibility = "visible";
                // setTimeout(function () { $$("music_txt").style.visibility = "hidden" }, 2500);
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
            note.style.cssText = "visibility:visible;position:absolute;background-image:url('/Starbucks/Tpl/Wap/starbucks/img/music_note_small.png');width:15px;height:25px";
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
                //setTimeout("popup_note()", 600);
            }
        }        
        function playbksound() {
            var audiocontainer = $$('audiocontainer');
            if (audiocontainer != undefined) {
                audiocontainer.innerHTML = '<audio id="bgsound" autoplay="autoplay"> <source src="' + gSound + '" /> </audio>';
            }
           
            var audio = $$('bgsound');
            audio.play();
            sound_div = document.createElement("div");
            sound_div.setAttribute("ID", "cardsound");
            sound_div.style.cssText = "position:fixed;right:20px;top:20px;z-index:50000;visibility:visible;";
            sound_div.onclick = switchsound;
            if (document.body.offsetWidth > 400) {
                bg_htm = "<img id='sound_image' src='/Starbucks/Tpl/Wap/starbucks/img/music_note_open.png'>";
                box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-20px;top:-80px'></div>";
            }
            else {
                bg_htm = "<img id='sound_image' width='30px' src='/Starbucks/Tpl/Wap/starbucks/img/music_note_close.png'>";
                box_htm = "<div id='note_box' style='height:100px;width:44px;position:absolute;left:-5px;top:-80px'></div>";
            }
            txt_htm = "<div id='music_txt' style='color:white;position:absolute;left:-40px;top:30px;width:60px'></div>"
            //sound_div.innerHTML = bg_htm + box_htm + txt_htm;
            sound_div.innerHTML=txt_htm;
            document.body.appendChild(sound_div);
            //setTimeout("popup_note()", 100);
        } 
		