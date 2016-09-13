---
title: MySql学习笔记
date: 2014-08-25 10:41:40
categories: Code
tags:
	- MySql
---

### 数据库的连接与关闭
``` sql
//连接数据库
mysql -h 服务器主机地址 -u 用户名 -p
Enter password:密码
//关闭连接, 两者其一
exit;
quit;
```

### 创建用户并授权
``` sql
GRANT 权限 ON 数据库.数据表 TO 用户名@登陆主机 IDENTIFIED BY "密码"
//例如
GRANT SELECT,INSERT,UPDATE,DELETE ON *.* TO fingerart@"%" IDENTIFIED BY "password";//将所有数据库及其下面表的增删改查权限给了fingerart用户,可在任何主机下登陆
//权限还可以使用 ALL
flush privileges;//刷新系统权限表。
```

<!--more-->

### 修改用户密码
``` sql
//第一次设置root密码可以使用以下命令：
mysqladmin -h localhost -u root password NEWPASSWORD

//如果你已经设置过密码了，需要要以下命令：
mysqladmin -h localhost -u root -p'oldpassword' password newpass
```

### 创建数据库
``` sql
//创建数据库
mysql-> CREATE DATABASE IF NOT EXISTS demodatabase;//如果demodatabase数据库不存在的话就创建
//删除数据库
mysql-> DROP DATABASE IF EXISTS demodatabase;//如果demodatabase数据库存在的话就删除
//显示已建立的所有数据库
mysql-> SHOW DATABASES;
//打开某数据库为当前数据库使用
mysql-> USE demodatabase;
```

### 创建数据表
``` sql
CREATE TABLE [IF NOT EXISTS] user(
 字段名1 列类型 [属性] [索引],
 字段名2 列类型 [属性] [索引],
 字段名3 列类型 [属性] [索引],
 字段名n 列类型 [属性] [索引],
)[表类型] [表字符集];
//例如
mysql-> CREATE TABLE IF NOT EXISTS user(
     -> id INT NOT NULL AUTO_INCREMENT,
     -> name VARCHAR(10) NOT NULL,
     -> sex ENUM('男','女') NOT NULL DEFAULT '男',
     -> age TINYINT DEFAULT 0,
     -> PRIMARY KEY(id)
     -> );
//显示表的详细属性
mysql-> DESC user;//前提是已经选择了某个数据库
//删除表
mysql-> DROP TABLE IF EXISTS user;
```

### 增 删 改 查
``` sql
//按字段插入
mysql-> INSERT INTO user('name','sex') VALUES('localhost/fingerart','男');//优点:可自由选择字段
//非按字段插入
mysql-> INSERT INTO user VALUES(NULL,'localhost/fingerart','男','21');//每个字段都需要给值
//查询
mysql-> SELECT id,name,sex FROM user;//查询该表的所有记录,显示id,name,sex字段;全部字段可由 * 代替
mysql-> SELECT * FROM user WHERE id='1';//查询id为1的记录,显示所有字段
//更改
mysql-> UPDATE user SET name='FingerArt' WHERE id='1';//将user表中id为1的记录的name改为FingerArt
mysql-> UPDATE user SET age='0' WHERE id>'1' && id DELETE ROME user WHERE id='1';//删除user表中id=1的记录
```

### 修改表
``` sql
ALTER TABLE 表名 ACTION
//增加字段
ALTER TABLE 表名 ADD 字段  [FIRST|AFTER 字段]
//例如
mysql-> ALTER TABLE user ADD class TINYINT NOT NULL DEFAULT '1';//默认添加在最后
//修改字段
ALTER TABLE 表名 CHANGE(MODIFY)
//例如
mysql-> ALTER user CHANGE class classnum TINYINT NOT NULL DEFAULT '0';//CHANGE可以修改字段名
mysql-> ALTER user MODIFY class TINYINT NOT NULL DEFAULT '0';//MODIFY不可以修改字段名
//修改表名
ALTER TABLE 表名 RENAME AS 新的表名
```

### 其它
``` sql
//NULL
NULL意味着 没有值/未知值,可以将NULL插入到表中,并检索,但不能对其进行算术运算,结果还是NULL;0/NULL意味着假,其它值意味着真.
//类型转换
1+'2' //会转换成1+2=3
1+'a' //会被转成1+0=1
//时间存储
虽然MySql有日期时间类型,但是为了方便后面对时间进行计算等操作,最好将其存储为UNIX时间戳,这是基于PHP的Web项目中的常见方式.
//字段属性
UNSIGNED //只能设置数值类型
ZEROFILL //只能设置数值类型,数值前面自动用0补齐不足的位数.
AUTO_INCREMENT //自动增量属性
```

### 数据表的类型
``` sql
CREATE TABLE user(i int) YPTE(ENGINE)=MYISAM(INNODB);//新建表时为表添加表类型
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~