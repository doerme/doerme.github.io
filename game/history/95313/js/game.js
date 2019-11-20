var byId = function (id) {
		return document.getElementById(id);
	}
	var boxWidth = 80; //格子宽度
	var gameBox;
	var mapid = 'game-box';//map element id
	var arr =['col_1','col_2','col_3','col_4','col_5','col_6','col_7','col_8'];
	var h = 8;  //高
	var w = 8; //宽
	var boxsLength = h*w;
	var boxArr = {};    //map对象
	var startBox = '';  //开始的格子
	var endBox = '';    //结束的格子
	window.onload = init;

	/*绑定触碰事件
	function bindTouch(){
	    if(bind_once==1){return;}
		$("#game-box > img").each(function(){
		tobetrigger($(this).get(0));
		});
		bind_once=1;
	}
    */
	//初始化
	function init() {
		byId('gameagain').style.display = 'none';
		byId('gamenext').style.display = 'none';
		boxsLength = h*w;
		boxArr = {};
		startBox = '';
		endBox = '';
		var str = '';
		gameBox = byId(mapid);
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				str += '<img id="t' + i + '_l' + j + '" src="imgg/blank.gif">'
			}
		}
		gameBox.innerHTML = str;
		gameBox.style.width = w * boxWidth + 'px';
		pushBoxArr();
		toHTML();
		//bindTouch();
		$("#game-box > img").tap(function(){
			choose($(this).get(0));
		});
	}

	// 随鸡获取坐标
	function getPosition() {
		var t, f;
		(function () {
			t = parseInt(Math.random() * h);
			l = parseInt(Math.random() * w);
			if (('t' + t + '_l' + l) in boxArr) {
				arguments.callee();
			}
		})();
		return {t:t, l:l}
	}

	// 创建随机坐标的格子
	function CearteBox(name) {
		var p = getPosition();
		this.name = name;
		this.t = p.t;
		this.l = p.l;
		this.position = 't' + p.t + '_l' + p.l;
	}

	// push boxRrr
	function pushBoxArr() {
		var index = 0;
		var last = arr.length - 1;
		for (var i = 0; i < h; i++) {
			for (var j = 0; j < w; j++) {
				var a = new CearteBox(arr[index]);
				boxArr['t' + a.t + '_l' + a.l] = a;
				if (index === last) {
					index = 0;
				} else {
					index += 1;
				}
			}
		}
	}

	// 初始化html
	function toHTML() {
		for (var i in boxArr) {
			byId(i).src = 'imgg/' + boxArr[i].name + '.png';
		}
	}

	// choose
	function choose(el) {
	//console.log(boxArr);
	  //try{
		if (el.src.indexOf('blank') >= 0) {
			return false;
		}else{
			el.className = 'active';
			if (startBox == '' || startBox == el.id) {
				startBox = el.id;
			} else {
				endBox = el.id;
				test(boxArr[startBox], boxArr[endBox]);
			}
		}
	  //}catch(e){}
	}

	// 判断是不是可连接格子
	function test(a, b) {
		var can = function (a, b) {
			if (a.name && b.name && a.name == b.name) {
				return true;
			} else {
				return false;
			}
		}(a, b);
		if (can) {
			go(a, b);
		} else {
			byId(startBox).className = '';
			startBox = endBox;
			endBox = '';
		}
	}

	// 判断是否连通
	function go(a, b) {
		var _ap = a.position, _bp = b.position;
		var a = a, b = b, temp, isKill = false;

		// 建立四个点，判断是否两两相通
		var pt1, pt2, pt3, pt4;
		// 上到下扫描
		if (isKill == false) {
			//交换位置
			if (a.t > b.t) {
				temp = a;
				a = b;
				b = temp;
			}
			for (var i = -1, len = h; i <= len; i++) {
				pt1 = a;
				pt2 = {t:i, l:a.l};
				pt3 = {t:i, l:b.l};
				pt4 = b;
				if( (!isNull(pt2) && (pt2.t != a.t) ) || ( !isNull(pt3) && (pt3.t != b.t) ) ){
					continue;
				}
				else if (link4pt(pt1, pt2, pt3, pt4)){
					isKill = true;
					kill(a, b);
					showLine(pt1, pt2, pt3, pt4);
					break;
					return;
				}
			}
		}
		// 左到右扫描
		if (isKill == false) {
			//交换位置
			if (a.l > b.l) {
				temp = a;
				a = b;
				b = temp;
			}
			for (var i = -1, len = w; i <= len; i++) {
				pt1 = a;
				pt2 = {t:a.t, l:i};
				pt3 = {t:b.t, l:i};
				pt4 = b;
				if( (!isNull(pt2) && (pt2.l != a.l) ) || ( !isNull(pt3) && (pt3.l != b.l) ) ){
					continue;
				}
				else if (link4pt(pt1, pt2, pt3, pt4)){
					isKill = true;
					kill(a, b);
					showLine(pt1, pt2, pt3, pt4);
					break;
					return;
				}
			}
		}

		//扫描完毕
		if(isKill == false){
			endBox = '';
			byId(_ap).className = '';
			startBox = _bp;
		}
	}

	//干掉格子，删除boxArr中相应格子
	function kill(a, b) {
		boxArr[a.position] = null;
		boxArr[b.position] = null;
		boxsLength -= 2;
		startBox = '';
		endBox = '';
	}

	// 显示链接路径
	function showLine(a, b, c, d) {
		var line1 =show2pt(a,b);
		var line2 = show2pt(b,c);
		var line3 = show2pt(c,d);
		var hideLine = function () {
			gameBox.removeChild(line1);
			gameBox.removeChild(line2);
			gameBox.removeChild(line3);
			byId(a.position).src = byId(d.position).src ='imgg/blank.gif';
			byId(a.position).className = byId(d.position).className = '';
			if (boxsLength<=0) {
				gameWin();
				gameEnd();/*游戏胜利结束*/
				//byId('gameagain').style.display = 'block';
			}
		}
		//hideLine;
		setTimeout(hideLine, 100);

		function show2pt (a, b){
			var top, left, width, height, line = document.createElement('p');
			var a = a, b = b, temp;
			// 交换位置
			if (a.t > b.t || a.l > b.l) {
				temp = a;
				a = b;
				b = temp;
			}
			top = boxWidth * a.t + 30 + 'px';
			left = boxWidth * a.l + 30 + 'px';
			// 同行(t相等)
			if (a.t == b.t) {
				width = boxWidth * (b.l - a.l) + 1 + 'px';
				height = '1px';
			}
			// 同列(l相等)
			if (a.l == b.l) {
				width = '1px';
				height = boxWidth * (b.t - a.t) + 1 + 'px';
			}
			line.style.top = top;
			line.style.left = left;
			line.style.width = width;
			line.style.height = height;
			line.style.height = height;
			return gameBox.appendChild(line);
		}
	}

	// 单个格子是否空值
	function isNull (a) {
		return boxArr['t' + a.t + '_l' + a.l] ? false : true;
	}

	// 2点是否连通
	function link2pt (a, b) {
		var a = a, b = b, temp, canLink = true;
		// 交换位置
		if (a.t > b.t || a.l > b.l) {
			temp = a;
			a = b;
			b = temp;
		}
		if (a.t == b.t) {   //同行（t相等），a在b的左边
			for (var i = a.l + 1, len = b.l - 1; i <= len; i++) {
				if (boxArr['t' + a.t + '_l' + i]) {
					canLink = false;
					break;
				}
			}
		}else if (a.l == b.l) {   //同列（l相等），a在b的上边
			for (var i = a.t + 1, len = b.t - 1; i <= len; i++  ) {
				if(boxArr['t' + i + '_l' + a.l]) {
					canLink = false;
					break;
				}
			}
		} else {
			throw ('位置错误：a.t=' + a.t + ' b.t=' + b.t + ' a.l=' + a.l + ' b.l=' + b.l);
		}
		return canLink;
	}

	// 4个点是否两两连通
	function link4pt (pt1, pt2, pt3, pt4) {
		return link2pt(pt1, pt2) && link2pt(pt2, pt3) && link2pt(pt3, pt4);
	}