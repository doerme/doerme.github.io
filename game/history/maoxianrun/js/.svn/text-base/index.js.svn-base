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

$('.page').swipe({
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {

      if($(this).data('lock')==1){
        return false;
      }

      switch(direction){
        case 'up':
        if($(this).attr('data-lock-up')==1){
        return false;
        }
        goNext();
        break;
        case 'left':
        if($(this).attr('data-lock-left')==1){
        return false;
        }
        goRight();
        break;
        case 'right':
        if($(this).attr('data-lock-right')==1){
        return false;
        }
        goLeft();
        break;
        case 'down':
        if($(this).attr('data-lock-down')==1){
        return false;
        }
        goPrev();
        break;
      }
    }
});

}

/*sx*/
$('.common_foot').html('<div class="cf_menu cur"><span></span>历史</div><div class="cf_menu"><span></span>目标</div><div class="cf_menu"><span></span>结果</div><div class="cf_menu"><span></span>查询</div>');
if($('.common_foot').data('cur')){
    $('.common_foot > .cur').removeClass('cur');
    $('.common_foot > .cf_menu').eq($('.common_foot').data('cur')).addClass('cur');
}
$('.common_foot').on('fastClick','.cf_menu',function(){
    switch($(this).index()){
        case 0:
        window.location.href='index.html';
        break;
        case 1:
        window.location.href='myaim_'+LS.get('pageex')+'.html';
        break;
        case 2:
        window.location.href='result_'+LS.get('pageex')+'.html?justlook=1';
        break;
        case 3:
        window.location.href='team_'+LS.get('pageex')+'.html';
        break;
    }
})

$('.common_to_top').on('fastClick',function(){
    //goNext();
})

$('.ct_back').on('fastClick',function(){
    goPrev();
})

/*show detail*/
$('.page').delegate('.col1','fastClick',function(){
    $('.photo_show.main .ps').attr('src',$(this).attr('src').replace('/prize/','/prize/big/').replace('.png','.jpg'));
    $('.photo_show').show();
    $('.js-sbt').html($(this).data('smiling'));
});

$('.ps_close_bt').on('fastClick', function () {
    $('.photo_show').hide();
});
/*show detail end*/


goNext=function(exbl){
	if (isAnimating && !exbl) return;
	last.row = now.row;
	last.col = now.col;
	if (last.row != 10) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}	
}

goPrev=function(exbl){
    if (isAnimating && !exbl) return;
    last.row = now.row;
    last.col = now.col;
    if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}  
}

goRight=function(exbl){
    if (isAnimating && !exbl) return;
    last.row = now.row;
    last.col = now.col;
    if (last.col==1) { now.row = last.row; now.col = 2; pageMove(towards.left);}
}

goLeft=function(exbl){
    if (isAnimating && !exbl) return;
    last.row = now.row;
    last.col = now.col;
    if (last.col==2) { now.row = last.row; now.col = 1; pageMove(towards.right);}
}

if($('.kiss_before')[0]){
    $('.kiss_before')[0].addEventListener("touchstart", function(event) {
        if(event.touches.length > 1){
            $('.kiss_before').fadeOut(200);
            $('.kiss_node').eq(1).fadeOut(200);
        }
    });
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
/*localStorage*/
(function(window,localStorage,undefined){
var LS = {
    set : function(key, value){
        //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
        //这时一般在setItem之前，先removeItem()就ok了
        if( this.get(key) !== null )
            this.remove(key);
        localStorage.setItem(key, value);
    },
    //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
    get : function(key){
        var v = localStorage.getItem(key);
        return v === undefined ? null : v;
    },
    remove : function(key){ localStorage.removeItem(key); },
    clear : function(){ localStorage.clear(); },
    each : function(fn){
        var n = localStorage.length, i = 0, fn = fn || function(){}, key;
        for(; i<n; i++){
            key = localStorage.key(i);
            if( fn.call(this, key, this.get(key)) === false )
                break;
            //如果内容被删除，则总长度和索引都同步减少
            if( localStorage.length < n ){
                n --;
                i --;
            }
        }
    }
},
j = window.jQuery, c = window.Core;
//扩展到相应的对象上
window.LS = window.LS || LS;
//扩展到其他主要对象上
if(j) j.LS = j.LS || LS;
if(c) c.LS = c.LS || LS;
})(window,window.localStorage);
		
function getUrlPara(paraName){  
   var sValue=location.search.match(new RegExp("[\?\&]"+paraName+"=([^\&]*)(\&?)","i"))
   return sValue?sValue[1]:sValue
} 

function pageex_zhiji_mapper(zhiji){
    switch(zhiji){
        case 'yewuyuan':
            return 'ywy';
        break;
        case 'ywy':
            return 'yewuyuan';
        break;
        case 'zhuren':
            return 'zr';
        break;
        case 'zr':
            return 'zhuren';
        break;
        case 'jingli':
            return 'jl';
        break;
        case 'jl':
            return 'jingli';
        break;
        case 'fenbujingli':
            return 'fbjl';
        break;
        case 'fbjl':
            return 'fenbujingli';
        break;    
    }
}

var setKeyboard=function(){
    $('.aim_input ,.af2_input').each(function(){
        $this=$(this);
        $this.after('<div class="aim_input_block">'+$this.val()+'</div>');
        $this.hide();
    });

    $('body').append('<div class="number_keyboard"></div>');
    $number_keyboard=$('.number_keyboard');
    $number_keyboard.append('<div class="kb_show js-kb_show"></div>');
    $number_keyboard.append('<div class="kb_line"><span class="js-kbi">1</span><span class="js-kbi">2</span><span class="js-kbi">3</span></div>');
    $number_keyboard.append('<div class="kb_line"><span class="js-kbi">4</span><span class="js-kbi">5</span><span class="js-kbi">6</span></div>');
    $number_keyboard.append('<div class="kb_line"><span class="js-kbi">7</span><span class="js-kbi">8</span><span class="js-kbi">9</span></div>');
    $number_keyboard.append('<div class="kb_line"><span class="js-kbi bg2">.</span><span class="js-kbi">0</span><span class="js-kb_del bg2">删除</span></div>');
    $number_keyboard.append('<div class="kb_line"><span class="js-kb_ok">确认</span></div>');
    $('.aim_input_block').on('fastClick',function(){
        $this=$(this);
        $this.addClass('js_cur_input');
        $('.js-kb_show').html($this.text());
        $number_keyboard.show();
    });
    $('.js-kbi').on('fastClick',function(){
        $this=$(this);
        $('.js-kb_show').append($this.text());
    })
    $('.kb_line span').on('fastClick',function(){
        $this=$(this);
        $this.css({'opacity':'0.5'});
        setTimeout(function(){
            $this.css({'opacity':'1'});
        },50);
    });
    $('.js-kb_del').on('fastClick',function(){
        $('.js-kb_show').html($('.js-kb_show').text().substr(0,$('.js-kb_show').text().length-1));
    })
    $('.js-kb_ok').on('fastClick',function(){
        $this=$(this);
        $('.js_cur_input').html($('.js-kb_show').text());
        $('.js_cur_input').prev('.aim_input').val($('.js-kb_show').text());
        $('.js_cur_input').prev('.af2_input').val($('.js-kb_show').text());
        $('.js_cur_input').removeClass('js_cur_input');
        $number_keyboard.hide();
    });
}