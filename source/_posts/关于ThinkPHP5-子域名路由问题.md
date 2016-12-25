---
title: 关于ThinkPHP5 子域名路由问题
date: 2016-12-01 02:18:43
tags:
    - ThinkPHP
---

准备在一个CRM的项目，本想使用Laravel框架的，但是并不怎么熟练，加上时间紧迫，最后决定使用ThinkPHP。

因为TP5是新出的一个版本，改动有些大，在看完文档中的路由（域名检测）部分后，就希望能做到这样的效果：

定义某个api路由规则时，可以根据 `api.domain.com` 子域名来检测；非 `api.domain.com` 子域名访问其他模块。但是根据文档配置后却会报 **模块不存在** 

再三查看文档后决定没错，后来跟进源码查看关键位置

``` php
//thinkphp/library/think/Route.php

182 if (isset($rule['__domain__'])) {
183     self::domain($rule['__domain__']);
184     unset($rule['__domain__']);
185 }

119 self::$rules['domain'][$domain]['[bind]'] = [$rule, $option, $pattern];

1132 if(isset($option['domain']) && !in_array($option['domain'], [$_SERVER['HTTP_HOST'], self::$subDomain])) // 域名检测
```

会发现通过如下设置即可完成：

``` php
//route.php

'__domain__'=>[
   'api' => 'api/User/index',
],

'user' => ['api/User/create', ['method' => 'get', 'domain'=>'api']],
```

