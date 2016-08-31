---
title: Canvas绘制绚丽的倒计时
date: 2014-08-30 21:12:56
categories: Code
tags:
	- Javascript
	- Canvas
---
最近想把一直没好好研究的HTML5和CSS3给搞定了，前天才去图书馆借了有关的书籍。
这个效果是跟着网上的一个教程制作的，还没来得及加入自己的想法，原教程上面本是一个显示倒计时的，为了省事而跳过了。
在里面学到了一个对js数组处理地方法

``` javascript
//js中没有删除某个角标元素后，后面的元素不能向前移动，可这样处理。

var newL = 0;
for (var i = 0; i < balls.length; i++) {
	if (条件成立)
		balls[newL++] = balls[i];
}
while(balls.length > newL) {
	balls.pop();
}
```

<!--more-->

<iframe width="900" height="400" src="/uploads/web/canvas-beautiful-countdown/index.html"></iframe>

[查看Demo](/uploads/web/canvas-beautiful-countdown/index.html)