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
```html
<div class="wrap" id="wrap">
    <section class="screen screen1">
        <div class="screen-arrow"></div>
    </section>
    <section class="screen screen2">
        <div class="screen-arrow"></div>
    </section>
    <section class="screen screen3">
        <div class="screen-arrow"></div>
    </section>
    <section class="screen screen4">
        <div class="screen-arrow"></div>
    </section>
    <section class="screen screen5">
        <div class="screen-arrow"></div>
    </section>
</div>
```


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
	*	@param int	    distance        		选填	产生滑动需要的距离，默认20，单位px
	*	@param int		useAcc		        	选填	选填，是否采用硬件加速，默认true
	*	@param {Object}	onChange		        选填	切换完成回调
	*	@param {Object}	onDownChange		    选填	下滑完成时回调
	*	@param {Object}	onUpChange		        选填	上滑完成时回调
	*	@param {Object}	defaultClass		    选填	滑动过程动画效果
	**/

    var slide = new Slide({
		wrap: 'wrap',					//必填，传入滑动容器ID
		currentClass: 'current',		//选填，滑动时切换动画class
		startLocalstorage: false,		//选填，是否开启localstorage记录页面返回后是否回到上次访问的页面，默认false
		distance: 20,					//选填，产生滑动需要的距离，默认20，单位px
		useAcc: true,					//选填，是否采用硬件加速，默认true
		onChange: function(page){			//选填，每屏切换完成时的回调
			console.log(page);
		},
		onDownChange: function(page){		//选填，下滑完成时回调
			console.log(page);
		},
		onUpChange: function(page){		    //选填，上滑完成时回调
			console.log(page);
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