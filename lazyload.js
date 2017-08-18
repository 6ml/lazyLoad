window.onload = function () {
    addEvent(window, 'scroll', throttle(judgeShow, 500, 1000), false);
};

/**
 * 获取元素 offsetTop 值  -->  通过循环累加元素相对父节点 offsetTop 值
 * @param  {[Object]} el  [要获取 offsetTop 值的元素]
 * @return {[Number]}     [元素 offsetTop 值]
 */
function getOffsetTop1(el) {
    'use strict';

    var offsetTop = el.offsetTop;
    var parent = el.offsetParent;

    while(parent) {
        offsetTop += parent.offsetTop;
        parent = parent.offsetParent;
    }

    return offsetTop;
}

/**
 * 获取元素 offsetTop 值  -->  通过 getBoundingClientRect 方法
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
function getOffsetTop2(el) {
    'use strict';

    // 浏览器滚动高度
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    // el.getBoundingClientRect().top 获取到元素到浏览器视窗顶部的距离
    return el.getBoundingClientRect().top + scrollTop;
}

/**
 * 判断元素是否出现是视野范围内
 */
function judgeShow() {
    'use strict';

    // 获取浏览器滚动高度
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    // 浏览器视窗高度
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var imgList = getElementsByClass('lazyload', 'img');
    imgList.forEach(function (imgItem) {

        // document.documentElement.clientTop 在 IE 6/7 中值为 2 ; 在其他浏览器中值为 0
        if(getOffsetTop1(imgItem) - document.documentElement.clientTop - scrollTop <= clientHeight) {
        // if(getOffsetTop2(imgItem) - document.documentElement.clientTop - scrollTop <= clientHeight) {
            setSrc(imgItem);
        }
    });
}

/**
 * 为图片元素设置 src 并移出 lazyload 类名
 * @param {[Object]} obj [需要设置 src 的图片元素]
 */
function setSrc(obj) {
    'use strict';

    obj.setAttribute('src', obj.getAttribute('data-src') + "?" + new Date().getTime());
    obj.removeAttribute('data-src');

    if(obj.getAttribute('class')) {
        obj.setAttribute('class', obj.getAttribute('class').replace('lazyload',''));
    } else {
        obj.setAttribute('className', obj.getAttribute('className').replace('lazyload',''));
    }
}

/**
 * 根据类名和标签名查找元素
 * @param  {[String]}   className   [要查找元素的类名]
 * @param  {[String]}   tagName     [要查找元素的标签名]
 * @return {[Array]}                [查找到的元素集合]
 */
function getElementsByClass(className, tagName) {
    'use strict';

    if(!document.getElementsByClassName) {

        var elements = document.getElementsByTagName(tagName);
        var result = [];

        Array.prototype.forEach.call(elements, function(elItem) {
            if(elItem.className.indexOf(className) !== -1){
                result.push(elItem);
            }
        });

        return result;
    }
    else{
        return Array.prototype.slice.call(document.getElementsByClassName(className), 0);
    }
}

/**
 * 绑定事件
 * @param {[Object]}   	el     [要绑定事件的元素]
 * @param {[String]}   	method [要绑定的事件名]
 * @param {Function} 	fn     [事件处理函数]
 * @param {[Boolean]}   bool   [事件捕获阶段触发还是事件冒泡阶段触发]
 */
function addEvent (el, method, fn, bool) {
	if(document.addEventListener) {
		el.addEventListener(method, fn, bool);
	}
	else {
		el.attachEvent('on' + method, fn);
	}
}

/**
 * 函数节流
 * @param  {[Function]} fn      [函数截流的函数]
 * @param  {[Number]}   delay   [延迟的时间]
 * @param  {[Number]}   atLeast [间隔时间]
 * @return {[Function]}         [截流后的函数]
 */
function throttle(fn, delay, atLeast) {
    var timeout = null,
        startTime = Date.now();

    return function () {
        var endTime = Date.now();
        clearTimeout(timeout);

        if(endTime - startTime >= atLeast) {
            fn();
            startTime = endTime;
        } else {
            timeout = setTimeout(fn, delay);
        }
    };
}
