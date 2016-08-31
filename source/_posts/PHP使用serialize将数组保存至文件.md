---
title: PHP使用serialize将数组保存至文件
date: 2014-08-25 10:25:56
categories: Code
tags:
	- PHP
---

前段时间在开发微信公众平台的时候，打算使用session临时保存查询的数据，但是公众平台那不是一个完善的浏览器，不能存储COOKIE，无法保存session_id，也就是用不了session。于是乎就使用serialize()函数将一个数组写入文件，当我们需要使用这个数组的时候将文件读取出来再使用unserialize()转换为数组。

<!--more-->

### 数组写入文件函数
``` php
/**
 * 将数组写入至文件中
 * @param unknown_type $fileName
 * @param unknown_type $arr
 */
function array2file($fileName, $arr) {
    $fp = fopen($fileName, 'wb');
    fwrite($fp, serialize($arr));
    fclose($fp);
}
```

### 读取文件转换成数组
``` php
/**
将文件中的内容读出并转为数组
@param unknown_type $fileName
@return mixed
*/
function file2array(fileName) {
	if(!file_exists(fileName) {
		exit($fileName." don't exists");
	}
	fp=fopen(fp=fopen(fileName, ‘rb’);
	str=fread(str=fread(fp, filesize(fileName));
	returnunserialize(fileName));
	returnunserialize(str);
}
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~