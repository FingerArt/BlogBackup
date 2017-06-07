---
title: 理解Docker三大组件之镜像
date: 2017-06-06 23:40:55
tags:
    - Docker
---

## 概念

Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

> 操作系统分为内核和用户空间，对于 Linux 而言，内核启动后，会挂载 root 文件系统为其提供用户空间支持。而 Docker 镜像（Image），就相当于是一个 root 文件系统。

## 镜像的分层存储

因为完整的镜像体积过于庞大，Docker你用Union FS技术将镜像进行分层存储；与ISO不同，Docker镜像是一个虚拟概念，由一组文件系统组成或者说是多层文件系统联合组成。

镜像是一层一层构建的，前一层是后一层的基础，如果删除前一层，仅仅是标记为删除，在容器中看不见，但还是会存在镜像中，所以构建镜像时需额外小心。

## 获取镜像

`docker pull [选项] [Docker Registry地址]<仓库名>:<标签>`

- Docker Registry地址：地址的格式一般是 <域名/IP>[:端口号]。默认地址是 Docker Hub。
- 仓库名：<用户名>/<软件名>。对于 Docker Hub，如果不给出用户名，则默认为 library，也就是官方镜像。

``` bash
$ docker pull nginx
```

### 运行镜像

我们现在可以通过创建一个容器并运行镜像。

``` bash
$ docker run -it --rm nginx bash
```

- -i 交互式操作
- -t 终端
- --rm 退出容器后，自动删除该容器

## 利用 commit 理解镜像构成

> 镜像是容器的基础，每次执行 docker run 的时候都会指定哪个镜像作为容器运行的基础。

以nginx镜像创建一个webserver的容器

``` bash
$ docker run --name webserver -d -p 80:80 nginx
```

进入已启动的webserver容器的交互式shell终端，修改nginx默认的index.html内容

``` bash
$ docker exec -it webserver bash
root@3729b97e8226:/# echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
root@3729b97e8226:/# exit
exit
```

查看webserver容器当前存储层的改动

``` bash
$ docker diff webserver
C /root
A /root/.bash_history
C /run
C /usr
C /usr/share
C /usr/share/nginx
C /usr/share/nginx/html
C /usr/share/nginx/html/index.html
C /var
C /var/cache
C /var/cache/nginx
A /var/cache/nginx/client_temp
A /var/cache/nginx/fastcgi_temp
A /var/cache/nginx/proxy_temp
A /var/cache/nginx/scgi_temp
A /var/cache/nginx/uwsgi_temp
```

此时，可以通过 `docker commit` 命令将webserver容器在原有镜像的基础上，再叠加容器存储层构建成一个新的镜像

`docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]`

``` bash 
$ docker commit \
  --author "FingerArt <george@chengguo.io>" \
  --message "修改了默认网页" \
  webserver \
  nginx:v2
sha256:07e33465974800ce65751acc279adc6ed2dc5ed4e0838f8b86f0c87aa1795214
```

``` bash
# 可查看到生成的 nginx:v2 镜像
$ docker images nginx

# 查看 nginx:v2 相比 nginx:latest 历史记录
$ docker history nginx:v2
```

此时你可以通过 `docker run` 来创建容器。

## 慎用 `docker commit`

前面通过 `docker diff webserver` 命令看到的信息中，出了改动了nginx的默认index.html文件外，还生成了一些缓存等文件， `docker commit` 进行了黑箱操作，生成了黑箱镜像，将不该添加的文件添加进了镜像中，如果删除上层的东西，却仍然存在镜像中，都将导致生成的镜像臃肿。
所以，除了一些特殊的场景，如黑客入侵保留现场等，都不要使用 `docker commit` 来制作镜像。

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。

