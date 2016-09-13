---
title: Apache开启运行状态网页
date: 2015-06-15T13:55:14+08:00
categories: Code
tags:
	- Apache
	- Linux
	- PHP
---

Apache 提供了特别功能来查询主机目前的状态！那就是 mod_status 这个模块！ 这个模块默认是关闭的，你必须要修改配置文件来启动他才行。

先确定底下这几个项目真的有存在才行！

```
LoadModule status_module modules/mod_status.so
SetHandler server-status
Order deny,allow
Deny from all
Allow from 192.168.1.0/24
Allow from 127.0.0.1
```

<!--more-->

``` shell
[root@linux ~]# apachectl restart
```
接下来你只要在你的网址列输入主机名后面加上 http://hostname/server-status 即可发现如下：

输出的结果包括目前的时间以及 Apache 重新启动的时间，还有目前已经启动的程序等等， 还有网页最下方会显示每个程序的客户端与服务器端的联机状态。虽然显示的状况挺阳春，不过该有的也都有了， 可以让你约略了解一下主机的状况啰。要注意喔，可查阅者 (allow from 的参数) 还是需要限制的比较严格一点啦！

![](http://cn.linux.vbird.org/linux_server/0360apache/0360apache-centos4.php_files/mod_status.png)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~