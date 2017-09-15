## LazyLoad 图片懒加载
原生 js 实现图片懒加载，良好兼容 IE

### Usage
##### 引入`lazyload.min.js`:

```xml
    <script type="text/javascript" src="./lazyload.min.js"></script>
```

##### 设置`class`和`data-src`属性:

给需要懒加载的图片设置类 "lazyload" ，将真实路径赋值给自定义属性 "data-src"。

```xml
    <img src="" class="lazyload" data-src="real-src">
```
