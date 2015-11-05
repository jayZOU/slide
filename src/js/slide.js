var Slide = function(opts) {

	"use strict";
	//可配置参数
	var wrap = document.getElementById(opts.wrap) || document.body,
		currentClass = opts.currentClass || "current", 				//页面动画
		startLocalstorage = opts.startLocalstorage || false,		//记录currentPage
		onChange = opts.onChange || function(){},					//每屏切换完成时的回调
		onDownChange = opts.onDownChange || function(){},			//下滑完成时回调
		onUpChange = opts.onUpChange || function(){},				//上滑完成时回调
		distance = opts.distance || 20,								//产生滑动需要的距离
		useAcc = opts.useAcc == null ? true : opts.useAcc,			//是否采用硬件加速
		defaultClass = opts.defaultClass || {						//页面切换过场动画
			'transition': '-webkit-transform 0.5s ease'
		},

		//节点相关
		notes = null, //获取的节点
		currentPage = 0, //当前页面
		pageHight = [], //每个页面的高度
		pageWidth = [], //每个页面的宽度

		//滑屏相关参数
		x,
		y,				
		_x,
		_y,
		translateAll = [],			//每屏translate属性
		isLock = false,				//是否锁屏
		
		//检测前缀
		cssPrefix = '',
		propPrefix = '',
		vendors = {'webkit': 'webkit', 'Moz': 'moz', 'ms': 'ms'};


	var _init = function() {
		_initData();
		_bindEvent();
	};

	var _initData = function() {
		//获取每屏的节点
		notes = wrap.children;

		//获取每屏节点宽高
		var allHeight = 0;
		for (var i = 0, len = notes.length; i < len; i++) {
			notes[i].style.height = notes[i].clientHeight + 'px';
			notes[i].style.width = notes[i].clientWidth + 'px';
			pageHight[i] = notes[i].clientHeight;
			allHeight += notes[i].clientHeight;
			// console.log(notes[i].style);
			if(i > 0){
				translateAll[i] = translateAll[i - 1] + notes[i].clientHeight;
			}else{
				translateAll[i] = 0;
			}
		}
		// console.log(translateAll);

		// console.log()

		//处理各平台CSS前缀
		for(var key in vendors){
			if (wrap.style[key + "Transform"] !== undefined) {
				cssPrefix = key + "Transform";
				propPrefix = key;
				break;
			}
		}

		//初始化滑屏容器style属性
		var style = objectConcat(defaultClass, {
			"height": allHeight + 'px',
			"width": notes[0].clientWidth + 'px'
		});
		css(wrap, style);

		//是否记录当前页数
		if(startLocalstorage && localStorage.page){
			currentPage = localStorage.page;
			playTo(currentPage);
		}

		//默认给第一屏添加动画
		addClass(notes[0],currentClass);
	};

	var _bindEvent = function() {
		wrap.addEventListener('touchstart', function(e) {
			_touchstart(e);
		});
		wrap.addEventListener('touchend', function(e) {
			_touchend(e);
		});
	};

	var _touchstart = function(e) {
		e.preventDefault();
		y = e.changedTouches[0].pageY;
	};

	var _touchend = function(e) {
		e.preventDefault();
		_y = e.changedTouches[0].pageY;
		var disY = _y - y;
		if(disY < -distance){
			next();

		}else if(disY > distance){
			prev();
		}
	};

	var next = function() {
		console.log(useAcc);
		if (currentPage < pageHight.length - 1 && !isLock) {
			// console.log(translateAll[currentPage + 1]);
			if(useAcc){
				wrap.style[cssPrefix] = "translate3d(0px, -" + translateAll[currentPage + 1] + "px, 0px)";
			}else{
				wrap.style[cssPrefix] = "translate(0px, -" + translateAll[currentPage + 1] + "px)";
			}
			currentPage ++;
			localStorage.page = currentPage + 1;

			removeClass(notes[currentPage - 1], currentClass);
			addClass(notes[currentPage], currentClass);

			//执行回调
			onChange(currentPage);
			onDownChange(currentPage);
		}

	};

	var prev = function() {
		if (currentPage > 0 && !isLock) {
			if(useAcc){
				wrap.style[cssPrefix] = "translate3d(0px, -" + translateAll[currentPage - 1] + "px, 0px)";
			}else{
				wrap.style[cssPrefix] = "translate(0px, -" + translateAll[currentPage - 1] + "px)";
			}
			currentPage --;
			localStorage.page = currentPage + 1;
			removeClass(notes[currentPage + 1], currentClass);
			addClass(notes[currentPage], currentClass);

			//执行回调
			onChange(currentPage);
			onUpChange(currentPage);
		}
	};

	//直接跳转第n页
	var playTo = function(page) {
		if(useAcc){
				wrap.style[cssPrefix] = "translate3d(0px, -" + translateAll[currentPage - 1] + "px, 0px)";
			}else{
				wrap.style[cssPrefix] = "translate(0px, -" + translateAll[currentPage - 1] + "px)";
			}
		currentPage = page - 1;

		//执行回调
		onChange(currentPage);
	};

	//获取为第几屏
	var getPage = function(){
		return ++currentPage;
	};

	//锁住屏幕，禁止滑动
	var lockPage = function(){
		isLock = true;
	};

	//解锁屏幕，允许滑动
	var unLockPage = function(){
		isLock = false;
	};

	var css = function(o, style) {
		for (var i in style) {
			o.style[i] = style[i];
		}
	};

	var objectConcat = function(o1, o2) {
		for (var key in o2) {
			o1[key] = o2[key];
		}
		return o1;
	};

	//toggleClass
	var toggleClass = function(targ, className) {
		if (targ.className.indexOf(className) == -1) {
			//不存在className
			targ.className = targ.className + ' ' + className;
		} else {
			//存在className
			targ.className = targ.className.replace(" " + className, "");
		}
	};

	//添加class
	var addClass = function(targ, className) {
		if (targ.className.indexOf(className) == -1) {
			targ.className = targ.className + ' ' + className;
		}
	};

	//删除class
	var removeClass = function(targ, className) {
		if (targ.className.indexOf(className) > -1) {
			targ.className = targ.className.replace(" " + className, "");
		}
	};




	_init();

	return {
		next: next,
		prev: prev,
		playTo: playTo,
		getPage: getPage,
		lockPage: lockPage,
		unLockPage: unLockPage,
		toggleClass: toggleClass,
		addClass: addClass,
		removeClass: removeClass,
		css: css
	}
}