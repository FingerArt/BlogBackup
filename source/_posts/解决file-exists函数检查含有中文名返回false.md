---
title: 解决file_exists函数检查含有中文名返回false
date: 2014-08-25 10:32:35
categories: Code
tags:
	- PHP
---
刚刚在项目中做一个删除含有中文名的文件时,先使用file_exists()进行检查该文件是否存在,不管我怎么调试,总是提示文件不存在,将地址复制到浏览器验证,地址没有错.有朋友做了下面的结论.

<!--more-->

file_exists()函数在PHP中主要用来判断指定文件或目录是否存在，使用方法是很简单的，不少人都喜欢用这个函数，但细心的人会发现，file_exists函数在当网页为UTF8编码时，对所验证的文件名或目录名始终返回false，以下面的代码为例 ，是段很普通的file_exists()函数应用实例，像文件名中有中文，其结果是，无论文件是否存在，程序都返回文件不存在，也就是false：

``` php
if (file_exists($filename))
 retrun true;
else
 return false;
```

下面是解决办法，也就是把中文转码，将UTF8编码转换为GB2312编码，现在返回结果一切正常了：

``` php
$filename = iconv("UTF-8","GB2312",$filename);
if (file_exists($filename))
  retrun true;
else
  return false;
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~