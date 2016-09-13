---
title: Hexo博客的搭建记录
date: 2016-04-18 14:33:26
categories: Code
tags: hexo
---

### hexo快速安装指南

使用npm工具安装hexo

``` shell
$ npm install -g hexo
```

初始化hexo

``` shell
$ hexo init <folder>
```

安装Hexo依赖包，根据blog文件夹中的package.json配置下载

``` shell
$ npm install
```

生成静态页面

``` shell
$ hexo g #generate
```

预览

``` shell
$ hexo s #server
```

访问localhost：4000，预览本地的hexo站点

<!-- more -->

### 目录结构

```
├── _config.yml    全局配置
├── package.json
├── scaffolds      模版目录
├── public         草稿目录
├── source
|   └── _posts     发表博文目录
└── themes
```

### 配置参考

```
# Hexo Configuration
## Docs: https://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site #整站的基本信息
title: 指尖上的艺术 #网站标题
subtitle: 学习的热情，不应为季节的变化而改变 #网站副标题
description: 学习 思考 感悟 分享 #网站描述
author:  George #网站作者，在下方显示
email: FingerArt@sina.com #联系邮箱
language: zh-CN

# URL
## If your site is put in a subdirectory
url: http://fingerart.me #你的域名
root: /
permalink: :year/:month/:day/:title/
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code

# Directory
source_dir: source
public_dir: public

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
auto_spacing: false # Add spaces between asian characters and western characters
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
max_open_file: 100
multi_thread: true
filename_case: 0
render_drafts: false
post_asset_folder: false
highlight:
  enable: true
  line_number: true
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:

# Archives
## 2: Enable pagination
## 1: Disable pagination
## 0: Fully Disable
archive: 2
category: 2
tag: 2

# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: H:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 15 #每页15篇文章
pagination_dir: page

# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: landscape
exclude_generator:
Plugins:
- hexo-generator-feed
- hexo-generator-sitemap

#sitemap
sitemap:
  path: sitemap.xml

#Feed Atom
feed:
  type: atom
  path: atom.xml
  limit: 20

# Markdown
## https://github.com/chjj/marked
markdown:
  gfm: true
  pedantic: false
  sanitize: false
  tables: true
  breaks: true
  smartLists: true
  smartypants: true

# Stylus
stylus:
  compress: false

# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: github
  repository: git@github.com:fingerart/FingerArt.github.io.git
  branch: master
```

### 问题

Deployer not found: github

> npm install hexo-deployer-git --save

### 常用命令

```
$ hexo n #new [layout]	<title>	建立新文章，默认在_posts下，layout="draft"时发布的是草稿
$ hexo p #publish <filename>	将_drafts下的文件放到_posts下，也就是发布草稿
$ hexo g #generate		生成静态网页
$ hexo s #server		启动预览服务器，开启-d选项时可以预览草稿
$ hexo d #deploy		发布到远程服务器，开启--generate选项可以在deploy前自动generate
```

### 导入参考

[https://hexo.io/docs/migration.html](https://hexo.io/docs/migration.html)

### 发布博客

定义自己的域名，访问我们的博客内容，添加CNAME文件（前提是在域名服务商解析到github指定的ip下）

```
$ echo FingerArt.me > source/CNAME
$ hexo d -g   #生成博文并部署到gighub上
```

这样，通过域名就可以访问到我们的博客啦！

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~

