---
title: ITextPdf 签名集成问题
date: 2017-03-17 21:12:56
tags:
    - IText
---

因项目的需要需要使用对pdf进行签名，但使用ITextPdf进行签名遇到一些错误，官方说的不够明确，在此记录一下，供后面遇到该问题的朋友参考。

## Q1

引用的 ITextPdf 下

> java.lang.ClassNotFoundException: org.bouncycastle.*

如果你遇到了这个错误你需要添加另外一个用于签名的库：[bouncycastle](https://www.bouncycastle.org) (bcprov-jdk15on-156.jar、bcpkix-jdk15on-156.jar、bcmail-jdk15on-156.jar)

**这里请不要引用错了ITextG库**

<!-- more -->

## Q2

如果你引用了用于Android的ITextG

> Could not find class org.spongycastle.*

因为这个库使用了用于Android加密的库 [spongycastle](https://rtyley.github.io/spongycastle)，而spongycastle是基于bouncycastle的。

请参考 [http://stackoverflow.com/questions/6898801/how-to-include-the-spongy-castle-jar-in-android](http://stackoverflow.com/questions/6898801/how-to-include-the-spongy-castle-jar-in-android)






