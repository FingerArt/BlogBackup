---
title: 有线连接-宿主机跟VirtualBox中的Linux互相通信
date: 2016-09-04 18:53:44
categories: Code
tags: Linux
---

文中介绍了我在**有线连接**下，使用VirtualBox创建CentOS时遇到Linux访问外网和宿主机访问Linux的问题后的解决办法，文中宿主机是指实体到笔记本或者台式电脑。

### 连接方式
Virtual中有6种连接方式，分别为：网络地址转换（NAT）、NAT网络、桥接网卡、内部网络、仅主机（Host-Only）网络、通用驱动。
这里只讲后面会用到的2种方式的作用。

<!--more-->

#### 网络地址转换（NAT）
**Linux可以访问宿主机**，反向的无法访问。

#### 桥接网卡
**宿主机可以访问Linux**，反向无法访问。

#### 配置
#### 配置网卡
网卡1连接方式设置为**网络地址转换（NAT）**
![](http://77fzuw.com1.z0.glb.clouddn.com/image/virtualbox_wired_connection_net1.png)
启用网卡2，连接方式设置为**桥接网卡**
![](http://77fzuw.com1.z0.glb.clouddn.com/image/virtualbox_wired_connection_net2.png)

#### Linux配置
#### 配置eth0
``` shell
vim /etc/sysconfig/network-scripts/ifcfg-eth0
```

配置如下(千万不要配GATEWAY)
```
HWADDR=08:00:27:12:41:D3
NETMASK=255.255.255.0
IPADDR=192.168.0.99
TYPE=Ethernet
UUID=cd17d591-d5be-44d0-8c7a-c1682cfbf631
ONBOOT=yes
NM_CONTROLLED=no
BOOTPROTO=dhcp
```

#### 配置eth1
``` shell
vim /etc/sysconfig/network-scripts/ifcfg-eth1
```

配置如下
```
DEVICE=eth1
HWADDR=08:00:27:EB:B7:9A
NETMASK=255.255.255.0
IPADDR=192.168.0.99
TYPE=Ethernet
UUID=cd17d591-d5be-44d0-8c7a-c1682cfbf631
ONBOOT=yes
NM_CONTROLLED=no
BOOTPROTO=static
```

### 重启network
``` shell
service network restart
```

### 测试
宿主机：
![](http://77fzuw.com1.z0.glb.clouddn.com/gif/virtualbox_wired_connection_test.gif)

Linux：
![](http://77fzuw.com1.z0.glb.clouddn.com/gif/virtualbox_wired_connection_linux_test.gif)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~