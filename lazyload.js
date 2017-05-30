window.onload = function(){
	if(document.addEventListener){
		document.addEventListener('scroll',function(){
			judgeShow();
		},false);
	}else{
		document.attachEvent('onscroll',function(){
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
	var imgList = document.querySelectorAll('.lazyload');
	for(var i = 0; i < imgList.length; i++){
		if(getOffsetTop(imgList[i]) - scrollTop <= clientHeight){
			imgList[i].setAttribute('src', imgList[i].getAttribute('data-src'));
			imgList[i].setAttribute('class',imgList[i].getAttribute('class').replace('lazyload',''));
		}
	}
}