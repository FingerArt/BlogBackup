---
title: Api文档自动生成之apiDoc简介
date: 2016-09-16 12:25:26
tags: 
    - Code
---
### 简介
[apiDoc](https://github.com/apidoc/apidoc) 是一个基于nodejs自动生成RESTful Api文档的工具，提供了api版本差异比较、自定义末班等功能。

去年和朋友开发一个app，我包下了Android和后端，当时为了让他更好的看懂api和便于后期的维护，专门写了一个api的PHP程序，发现这个api程序还欠缺很多东西加上没有太多时间就不再维护了。后来发现了apiDoc这个库，一直放着没有时间来仔细看，刚好这两天有时间，把这个库学习完了。

### 安装
安装 [npm](https://nodejs.org/zh-cn/) 的前提下

``` shell
$ npm install apidoc -g
```

<!--more-->

### 使用
```
## 目录结构

|- apidoc/
  |- apidoc.json
  |- header.md
  |- footer.md
  |- src/
    |- _apidoc.java
    |- User.java
  |- doc/
  |- template/
```

#### 生成api文档

``` shell
$ apidoc -i src/ -o doc/
```

#### apidoc 参数
* -i
  读取用于生成文档的目录，比如src目录
* -o
  生成api文档静态页面的目录
* -t
  自定义的模板目录，默认使用apiDoc的模板
* -f ".*\\.java$"
  解析符合正则表达式的文件
* -h
  显示帮助信息
  
#### 配置 apidoc.json
在执行 `apidoc` 命令的目录(apidoc/)创建apidoc.json文件，并加入以下内容：

``` json
{
  "name": "FingerArt API Document",
  "version": "0.2.0",
  "description": "A sample of User API document generated from apiDoc",
  "title": "FingerArt API",
  "url" : "",
  "sampleUrl": "http://fingerart.me:44",
  "header": {
    "title": "Overview",
    "filename": "header.md"
  },
  "footer": {
    "title": "Copyright",
    "filename": "footer.md"
  },
  "template": {
    "withGenerator": false
  }
}
```
* name
  文档内容的最大标题
* version
  文档的版本号，一般保持在最新
* description
  文档的描述
* title
  显示网页的title
* url
  每个api地址前缀
* sampleUrl
  请求示例工具的地址前缀，当有此项时，会出现该工具
* header/footer
  文档的头部和尾部
    - title 
      头/尾部标题
    - filename 
      头部markdown文件
* template
  - withCompare
    自动生成版本比较功能的文件，默认 `true`
  - withGenerator
    生成默认的apidoc版权，默认 `true`

#### apiDoc 注解
* @api {method} path [title]
  `method` 请求方式: get/post/put...
  `path` User/register
  `title` 标题
* @apiDescription text
  api描述
* @apiError [(group)] [{type}] field [description]
* @apiErrorExample [{type}] [title]
  example
* @apiExample [{type}] title
  example
* @apiGroup name
* @apiHeader [(group)] [{type}] [field=defaultValue] [description]
* @apiHeaderExample [{type}] [title]
  example
* @apiIgnore [hint]
* @apiName name
* @apiParam [(group)] [{type}] [field=defaultValue] [description]
* @apiParamExample [{type}] [title]
  example
* @apiPermission name
* @apiSampleRequest url
* @apiSuccess [(group)] [{type}] field [description]
* @apiSuccessExample [{type}] [title]
  example
* @apiUse name
* @apiVersion version

### 问题
1. 无法生成带有历史版本比较功能
   必须同时加上 `@apiVersion` `@apiName` `@apiGroup` 这个三个注解

### 参考
官方文档: [http://apidocjs.com](http://apidocjs.com/)
官方示例: [https://github.com/apidoc/apidoc/tree/master/example](https://github.com/apidoc/apidoc/tree/master/example)

