## LazyLoad 图片懒加载
原生 js 实现图片懒加载，良好兼容 IE

### 使用
在 html 中引入`lazyload.min.js`；

```xml
	<img src="" class="lazyload" data-src="真实路径">
	//给要懒加载的图片设置类 "lazyload" ，将真实路径赋值给自定义属性 "data-src"
```
### Bugs
-	IE 中图片有时会显示不出来
