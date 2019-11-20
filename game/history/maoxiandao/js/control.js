/*ajax*/
function dataRun(apiurl,param,callback){
	var urlbase='http://jeremy.xhwxpos.com/Starbucks/';
	$.ajax({
		url:urlbase+apiurl,
		data:param,
		type:'POST',
		dataType:'JSON',
		success:callback,
		timeout:8000,
		error:function(XMLHttpRequest, textStatus){
			//alert('啊哦~您的网络似乎不稳定~请返回重试吧！ '+textStatus);
		}
	})
}

/*check mark*/
var checkerr=function(jdata){
	if(typeof(jdata.sta)=='undefined'){return true;}
	switch(jdata.sta){
		case 1:
			alert(jdata.msg);
			return false;
		break;
		case 2:
			window.location.href=jdata.url;
			return false;
		break;
		case 0:
				var pic_url=jdata.pic_url;
				var share_url=jdata.share_url;
				var desc=jdata.desc;
				var openid=jdata.openid;
				  wx.ready(function () {
	  		wx.showOptionMenu();
	  		     //分享到朋友圈
        wx.onMenuShareTimeline({
            title: desc, // 分享标题
            link:share_url, // 分享链接
            imgUrl: pic_url, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                var url="{:U('WeixinApi/share_census')}";
                var data={
                    openid:openid,
                     type:"Timeline",
                     url:share_url
                    
                }
                $.post(url,data,function(){
                })
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: "",  // 分享标题
            desc: desc, // 分享描述
            link: share_url, // 分享链接
            imgUrl: pic_url, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                var url="{:U('WeixinApi/share_census')}";
                var data={
                    openid:openid,
                  	type:"App",
                  	url:share_url
                  
                }
                $.post(url,data,function(){

                })
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
	  });
		    return true;
		break;    
	}
}

//http://jeremy.xhwxpos.com/Starbucks/index.php?g=Wap&m=WeixinApi&a=save_info
//http://jeremy.xhwxpos.com/Starbucks/index.php?g=Wap&m=WeixinApi&a=get_piclist
//http://jeremy.xhwxpos.com/Starbucks/index.php?g=Wap&m=WeixinApi&a=post_num

/*提交照片*/
function setSave_info(callback,param){
    if(!LS.get('ls_openid')){
        alert('获取用户信息失败!请重新授权');return;
    }
    save_infoCallBack=function(jdata){
        if(checkerr(jdata)){
            if(typeof(callback)=='function'){
            callback(jdata);
            }
        }
    }
    dataRun('index.php?g=Wap&m=WeixinApi&a=save_info',param,save_infoCallBack);
}

/*提交个人信息*/
function setSave_myinfo(callback,param){
	if(!LS.get('ls_openid')){
		alert('获取用户信息失败!请重新授权');return;
	}
	save_myinfoCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?g=Wap&m=WeixinApi&a=save_myinfo',param,save_myinfoCallBack);
}

/*获取图片列表*/
function getGet_piclist(callback,param){
	if(!LS.get('ls_openid')){
		alert('获取用户信息失败!请重新授权');return;
	}
	get_piclistCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?g=Wap&m=WeixinApi&a=get_piclist',param,get_piclistCallBack);
}

/*获取图片列表*/
function setPost_num(callback,param){
	if(!LS.get('ls_openid')){
		alert('获取用户信息失败!请重新授权');return;
	}
	post_numCallBack=function(jdata){
		if(checkerr(jdata)){
			if(typeof(callback)=='function'){
			callback(jdata);
		    }
		}
	}
	dataRun('index.php?g=Wap&m=WeixinApi&a=post_num',param,post_numCallBack);
}




/*手机验证*/
function checkMobile(s){
  var regu =/^[1][3-9][0-9]{9}$/;
  var re = new RegExp(regu);
  if (re.test(s)) {
  return true;
  }else{
  return false;
  }
}


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