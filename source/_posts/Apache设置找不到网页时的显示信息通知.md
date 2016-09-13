---
title: Apache设置找不到网页时的显示信息通知
date: 2015-06-15 03:12:58
categories: Code
tags:
	- Apache
	- Linux
---
如果你的 /var/www/html/cgi 目录底下没有任何首页档案 (index.*) 时，那当使用者在网址列输入『 http://your.hostname/cgi 』，请问结果会显示出什么呢？可能有两个：

*	如果你的 Options 里面有设定 Indexes 的话，那么该目录下的所有档案都会被列出来，提供类似 FTP 的连结页面。
*	如果没有指定 Indexes 的话，那么错误讯息通知就会被显示出来。
	事实上 CentOS 所提供的 Apache 已经规范好一些简单的错误资料网页了，你可以到 /var/www/error/ 目录下瞧瞧就晓得。不过该目录下的档案并没有中文讯息，所以…..真要命！至于 Apache 的错误讯息设定在这里：

``` bash
[root@linux ~]# vi /etc/httpd/conf/httpd.conf
# 大约在 886 行左右，预设就是批注掉的！
#    ErrorDocument 403 /error/HTTP_FORBIDDEN.html.var
#    ErrorDocument 404 /error/HTTP_NOT_FOUND.html.var
#    ErrorDocument 405 /error/HTTP_METHOD_NOT_ALLOWED.html.var
#    ErrorDocument 408 /error/HTTP_REQUEST_TIME_OUT.html.var
....后面省略....
```

<!--more-->

虽然 Apache 有提供这些数据了，不过 CentOS 默认是将那些资料批注掉的！因为我们使用中文语系， 该数据并没有中文信息，所以批注掉反而对我们的处理有帮助！ 由于你的网站可能会因为一些档名的变更或者是重新编写的原因，因此旧的网页档名就不存在。 但客户端可能保留的还是旧的连结，此时我们就得要很好心的告知使用者该网页找不到的原因才好。 你可以这样做：

``` bash
[root@linux ~]# vi /etc/httpd/conf/httpd.conf
# 找到底下这一段，看看这些简单的范例先：
#ErrorDocument 500 "The server made a boo boo."
#ErrorDocument 404 /missing.html
#ErrorDocument 404 "/cgi-bin/missing_handler.pl"
#ErrorDocument 402 http://www.example.com/subscription_info.html

# 假设未来提供用户相关信息的地方为 missing.html 这个档案，所以你应该要：
ErrorDocument 404 /missing.html

[root@linux ~]# apachectl restart
```


> 您输入的网页找不到！
  	亲爱的网友，您所输入的网址并不存在我们的服务器当中，
	有可能是因为该网页已经被管理原删除，
	或者是您输入了错误的网址。请再次查明后在填入网址啰！
	感谢您常常来玩！ ^_^
	若有任何问题，欢迎联络管理员[root@localhost](mailto:root@localhost)。

现在你如果在网址列随便输入一个主机上不存在的网址，就会出现如下的画面：

![](http://cn.linux.vbird.org/linux_server/0360apache/0360apache-centos4.php_files/missing.png)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~