---
title: RxJava源码浅析之理解操作符
date: 2018-02-08 18:04:05
categories: Code
tags: 
	- RxJava
---

操作符是为了解决对Observable对象的变换的问题，用于在Observable和最终的Subscriber之间控制、修改Observable发出的事件。

本文通过Filter和Skip操作符的源码来理解操作符的作用，最后可学会自定义操作符。

### Filter

Filter中主要是通过`OnSubscribeFilter`和`FilterSubscriber`代理原始的`Observable`和`Subscriber`完成筛选。

```java
class Observable<T> {
    public final Observable<T> filter(Func1<? super T, Boolean> predicate) {
        //创建OnSubscribeFilter，将原始的Observable传入做代理工作
        return unsafeCreate(new OnSubscribeFilter<T>(this, predicate));
    }
}

class OnSubscribeFilter<T> {
    final Observable<T> source;
    
    final Func1<? super T, Boolean> predicate;

    public OnSubscribeFilter(Observable<T> source, Func1<? super T, Boolean> predicate) {
        this.source = source;
        this.predicate = predicate;
    }
    
    @Override
    public void call(final Subscriber<? super T> child) {
        //创建FilterSubscriber代理
        FilterSubscriber<T> parent = new FilterSubscriber<T>(child, predicate);
        //将FilterSubscriber的生命周期与真是的Subscriber绑定
        child.add(parent);
        //将FilterSubscriber订阅在原始的Observable上
        source.unsafeSubscribe(parent);
    }

    /**
    * 主要完成Subscriber的代理下发工作
    */
    static final class FilterSubscriber<T> extends Subscriber<T> {
        @Override
        public void onNext(T t) {
            boolean result = predicate.call(t);
            if (result) {
                actual.onNext(t);
            }
        }

        @Override
        public void onError(Throwable e) {
            actual.onError(e);
        }

        @Override
        public void onCompleted() {
            actual.onCompleted();
        }
    }
}
```

通过Filter可以知道通过定义一个新的OnSubscribe可以完成对原始OnSubscribe的修改、控制。
除了定义一个全新的OnSubscribe外还可以通过Operator的方式来完成。

<!--more-->

### Skip与自定义操作符

自定义操作符我们可以通过`Skip` 操作符来学习。

```java
class Observable<T> {
    Observable<T> skip(int count) {
        //创建一个OperatorSkip处理具体的操作符逻辑
        return lift(new OperatorSkip<T>(count));
    }
    
    <R> Observable<R> lift(final Operator<? extends R, ? super T> operator) {
        //lift通过创建一个新的OnSubscribeLift来完成Operator的代理
        return unsafeCreate(new OnSubscribeLift<T, R>(onSubscribe, operator));
    }
}

class OnSubscribeLift<T, R> implements OnSubscribe<R> {

    OnSubscribe<T> parent;

    Operator<? extends R, ? super T> operator;

    OnSubscribeLift(OnSubscribe<T> parent, Operator<? extends R, ? super T> operator) {
        this.parent = parent;
        this.operator = operator;
    }

    @Override
    public void call(Subscriber<? super R> o) {
        try {
            Subscriber<? super T> st = operator.call(o);//获取操作符提供的Subscriber
            st.onStart();
            parent.call(st);//将Subscriber订阅在原始的OnSubscribe上，并冷启动
        } catch (Throwable e) {
            o.onError(e);
        }
    }
}

/**
* 与Filter操作符不同的是，将具体的逻辑封装到Operator中，只需要关注具体的逻辑和向下传递事件，不需要关心冷启动
*/
class OperatorSkip<T> implements Observable.Operator<T, T> {

    int toSkip;

    public OperatorSkip(int n) {
        this.toSkip = n;
    }

    @Override
    Subscriber<? super T> call(final Subscriber<? super T> child) {
        return new Subscriber<T>(child) {

            int skipped;

            @Override
            public void onCompleted() {
                child.onCompleted();
            }

            @Override
            public void onError(Throwable e) {
                child.onError(e);
            }

            @Override
            public void onNext(T t) {
                if (skipped >= toSkip) {
                    child.onNext(t);
                } else {
                    skipped += 1;
                }
            }
        };
    }
}
```

最后关于自定义操作符我们就通过实现 `Operator` 操作符完成。

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你按照该博文的内容进行直接使用。谢谢~~