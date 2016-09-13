---
title: Android与服务端数据传输的编码处理
date: 2015-08-08 01:11:29
categories: Code
tags:
	- Android
	- 编码
---
乱码的问题不管是在BS或是CS架构中都会存在, 都有自己默认的编码, 不同的编码就会造成乱码, 处理乱码的最好办法就是保持服务端与客户的编码一致!

### GET方式

#### Tomcat

写出数据: os.write(“登陆成功”.getBytes(“UTF-8”)); //在不设置编码的情况下, 默认是以GBK编码的, 编码的内容在ISO-8859-1中查询不到, 使用Tomcat所在系统的默认编码
读取数据: new String(username.getBytes(“ISO-8859-1”), “UTF-8”); //GET中的数据默认是以ISO-8859-1编码的,现在需要将其解码再以原来的编码再进行编码

<!--more-->

#### Android:

写出数据: URL中的数据需要将其使用URLEncodedUtils.format(parameters , “UTF-8”)进行编码
读取数据: 服务端的数据默认是以UTF-8读取的.

---

### POST方式

#### Tomcat

写出数据: os.write(“登陆成功”.getBytes(“UTF-8”));
读取数据: request.setCharacterEncoding(“UTF-8”);//设置请求体的编码即可

#### Android

写出数据: connection.setRequestProperty(“Content-Type”, “application/x-www-form-urlencoded”);
connection.setRequestProperty(“Content-Length”, 内容长度);
OutputStream os = connection.getOutputStream();//通过输出流发送给服务端
os.write(data.getBytes(“UTF-8”));
读取数据: 服务端的数据默认是以UTF-8读取的.

![](http://77fzuw.com1.z0.glb.clouddn.com/255-android-login-view.png)

![](http://77fzuw.com1.z0.glb.clouddn.com/255-android-log.png)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~
