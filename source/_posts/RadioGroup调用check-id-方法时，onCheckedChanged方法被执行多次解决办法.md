---
title: RadioGroup调用check(id)方法时，onCheckedChanged方法被执行多次解决办法
date: 2014-08-02 01:35:48
categories: Code
tags:
	- Android
---
``` java
rgMenu.check(rgMenu.getChildAt(0).getId());
```

使用check选中的方式会调用onCheckedChanged多次, 这不是我们要的.

解决方式:

``` java
((RadioButton )rgMenu . findViewById( rgMenu. getChildAt( 0) . getId())) .setChecked ( true);
```