---
title: Linux xampp 搭载环境之设置外部访问
date: 2014-08-25 10:37:51
categories: Code
tags:
	- Linux
	- xampp
---
在Linux上 搭载xampp又遇到了一些问题, 有时在网上找的答案并不能解决我的问题. 这里记录一下我的解决方案.

在此之前我先说一下你会遇到的另外一点问题.

<!--more-->

``` bash
netstat -a | grep ‘mysql’
netstat -a | grep ‘http’
```
提示:getnameinfo failed, 说明你没有开启Apache .键入以下命令:

``` bash
//下面以你安装的路径为准
/opt/lampp/lampp start //开启Apache
```

现在我说一下外部访问的问题, 关于这个我认为应该是版本的不同, 而导致具体的配置会有所差别.
我安装的是1.8.3版本的.

``` bash
vi /opt/lampp/etc/extra/httpd-xampp.conf
:set nu
//在配置文件里面用了正则匹配
```

Require local //将光标移动到这里键入”i”,将改行改为: `Require all granted`

``` bash
//完成后,键入
:wq //保存编辑

/opt/lampp/lampp restart //重启Apache, 搞定.
```