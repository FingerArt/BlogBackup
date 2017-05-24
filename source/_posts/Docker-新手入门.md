---
title: Docker 新手入门
date: 2017-05-25 00:07:48
tags:
    - Docker
---

![](http://fingerart.qiniudn.com/image/docker.png)

该文章以Mac为例。

## 一、安装

请至Docker官网下载Mac版：[https://www.docker.com/docker-mac](https://www.docker.com/docker-mac)

<!--more-->

## 二、创建你的第一个Web服务器

``` bash
Mac:~ fingerart$ docker run -d -p 80:80 --name webserver nginx

Unable to find image 'nginx:latest' locally
latest: Pulling from library/nginx
ff3d52d8f55f: Pull complete
b05436c68d6a: Pull complete
961dd3f5d836: Pull complete
Digest: sha256:12d30ce421ad530494d588f87b2328ddc3cae666e77ea1ae5ac3a6661e52cde6
Status: Downloaded newer image for nginx:latest
97503a2fbca4c2796975085c7d6e853243522c974803e23805e6d301787e9133
```

因为是第一次使用，Docker会从Docker Hub拉取Nginx，拉取完成后你可以在浏览器访问` localhost `即可访问到Nginx的欢迎页。
注意，如果你有程序占用了80端口，请先关闭。

运行 `docker ps` 你会看到正在运行的Web服务器

``` bash
CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS              PORTS                NAMES
97503a2fbca4        nginx               "nginx -g 'daemon ..."   About a minute ago   Up About a minute   0.0.0.0:80->80/tcp   webserver
```

![](http://fingerart.qiniudn.com/image/docker-preview-nginx.png)

### 三、操作

- 开启容器: `docker start webserver`
- 停止容器: `docker stop webwerver`
- 查看所有容器: `docker ps -a`
- 移除容器: `docker rm -f webserver`
- 移除镜像(通过IMAGE ID或名称): `docker rmi nginx`

> 更多信息请查阅官方文档 [https://docs.docker.com/docker-for-mac](https://docs.docker.com/docker-for-mac)


