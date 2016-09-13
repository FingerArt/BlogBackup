---
title: android studio快速修改包名
date: 2016-02-27
categories: Code
tags: Android
---

开始转向Android Studio了, 记得去年就已经学习AS了, 可是公司的项目是在eclipse上面构建的, 加上外包那边也是eclipse开发, 所以也不敢将它轻易的转过去.
一直在技术总监耳边说AS如何如何的好, 终于, 他要求我将这个项目转到AS上面去了.万分欣喜, 终于要告别eclipse了.
在eclipse上面修改包名是我遇到非常懊恼的一件事, 公司的APP需要给别的公司定制, 但是包名不能和我们的相同, 所以就得修改包名了. 选中包名然后rename->enter. 确实是被修改了, 可是eclipse在替换XML文件中自定义的View时, 却出现乱掉, 错位的情况.
编译成apk时却没有错误, 运行时就Crash, 最后只得去XML中去搜索, 然后手动改掉!
因为最初构建这个项目的人, 不知道怎么想的, 将子包名作为主包名来命名, 让我包名改的非常dt.

现在用上AS了, 用它修改包名方便多了

<!-- more -->

![](http://77fzuw.com1.z0.glb.clouddn.com/320-1.png)

去掉第二步的勾, 然后选择你要修改的包名, Shift + F6 rename!

![](http://77fzuw.com1.z0.glb.clouddn.com/320-2.png)

最后修改build.gradle文件中的applicationId
这样就完成了!

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你完全按照该博文的内容进行直接使用，你的一个回复即是对我的最大支持，如有任何疑问请留言。谢谢~~