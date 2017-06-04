---
title: 解决mac下在线安装Visual Studio 无法连接到网络
date: 2017-06-04 22:16:07
tags:
    - Visual Studio
---

准备要接手C#的项目了，自然需要好的工具(Visual Studio)。在微软的官网下载的安装包是一个在线的安装程序，在安装的第一步(检查网络环境)，出现无法连接到网络，有网络并且Shadowsocks也是开着全局的。

### 一、安装proxychains4
``` shell
brew install proxychains-ng
```

### 二、配置
```
vim /usr/local/etc/proxychains.conf
```
### 三、使用proxychains4安装

```
proxychains4 open /Volumes/Visual\ Studio\ Installer/Install\ Visual\ Studio.app
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用


