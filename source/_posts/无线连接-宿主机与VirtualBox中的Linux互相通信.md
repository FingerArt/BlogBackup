---
title: 无线连接-宿主机与VirtualBox中的Linux互相通信
date: 2016-09-04 19:47:37
categories: Code
tags: Linux
---
有线连接中的配置方式在上篇博文已经讲过了。

#### 设置连接方式
将网卡1设置为桥接网卡方式如图
![](http://77fzuw.com1.z0.glb.clouddn.com/image/BritualBox_Bird.png)

#### 网络配置
请参照你的宿主机设置好网关、掩码、ip地址、BOOTPROTO

``` shell
vi /etc/sysconfig/network-scripts/ifcfg-eth0
```

<!--more-->

```
DEVICE=eth0
HWADDR=08:00:27:12:41:D3
NETMASK=255.255.255.0
IPADDR=192.168.0.99
GATEWAY=192.168.0.1
TYPE=Ethernet
UUID=cd17d691-d2be-54d0-8c7a-c1612cfbf631
ONBOOT=yes
NM_CONTROLLED=no
BOOTPROTO=static
```

填写完成后重启网络服务

``` shell
service network restart
```

#### 测试
宿主机：
![](http://77fzuw.com1.z0.glb.clouddn.com/gif/virtualbox_wireless_connection_test.gif)

Linux：
![](http://77fzuw.com1.z0.glb.clouddn.com/gif/virtualbox_wireless_connection_linux_test.gif)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~