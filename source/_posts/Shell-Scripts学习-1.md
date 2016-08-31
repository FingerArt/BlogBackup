---
title: Shell Scripts学习 1
date: 2015-01-21 23:04:17
categories: Code
tags:
	- Linux
	- Shell
---

``` bash
#!/bin/bash  <==在#之后加上!与shell的名称，用来宣告使用的这个脚本的用途
[root@localhost shell]# sh  shell-001-hello.sh

所有在 scripts 里面的东西，基本规则 ( 如变量设定规则 ) 需要与 command line 时相同;

脚本的后缀名最好为 .sh 提供他人的认识;

并非加上 .sh 就可以是执行文件，还需要查看其属性中是否有 x 这个属性.

#!/bin/bash
双引号与单引号的区别
Date： 2015/01/21
Made by FingerArt

name=”FingerArt”
name1=”My name is $name”
name2=’My name is $name’
echo $name
echo $name1
echo $name2

[root@localhost shell]# sh shell-001-引号区别.sh
FingerArt
My name is FingerArt
My name is $name

```

从中可以知道双引号能够解析变量, 单引号则不能.

声明变量类型 declare

``` bash
[root@localhost shell]# declare [-afirx] 
参数说明：
-a  ：定义为数组 array
-f  ：定义为函数 function
-i  ：定义为整数 integer
-r  ：定义为『只读』
-x  ：定义为透过环境输出变量

#!/bin/bash
# 变量声明
# Date： 2015/01/21
# Made by FingerArt

a=3
b=4
ab=$a*$b
declare -i c=3
declare -i d=4
declare -i cd=$c*$d
echo $ab
echo $cd

[root@localhost shell]#sh shell-003-declare.sh
3*4 //原样输出,ab没声明变量类
12
```

交互式shell脚本

``` bash
#!/bin/bash
# read 等待键盘输入
# Date: 2014-12-28
# Made: FingerArt

echo "Please input your name, and press Enter to complate."
read name
echo "Your name is $name"

[root@localhost shell]#sh shell-003-declare.sh
Please input your name, and press Enter to complate. //提示信息
FingerArt //键盘输入的内容
Your name is FingerArt //输出内容
执行 .sh 文档时附加参数

[root@localhost shell]#sh shell-003-declare.sh 参数1 参数2 ...
文件名=>$0 , 参数1=> $1, 参数2=>$2 ...
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~