---
title: PHP使用CURL 模拟登陆正方教务系统过程详解
date: 2014-08-25 10:28:11
categories: Code
tags:
	- PHP
	- 模拟登陆
---
这篇技术博文应该是这学期最后一篇了。

之前做的项目中使用了fsockopen模拟登陆飞信，然后进行发送短信的功能，然后又想到了模拟登陆学校的正方教务系统，就可以获取到数据了。于是使用火狐浏览器的firebug进行抓包。现在才明白高博学院的正方教务系统模拟登陆非常简单，下面是我抓包的过程：

<!--more-->

### 登陆

![](/uploads/images/2014-08-25-01.jpg)

从POST请求中可以看出向http://ip/(palpckurpyrxad55cuxranfz)/default2.aspx发送的参数TextBox1是学号，TextBox2是登陆密码，__VIEWSTATE是必须的参数，所有在模拟登陆的时候这是必须的参数之一。登陆成功后向图片下面的那个地址(http:/ip/(palpckurpyrxad55cuxranfz)/xs_main.aspx?xh=012320242)跳转了。

### 页面请求

对于后面页面的访问，查看代码发现打开的方式是iframe，跟直接打开没有区别，但是直接打开连接会被跳转到登陆界面，所以这里在打开一个页面的时候肯定有一个参数判断，于是查看了页面源代码，没有与这类有关的数据提交。我分别用火狐和谷歌进行查看是否存在COOKIE，谷歌可以看到cookie，但是火狐却没有。以为登陆之后的每次请求都会通过cookie的检测（这里纯属菜鸟的愚见），关于是否存在cookie的问题，我通过了下面的代码进行验证：

``` php
$cookie_file = tempnam(‘./temp’, ‘cookie’);//创建一个具有唯一文件名的唯一文件
curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);//在会话结束后存储COOKIE
```

最后查看生成的文件为空，所以判断页面的请求不需要cookie。

但是即没有cookie，又没有提交其它的数据，为什么直接打开的连接不被通过而跳转至登陆界面呢？

![](/uploads/images/2014-08-25-02.jpg)

或许是请求的头信息不完整？在一个一个将请求的头信息不全后，发现在请求一个页面时，必须有Referer的头信息。OK一切解决！

代码

``` php
//登陆
$login_url = ‘http://ip/(palpckurpyrxad55cuxranfz)/default2.aspx';//登陆地址及POST页面
$post_fields = ‘__VIEWSTATE=dDwyOTIzOTAzMDY7Oz79I404t64pHCBQi38kvsPywO1hKg%3D%3D&TextBox1=学号&TextBox2=密码&RadioButtonList1=%D1%A7%C9%FA&Button1=’;//POST参数
$ch = curl_init($login_url);//创建一个curl会话并获取登陆内容
curl_setopt($ch, CURLOPT_HEADER, 0);//不取得反悔的头信息
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//获取到的内容是否输出到浏览器
curl_setopt($ch, CURLOPT_POST, 1);//使用POST提交
curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);//提交POST参数
curl_exec($ch);//显示curl的内容并打印出来
curl_close($ch);//关闭curl会话
```

### 页面访问
``` php
$url = ‘http://ip/(palpckurpyrxad55cuxranfz)/xsdjkscx.aspx?xh=学号&xm=姓名&gnmkdm=N121606';//访问某一页面的连接
ch=curlinit(ch=curlinit(url);//创建一个curl会话并获取登陆内容
curl_setopt(ch,CURLOPTHEADER,0);//不取得反悔的头信息
urlsetopt(ch,CURLOPTHEADER,0);//不取得反悔的头信息
urlsetopt(ch, CURLOPT_RETURNTRANSFER, 0);//获取到的内容是否输出到浏览器
curl_setopt($ch, CURLOPT_REFERER, “http://ip/(palpckurpyrxad55cuxranfz)/xs_main.aspx?xh=学号“ );//这个请求的头信息是必须的，不然无法访问
curl_setopt(ch,CURLOPTFOLLOWLOCATION,true);//执行跳转
con = curl_exec(ch);//显示curl的内容并打印出来
curlclose(ch);//显示curl的内容并打印出来
curlclose(ch);//关闭curl会话
```

我将这个进行了一些优化, 写成了一个类并提供下载, 高博的学生可点击这个Demo进行测试.


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~