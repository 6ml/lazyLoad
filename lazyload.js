window.onload = function(){
	if(document.addEventListener){
		window.addEventListener('scroll',function(){
			judgeShow();
		},false);
	}else{
		window.attachEvent('onscroll',function(){
			judgeShow();
		});
	}
};

//获取元素offsetTop
function getOffsetTop(obj){
	'use strict';
	var offsetTop = obj.offsetTop;
	var parent = obj.offsetParent;
	while(parent){
		offsetTop += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return offsetTop;
}

//判断元素是否出现在可视区域
function judgeShow(){
	'use strict';
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
	var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	var imgList = getElementsByClass('lazyload');
	for(var i = 0; i < imgList.length; i++){
		var imgItem = imgList[i];
		if(getOffsetTop(imgItem) - scrollTop <= clientHeight){
			imgItem.setAttribute('src', imgItem.getAttribute('data-src'));
			if(imgItem.getAttribute('class')){
				imgItem.setAttribute('class',imgItem.getAttribute('class').replace('lazyload',''));
			}else{
				imgItem.setAttribute('className',imgItem.getAttribute('className').replace('lazyload',''));
			}
		}
	}
}

function getElementsByClass(className){
	if(!document.getElementsByClassName){
		var elements = document.getElementsByTagName('*');
		var result = [];
		for(var i = 0; i < elements.length; i++){
			var child = elements[i];
			var classNames = child.className.split(' ');
			for(var j = 0; j < classNames.length; j++){
				if(className === classNames[j]){
					result.push(child);
					break;
				}
			}
		}
		return result;
	}
	else{
		return document.getElementsByClassName(className);
	}
}
