---
title: Linux(CentOs)下PHP环境搭载与配置
date: 2015-06-15 02:48:41
categories: Code
tags:
	- Linux
	- PHP
---

### LAMP 所需套件与其结构

* httpd(Apache)
* mysql
* php
* Apache 目前有几种主要版本，包括 1.3.x, 2.0.x, 以及 2.2.x 等等，在 1.3.x 以前的版本通常取名为 apache ，2.x 以后则称为
* httpd ！请与您的 distribution 比较看看先。至于 CentOS 4.x 则是提供 Apache 2.0.x 这个版本。

``` shell
[root@linux ~]# yum install httpd mysql-server php //安装所需的套件
```

### Apache结构

* /etc/httpd/conf/httpd.conf (主要配置文件)
	最主要的配置文件，其实整个 Apache 也不过就是这个配置文件！很多其他的 distribution 都将这个文件拆成数个小文件分别管理不同的参数。 但是主要配置文件还是以这个文件为主的！你只要找到这个档名就知道如何设定啦！

* /etc/httpd/conf.d/*.conf (很多的额外参数文件，扩展名是 .conf)
	这是 CentOS 的特色之一，如果你不想要修改原始配置文件 httpd.conf 的话，那么可以将你自己的额外参数档独立出来， 例如你想要有自己的额外设定值，可以将他写入 /etc/httpd/conf.d/vbird.conf (注意，扩展名一定是 .conf 才行) 而启动 Apache 时，这个档案就会被读入主要配置文件当中了！这有什么好处？好处就是当你系统升级的时候， 你几乎不需要更动原本的配置文件，只要将你自己的额外参数档复制到正确的地点即可！维护更方便！

* /usr/lib/httpd/modules/Apache
	支持很多的模块，所有你想要使用的模块默认是放置在这个目录当中的！

* /var/www/html/
	这就是CentOS 预设的『首页』所在目录！当你输入『http://localhost』时所显示的数据所在。

* /var/www/error/
	如果因为主机设定错误，或者是浏览器端要求的数据错误时，在浏览器上出现的错误讯息就以这个目录的默认信息为主！

* /var/www/icons/
	这个目录提供 Apache 默认给予的一些小图示，你可以随意使用啊！当你输入『http://localhost/icons/』 时所显示的数据所在。

* /var/www/cgi-bin/
	默认给一些可执行的 CGI (网页程序) 程序放置的目录；当你输入『http://localhost/cgi-bin/』 时所显示的数据所在。

* /var/log/httpd/
	预设的 Apache 登录档都放在这里，对于流量比较大的网站来说，这个目录要很小心， 因为以鸟哥网站的流量来说，一个星期的登录文件数据可以大到 500MBytes 至 1GBytes 左右，所以你务必要修改一下你的 logrotate 让登录档被压缩，否则…..

* /usr/sbin/apachectl
	这个就是 Apache 的主要执行档，这个执行档其实是 shell script 而已， 他可以主动的侦测系统上面的一些设定值，好让你启动 Apache 时更简单！

* /usr/sbin/httpd
	这个是主要的 Apache 二进制执行文件！

* /usr/bin/htpasswd (Apache 密码保护)
	在某些网页当你想要登入时你需要输入账号与密码
	那 Apache 本身就提供一个最基本的密码保护方式， 该密码的产生就是透过这个指令来达成的！相关的设定方式我们会在 WWW 进阶设定当中说明的。

### Mysql结构

* /etc/my.cnf
	这个是 MySQL 的配置文件，包括你想要进行 MySQL 数据库的优化，或者是针对 MySQL 进行一些额外的参数指定， 都可以在这个档案里面达成的！

* /var/lib/mysql/
	这个目录则是 MySQL 数据库放置的所在处啦！当你有启动任何 MySQL 的服务时， 请务必记得在备份时，这个目录也要完整的备份下来才行啊！

### PHP结构

* /usr/lib/httpd/modules/libphp4.so
	PHP 这个套件提供给 Apache 使用的模块！这也是我们能否在 Apache 网页上面设计 PHP 程序语言的最重要的咚咚！ 务必要存在才行！

* /etc/httpd/conf.d/php.conf
	那你要不要手动将该模块写入 httpd.conf 当中？不需要的，因为系统主动将 PHP 设定参数写入这个档案中了！ 而这个档案会在 Apache 重新启动时被读入，所以 OK 的啦！

/etc/php.ini
	就是 PHP 的主要配置文件，包括你的 PHP 能不能允许使用者上传档案？能不能允许某些低安全性的标志等等， 都在这个配置文件当中设定的啦！

* /etc/php.d/mysql.ini, /usr/lib/php4/mysql.so
	你的 PHP 是否可以支持 MySQL 接口呢？就看这两个东西啦！这两个咚咚是由 php-mysql 套件提供的呢！

* /usr/bin/phpize, /usr/include/php/
	如果你未来想要安装类似 PHP 加速器以让浏览速度加快的话，那么这个档案与目录就得要存在， 否则加速器软件可无法编译成功喔！这两个数据也是 php-devel 套件所提供的啦！


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~