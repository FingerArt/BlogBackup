---
title: RxJava源码浅析之工作原理
date: 2018-02-08 17:04:05
categories: Code
tags: 
	- RxJava
---

通过 `Observable` 中的静态方法先创建 `OnSubscribe` 然后创建 `Observe` 并将 `OnSubscribe` 传入 `Observable` ，完成 `Observable` 的创建；
在冷启动中，`subscribe` 时会调用 `Observable` 中 `OnSubscribe` 的 `call` 方法开始工作。

## 被观察者的创建过程

通过 `Observable` 的创建操作符创建被观察者，其底层实现主要是（以 `from` 为例）:

```java
class Observable<T> {
    /**
    * OnSubscribeFromIterable是现实了OnSubscribe的被观察者，其中包含了业务主要的逻辑。
    */
    public static <T> Observable<T> from(Iterable<? extends T> iterable) {
        return unsafeCreate(new OnSubscribeFromIterable<T>(iterable));
    }
}
```

```java
class Observable<T> {
    /*
    * unsafeCreate创建Observable，并持有OnSubscribe。
    */
    public static <T> Observable<T> unsafeCreate(OnSubscribe<T> f) {
        return new Observable<T>(f);
    }
}
```

<!--more-->

## 观察者的订阅与冷启动

通过 `Observable#subscribe` 完成观察者的订阅，其中可直接订阅 `Action` ，其 `subscribe` 实现会将其转换成 `ActionSubscriber`

```java
class Observable<T> {
    public final Subscription subscribe(Subscriber<? super T> subscriber) {
        return Observable.subscribe(subscriber, this);
    }

    /**
    * 订阅并冷启动
    */
    static <T> Subscription subscribe(Subscriber<? super T> subscriber, Observable<T> observable) {
        subscriber = new SafeSubscriber<T>(subscriber);
//      ...
        //获得Observable并调用call,完成冷启动
        observable.onSubscribe.call(subscriber);
        return subscriber;//返回Subscription
    }
}
```
> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你按照该博文的内容进行直接使用。谢谢~~