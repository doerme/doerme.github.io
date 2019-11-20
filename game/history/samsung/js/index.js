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
	if(last.row==4){adaptscreen(480);}
	if (last.row != 5) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	if($('.page-'+now.row+'-'+now.col).data("lock")==1) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}	
})

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
var photo_start_time=new Date();
var photo_end_time=new Date();
var end_key=0;
var adv_key=0;
$('.img_guize_bt').on('tap',function(){
	$('.act_guize').show();
});
$('#js-closegz').on('tap',function(){
	$('.act_guize').hide();
});

$('.page-1-1').on('tap',function(){
	//console.log(event.target);
	if($(event.target).hasClass('img_guize_bt')){return;}
	if($(event.target).hasClass('img_guize_mark')){return;}
	if($(event.target).hasClass('img_guize_main')){return;}
	if($(event.target).parents('.img_guize_main').size()>0){return;}
	goNext();
});

$('#js_s1_guide').on('tap',function(){
   startphoto(1);

});

$('#js_s2_guide').on('tap',function(){
   startphoto(2);
});
$('#js_s3_guide').on('tap',function(){
   startphoto(3);
});

function startphoto(n){
	$('.scenceplay,.daojishi,.scenceresult').addClass('shide');
	$('#js_s'+n+'_guide,#js_s'+n+'_guide_tis').hide();
    $('.page-'+(n*1+1)+'-1 .img_sp').eq(0).removeClass('shide');
    daojishi(n);
}


function daojishi(page){
	$('.daojishi').removeClass('shide');
	var tmp_time=0;
	var tmp_iter=setInterval(function(){
		tmp_time++;
		if(tmp_time<=13){
            $('.img_daojishi').eq(page-1).children('.daojishi_mini').addClass('shide');
            $('.img_daojishi').eq(page-1).children('.daojishi_mini').eq(tmp_time-1).removeClass('shide');
		}else{
			$('.daojishi').addClass('shide');
			$('.js_photo_bt,.js_focus').removeClass('shide');
			clearInterval(tmp_iter);
			playscene(page);
		}
	},230);
}

function playscene(n){
	photo_start_time=new Date();
	var focus_x=[];
	var focus_y=[];
	var photo_index=0;
	if(n==1){
		focus_x=[138,102,45,30,0,-10,-50,-100,-125];
		focus_y=[117,175,230,290,335,395,465,615,685];
		var tmp_iter=setInterval(function(){
		if(end_key>0){
           clearInterval(tmp_iter);	
           endphoto(end_key,photo_index);
		}else if(photo_index<8 && end_key==0){
			photo_index++;
			$('.page-2-1 .img_sp').addClass('shide');
            $('.page-2-1 .img_sp').eq(photo_index).removeClass('shide');
            $('.js_focus').eq(n-1).css({'marginLeft':focus_x[photo_index]+'px','top':focus_y[photo_index]+'px'});
		}else{
			clearInterval(tmp_iter);
			playscene(n);
		}
	},150);

		
	}/*end 1*/
	if(n==2){
		focus_x=[-214,-164,-119,-94,-46,-29,6,21,6];
		focus_y=[750,656,566,482,415,336,280,210,135];
		var tmp_iter=setInterval(function(){
		if(end_key>0){
           clearInterval(tmp_iter);	
           endphoto(end_key,photo_index);
		}else if(photo_index<8 && end_key==0){
			photo_index++;
			$('.page-3-1 .img_sp').addClass('shide');
            $('.page-3-1 .img_sp').eq(photo_index).removeClass('shide');
            $('.js_focus').eq(n-1).css({'marginLeft':focus_x[photo_index]+'px','top':focus_y[photo_index]+'px'});
		}else{
			clearInterval(tmp_iter);
			playscene(n);
		}
	},150);

		
	}/*end 2*/
	if(n==3){
		focus_x=[-90,-65,-65,-60,5,50,0,-40,-80];
		focus_y=[468,353,440,405,425,365,450,290,355];
		var tmp_iter=setInterval(function(){
		if(end_key>0){
           clearInterval(tmp_iter);
           endphoto(end_key,photo_index);
		}else if(photo_index<8 && end_key==0){
			photo_index++;
			$('.page-4-1 .img_sp').addClass('shide');
            $('.page-4-1 .img_sp').eq(photo_index).removeClass('shide');
            $('.js_focus').eq(n-1).css({'marginLeft':focus_x[photo_index]+'px','top':focus_y[photo_index]+'px'});
		}else{
			clearInterval(tmp_iter);
				playscene(n);
		}
	},150);

		
	}/*end 3*/
}

$('.js_photo_bt').on('tap',function(){
	end_key=$(this).data('photo');
})

function endphoto(n,photo_index){
	console.log(photo_index);
	var play_times=$('.share_bt').eq(n-1).data('num');
    play_times++;
    $('.share_bt').eq(n-1).data('num',play_times);
	end_key=0;
	photo_end_time=new Date();
	var focus_x=[];
	var focus_y=[];
	if(n==1){
	    focus_x=[60,60,60,60,60,60,30,0,0];
		focus_y=[0,0,80,100,160,240,300,450,520];
	}
	if(n==2){
	    focus_x=[0,0,0,0,50,60,60,60,60];
		focus_y=[540,500,400,320,260,200,120,60,0];
	}
	if(n==3){
	    focus_x=[60,60,60,60,60,60,60,60,60];
		focus_y=[290,250,330,300,300,300,300,160,210];
	}
	$('.scenceresult').removeClass('shide');
	$('.next_bt').addClass('shide');
	setTimeout(function(){$('.img_photo_mask').addClass('shide');},500);
	showresult();
	$('.result_view').attr('style','background:url(./imgs/scene'+n+'/s'+(photo_index*1+1)+'.jpg) no-repeat -'+focus_x[photo_index]+'px -'+focus_y[photo_index]+'px');
	if((photo_index==6 && n==1) ||(photo_index==8 && n==2)||(photo_index==8 && n==3)){
		$('.replay_bt').eq(n-1).addClass('shide');
		$('.next_bt').eq(n-1).removeClass('shide');
		$('.result_title').eq(n-1).html('0.7秒快速启动拍照');
		$('.result_content').eq(n-1).html('成功捕捉最精彩瞬间');
	}else{
		if(play_times>=3){
	   	alert('天了噜，你还是跳过此关然后换三星S6吧～');
	   	$('.share_bt').eq(n-1).html('跳过此关');
	   }
	}
}



function showresult(){

}


function showadv(long){
	$('.common_adv.main').eq(adv_key++).show();
	$('.common_adv.timeshow').show();
	var adv_last=long;
     $('.common_adv.timeshow').html('剩余'+adv_last+'秒');
     var adv_time=setInterval(function(){
     	adv_last--;
     	$('.common_adv.timeshow').html('剩余'+adv_last+'秒');
     	if(adv_last<0){
     		clearInterval(adv_time);
     		$('.common_adv').hide();
     		$('.scenceplay,.daojishi,.scenceresult').addClass('shide');
     		goNext();
     	}
     },1000);
}

$('.next_bt').on('tap',function(){	 
     showadv(2);
});

$('.replay_bt').on('tap',function(){
	replay($(this).data('photo'));
});

$('.share_bt').on('tap',function(){
	 var tmp_num=$(this).data('num');
	 if(tmp_num>=3){
         showadv(5);
	 }else{
	 	$("#share").show();
	 }
})
$('#share').on('tap',function(){
	$("#share").hide();
})
$('#js_open_hongbao').on('tap',function(){
	$('#js_hongbao').removeClass('shide');
})

function replay(n){
	$('.scenceplay,.daojishi,.scenceresult').addClass('shide');
	$('#js_s'+n+'_guide,#js_s'+n+'_guide_tis').show();
}

function goNext(){
	if (isAnimating) return;
	last.row = now.row;
	last.col = now.col;
	if(last.row==4){adaptscreen(480);}
	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
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
		