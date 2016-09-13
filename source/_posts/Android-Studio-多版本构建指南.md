---
title: Android Studio 多版本构建指南
date: 2016-06-15
categories: Code
tags: 
	- Android
	- Gradle
---
### 需求

在一个APP的基础上，构建另外一个APP，与之不同的是部分代码和资源改变
为了节约工作量和更好的后期维护，我们决定共用同一套代码。

像这种需求我已经遇到好几次了，这里只讲在Android Studio上进行多版本构建的步骤和一些配置

### 多版本构建

#### Gradle简介

Gradle 是一个基于Ant和Maven概念的项目自动化建构工具。它使用一种基于Groovy的特定领域语言(DSL)来声明项目设置，这比我们的ANT使用XML构建配置要灵活的多。在编写配置时，你可以像编程一样灵活，Gradle是基于Groovy的DSL语言，完全兼容JAVA。

<!--more-->

#### 了解 build.gradle

现在我们需要如下表格的apk:

|  | release | debug |
| ------- | ------ | ------ |
| productA | productA(release版) | productA(debug版) |
| productB | productB(release版) | productB(debug版) |

通过这个表格可以看出，两个产品（共用同一套代码）可以生成4种类型的apk

build.gradle在每一个module都存在，它是用来构建我们的APP的。

* defaultConfig

这个模块一些默认配置

```
defaultConfig {
	applicationId "me.fingerart.android"
	minSdkVersion 13
	targetSdkVersion 23
	versionCode 1
	versionName "1.0"
	...
}
```

* buildTypes

构建的类型，一般是发行和debug两种

```
buildTypes {
    release {
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.txt'
        //signingConfig signingConfigs.release
    }
    debug {
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.txt'
        //signingConfig signingConfigs.debug
    }
}
```

* productFlavors

产品的变种，体现不同版本之前配置的差异，这也就是我们构建多个版本的主要配置了
productFlavors的配置会覆盖与defaultConfig中的相同配置，也就是说productFlavors+defaultConfig组成最终的配置
比如，productB的applicationId会覆盖defaultConfig，最后打出apk的applicationId是productB中的；而productA因为没有配置applicationId所以会使用defaultConfig中的。

```
productFlavors {
        productA {
            resValue 'string', 'app_name', 'APP_A'
            buildConfigField 'String', 'URL_PATH', '"http://fingerart.me/APP_A"'
            manifestPlaceholders = [
                    appkey_easeMob  : 'a',
					appkey_baidu : 'a'
            ]
        }

        productB {
            applicationId 'com.hysd.skyworth.productb'
            resValue 'string', 'app_name', 'APP_B'
            buildConfigField 'String', 'URL_PATH', '"http://fingerart.me/APP_B"'
            manifestPlaceholders = [
                    appkey_easeMob : 'b',
					appkey_baidu   : 'b'
            ]
        }
}
```

#### 开始

你可以手动的添加上面我们介绍过的这些配置，你需要sync project才会生效。
你还可以` Project Structure(Ctrl+Shift+Alt+S) -> 选中Module -> flavors `进行配置

当你配置完成之后

### 示例参考
[https://github.com/fingerart](https://github.com/fingerart)