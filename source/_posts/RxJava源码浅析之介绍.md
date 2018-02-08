---
title: RxJava源码浅析之介绍
date: 2018-02-08 16:04:05
categories: Code
tags: 
	- RxJava
---

## 简介

> 一个在 Java VM 上使用可观测的序列来组成异步的、基于事件的程序库。

- 异步
- 简洁
- 可扩展的观察者模式

第一次看到上面话理解起来比较抽象，通俗的说就是RxJava是一个运行在Java虚拟机上面通过可以观察的基于事件的序列来完成异步任务的库。

**本系列博文均在RxJava1.2.9下**

## RxJava四个基本概念：

在学习RxJava之前一定要理解以下几个对象，否则无法理解源码。

| 对象 | 说明 |
| ------------ | ------------ |
| Observable | 被观察者 |
| Subscriber(Observer) | 订阅者(观察者) |
| subscribe | 订阅 |

`Observable` 和 `Observer` 通过 `subscribe` 实现订阅与被订阅关系，从而 `Observable` 可以在需要的时候发出事件来通知 `Observer`。

```
                      onNext(param)
                      onCompleted()
+------------+        onError(error)       +----------+
| Observable |---------------------------->| Observer |
+------------+                             +----------+
```

| 方法 | 说明 |
| ------------ | ------------ |
| onCompleted | 事件队列完结 |
| onNext | 当前事件 |
| onError | 事件队列异常 |

### 注意

- onCompleted，RxJava不仅把每个事件单独处理，还会把他们看作一个队列。当不再有新的onNext()发出时，就会触发onComplete()作为标志。
- onError，在事件处理过程中出现异常时，就会触发，同时队列自动终止，不允许再有事件发出。
- 在一个正确运行的事件序列中，onComplete() 和 onError() 有且只有一个，并且是事件序列中的最后一个。
- onComplete和onError二者也是互斥的，即在队列中调用了其中一个，就不会再调用另一个。

## Observables 的”冷“和”热“

Observable什么时候发射数据取决于Observable的实现；
一个”热“的Observable可能已创建完就开始发射数据，因此所有后续订阅它的观察者可能从序列中间的某个位置开始接受数据（有一些数据错过了）；
一个”冷“的Observable会一直等待，直到有观察者订阅它才开始发射数据，因此这个观察者可以确保会收到整个数据队列。

在一些ReactiveX实现里，还存在一种Connectable的Observable，不管有没有观察者订阅它，都不会发射数据，除非Connect方法被调用。

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你按照该博文的内容进行直接使用。谢谢~~