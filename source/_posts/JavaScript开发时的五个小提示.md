---
title: JavaScript开发时的五个小提示
date: 2014-09-03 11:19:37
categories: Code
tags:
	- Javascript
---
真是五个很quick的小提示：

### 只在元素上使用submit事件

如果要在form中绑定事件处理程序时，应该只在元素上绑定submit事件，而不是给提交按钮绑定click事件。

March：这个方式固然很好，但是，公司开发时使用了Web Flow，一个页面就一个大form，而里面可能有若干个提交按钮，所以不得不把部分事件处理程序绑定在了提交按钮的click事件上。

<!--more-->

### 可点击的都应该是链接

不要给除锚元素（）以外的元素绑定click事件。这一点对于键盘用户很重要，因为他们在仅通过键盘获取元素焦点时会遇到困难。

March：不过个人感觉锚元素还是应该只用作链接，而一些功能性的操作（比如Google Reader的Mark all as new），最好还是用来标注，accessibility的问题可以通过快捷键等方式解决。这样做可以更好的还原HTML元素的语义。

###简单的for循环优化

在你写一个for循环时，有个很简单的技巧能够提高性能。

``` javascript
for ( var i = 0; i < elements.length; ++i )
//使用下面的语句代替上面的：
for ( var i = 0, j = elements.length; i < j; ++i )
```

这样可以把元素的个数（elements.length的值）储存在一个变量j中，这样就不必在每次循环时都计算一遍元素的个数。

### 用匿名函数来作为事件处理程序

尤其是对于短小的函数，创建一个匿名函数会比使用一个命名函数的引用更具可读性。

anchor.onclick = function() { map.goToPosition( home ); return false; }

March：在较复杂的JavaScript开发时还是使用命名函数效率更高。

### 使用Array.join代替字符串连接（concatenating strings）

在将很多字符串、变量等连接成一个很长的字符串时，将所有字符串和变量放入一个数组，然后用join方法将他们组成一个长字符串，这样无论从代码可读性还是从性能上都更胜于字符串连接。

``` javascript
var text = ‘There are’ + elements.length + ‘members in the elements array.’;
//下面的替代上面
var text = [‘There are’, elements.length, ‘members in the elements array.’].join(‘ ‘);
```

> 转载自互联网