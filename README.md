# slide
滑屏组件

 - 自定义滑屏组件，可定制滑屏动画
 - 可控制每屏动画效果

##Install

    git clone https://github.com/jayZOU/slide.git
    npm install
    gulp
    
访问[http://localhost:8080/][1]
##Examples
```js
    /**
	*	slide 滑屏组件
	*	@author jayzou
	*	@time 2015-10-25
	*	@version 0.0.1
	*	@class Slide
	*	@param String	wrap		            必填	传入滑动容器ID
	*   @param String   currentClass            选填  滑动时切换动画class，默认current
	*	@param boolean	startLocalstorage		选填	记录当前浏览页面
	*	@param {Object}	onChange		        选填	切换完成回调
	*	@param {Object}	onDownChange		    选填	下滑完成时回调
	*	@param {Object}	onUpChange		        选填	上滑完成时回调
	*	@param {Object}	defaultClass		    选填	滑动过程动画效果
	**/

    var slide = new Slide({
		wrap: 'wrap',					//必填，传入滑动容器ID
		currentClass: 'current',		//选填，滑动时切换动画class
		startLocalstorage: false,		//选填，是否开启localstorage记录页面返回后是否回到上次访问的页面，默认false
		onChange: function(){			//选填，每屏切换完成时的回调
			console.log("onchange");
		},
		onDownChange: function(){		//选填，下滑完成时回调
			console.log("onDownChange");
		},
		onUpChange: function(){		//选填，上滑完成时回调
			console.log("onUpChange");
		},
		defaultClass: {					//选填，滑动过程动画效果
			'webkitTransition': '-webkit-transform 0.5s ease',	//需要加前缀
			'transform': 'translate(0px, 0px)'					//不需要加前缀
		},
	});

	// slide.next();						//下一页
	// slide.prev();						//上一页
	// slide.playTo(3);						//直接跳转第n页
	// console.log(slide.getPage());		//获取为当前页数
	// slide.lockPage();					//锁住屏幕，禁止滑动
	// slide.unLockPage();					//解锁屏幕，允许滑动

	//辅助类
	// slide.toggleClass(targ, className);	//置换class
	// slide.addClass(targ, className);		//添加class
	// slide.removeClass(targ, className);	//删除class
	// slide.css(o, style);					//添加style样式
```
##Notes

 - 滑动容器只能传入ID值，不允许传入class


	
	


  [1]: http://localhost:8080/