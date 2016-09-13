---
title: 认识与学习BASH
date: 2016-09-03 20:41:58
categories: Code
tags: 
	- Linux
	- Shell
---
### 认识shell
#### 简介
shell是使用者与内核沟通以达到理想工作的方式，Linux发展中出现多种shell，Bourne Again SHell是Linux使用的一个shell版本简称bash。

### history
`~/.bash_history` 记录了前一次登录是说运行的命令，当前登录说运行的命令记录在内存中，成功注销后悔记录到 `~/.bash_history` 中。

### alias
命令的别名

### 内建命令type
``` bash
[root@www ~]# type [-tpa] name
选项与参数：
    ：不加任何选项与参数时，type 会显示出 name 是外部命令还是 bash 内建命令
-t  ：当加入 -t 参数时，type 会将 name 以底下这些字眼显示出他的意义：
      file    ：表示为外部命令；
      alias   ：表示该命令为命令别名所配置的名称；
      builtin ：表示该命令为 bash 内建的命令功能；
-p  ：如果后面接的 name 为外部命令时，才会显示完整文件名；
-a  ：会由 PATH 变量定义的路径中，将所有含 name 的命令都列出来，包含 alias
```

### 变量
