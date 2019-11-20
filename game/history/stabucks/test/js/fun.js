document.addEventListener('touchmove',function(event){
    event.preventDefault(); },false);
/*view port*/
$(function () {
	var DEFAULT_WIDTH = 640,
		ua = navigator.userAgent.toLowerCase(),
		deviceWidth = window.screen.width,
		devicePixelRatio = window.devicePixelRatio || 1,
		targetDensitydpi;
	if (ua.indexOf("android") !== -1 && parseFloat(ua.slice(ua.indexOf("android")+8)) < 4) {
		targetDensitydpi = DEFAULT_WIDTH / deviceWidth * devicePixelRatio * 160;
		$('meta[name="viewport"]').attr('content', 'target-densitydpi=' + targetDensitydpi + ', width=device-width, user-scalable=no');
	}
});
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

/*ajax*/
function dataRun(apiurl,param,callback){
	var urlbase='http://yuezhan.gdtengnan.com/';
	$.ajax({
		url:urlbase+apiurl,
		data:param,
		dataType:'JSONP',
		jsonpCallback:callback,
		timeout:8000,
		error:function(XMLHttpRequest, textStatus){
			alert('连接超时，请稍后再访问 '+textStatus);
		}
	})
}