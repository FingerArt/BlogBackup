---
title: Linux设置ip
date: 2015-01-21 22:44:57
categories: Code
tags:
	- Linux
---

``` bash
$ vi /etc/sysconfig/network-scripts/ifcfg-eth0 //编辑修改
$ service network restart //重启网络服务,配置生效
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~