// 函數1：獲取元素的某個樣式
// 自定义一个函数来获取当前元素的样式，兼容IE8及以下
// 并且在其他浏览器中正常显示
/*
 * obj:获取哪个元素的样式
 * cssname:要获取的样式名
 */
function getStyle(obj, cssname) {
	if(window.getComputedStyle) {
		//判断window.getComputedStyle
		// 为true,则表示有getComputedStyle属性
		// 为undefined表示没有，则使用currentStyle属性

		// 正常浏览器的方式
		return getComputedStyle(obj, null)[cssname];
	} else {
		// IE8的方式
		return obj.currentStyle[cssname];
	}
}

/*
 * 函數2：改變某個塊元素的屬性
 * clickMove函数:
 * 		参数1：obj,移动哪一个对象
 * 		参数2：attr,要執行的動畫的樣式，比如left,top,width,height...
 * 		參數3：target,box1移动的距离，停止移动的位置
 * 		参数4：speed,移动的速度，大于0的值
 * 		參數5：callback,這個函數會在動畫執行完之後執行
 */
function clickMove(obj, attr, target, speed, callback) {

	// 獲取目標的當前位置
	var current = parseInt(getStyle(obj, attr));

	// 判斷box1的位置大於目標位置則將speed取負
	if(current > target) {
		speed = -speed;
	}

	clearInterval(obj.timer);
	// 打开一个定时器,执行动画效果
	obj.timer = setInterval(function() {
		/*//方法1:
			 	obj.style.left = obj.offsetLeft + speed +'px';
			 	// 当元素移动到800px时，停止执行动画
				 if(obj.offsetLeft == target){
				 	clearInterval(timer);
				 }*/

		/*
		 * 方法2：使用我们之前定义的getStyle()函数
		 * 返回left属性值时返回的是px,加10之前需要先将px去掉
		 * 用parseInt属性，后面再给其加上
		 */
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;

		// 为了让box1一定停在left=target的位置处，需要在这里做个判断
		if((newValue > target && speed) > 0 || (newValue < target && speed < 0)) {
			newValue = target;
		}
		obj.style[attr] = newValue + 'px';
		if(newValue == target) {
			clearInterval(obj.timer);

			// 動畫執行完畢，判斷一旦存在callback函數就執行callback()函數，不存在則不執行
			callback && callback();
		}

	}, 30);
}

// 向一个元素中添加指定的class属性值
/*
 * 参数：
 * 		obj：要添加class属性的元素
 * 		cn：要添加的class值
 */
function addClass(obj, cn) {
	//先检查obj是否属于cn类，不属于则为其添加
	if(!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}
}

//判断一个元素中是否含有指定的class属性值
/*如果有返回true,否则返回false*/
function hasClass(obj, cn) {
	var reg = new RegExp('\\b' + cn + '\\b');
	return reg.test(obj.className);
}

//删除一个元素中指定的class属性
function removeClass(obj, cn) {
	//先检查obj是否属于cn类，不属于则为其添加
	// 创建一个正则表达式
	var reg = new RegExp('\\b' + cn + '\\b');
	// 使用replace将字符串中第一个符合正则表达式的内容替换为空串
	obj.className = obj.className.replace(reg, '');
}

// toggleClass:切换一个类
/*如果元素中具有该类，则删除
    如果元素中没有该类，则添加*/
function toggleClass(obj, cn) {
	// 判断元素中是否有cn
	if(hasClass(obj, cn)) {
		removeClass(obj, cn);
	} else {
		addClass(obj, cn)
	}
}