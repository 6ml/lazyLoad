window.onload = function () {
    if(document.addEventListener) {
        window.addEventListener('scroll', throttle(judgeShow, 500, 1000), false);
    } else {
        window.attachEvent('onscroll', throttle(judgeShow, 500, 1000));
    }
};

/**
 * 获取元素 offsetTop 值
 * @param  {[Object]} obj [要获取 offsetTop 值的元素]
 * @return {[Number]}     [元素 offsetTop 值]
 */
function getOffsetTop(obj) {
    'use strict';

    var offsetTop = obj.offsetTop;
    var parent = obj.offsetParent;

    while(parent) {
        offsetTop += parent.offsetTop;
        parent = parent.offsetParent;
    }

    return offsetTop;
}

/**
 * 判断元素是否出现是视野范围内
 */
function judgeShow() {
    'use strict';

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    var imgList = getElementsByClass('lazyload', 'img');
    imgList.forEach(function (imgItem) {
        if(getOffsetTop(imgItem) - scrollTop <= clientHeight) {
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
 * 根据类名查找图片元素
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
