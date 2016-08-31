---
title: Android-任务栈
date: 2015-08-12
categories: Code
tags:
	- Android
---

Android中Activity是以栈的形式进行管理的, 先进后出.

每一个Activity就像是一颗弹夹中的子弹一样, 先压进弹夹中的子弹后被打出, 后压入弹夹中的子弹先被打出去, Activity同理, 先打开的Activity后被关闭, 后打开的Activity会先被关闭.

打开一个界面, 在任务栈中存放一个任务, 当关闭一个界面的时候, 就会在任务栈中清除这个对应的任务, 当这个任务栈中的任务被清除完时, 这个应用程序就退出了.

<!--more-->

### Standard

标准模式: 是Activity默认的启动模式,Activity的进入和移除和栈是一模一样的.

![Standard](http://77fzuw.com1.z0.glb.clouddn.com/266_standard.png)

如图: 每一个Activity进入的顺序是1,2,3,4, 移除Activity的顺序是4,3,2,1

### SingleTop

单一顶部模式: 当压入一个Activity的时候, 检查位于最上面的Activity是否是将要压入的这个Activity, 如果是, 就不再创建一个新的Activity, 复用顶部的这个Activity; 否则创建一个新的Activity并压入到这个栈中.

应用场景: 浏览器书签

![SingleTop](http://77fzuw.com1.z0.glb.clouddn.com/266_singleTop.png)

### SingleTask

单一任务模式: 压入一个Activity的时候检测当前这个栈中是否存在这个Activity, 如果存在不再创建Activity, 直接复用, 并且弹出(清除)该Activity上面的所有Activity; 否则创建这个Activity并压入栈中.

应用场景: 浏览器的Activity

如果一个Activity需要占用大量的系统资源, 可以使用这种模式.

![SingleTask](http://77fzuw.com1.z0.glb.clouddn.com/266_singleTask.png)

### SingleInstance

单例模式; 这个模式比较特殊, 只会存在一个Activity的实例, 这种模式启动的Activity不会被压入普通的栈中, 会被压入一个特殊的栈中, 当这个特殊的Activity存在的时候会复用特殊的栈中的. 如图的退出顺序是: 4,3,1,5,2

应用场景: 电话拨打界面

![SingleInstance](http://77fzuw.com1.z0.glb.clouddn.com/266_singleInstance.png)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用，你的一个回复即是对我的最大支持，如有任何疑问请留言。谢谢~~