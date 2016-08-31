---
title: Handler和Message-异步消息机制-2
date: 2015-08-10
categories: Code
tags:
	- Android
	- Handler
---

![Handler消息机制](http://77fzuw.com1.z0.glb.clouddn.com/262-Handler-%E6%B6%88%E6%81%AF%E6%9C%BA%E5%88%B6.png)

上次简单的介绍了handler的消息机制, handler将message发送给messageQueue, looper不停的在messageQueue中取出message并执行相应的操作!

<!--more-->

这次我们从码Android的底层源分析Handler的消息机制!

首先, 我们先讲Handler和Message之间的联系,Message是传递消息的载体, Handler是发送消息的工具, 创建Message和Handler的方式有很多， 关联关系很是巧妙, 读者可以查看下文对Android源码的解读可知!

我们知道, Handler是将message发送到messageQueue中的, 然后Looper会一直循环处理messageQueue中的message中的.那么Looper和messageQueue是何时创建的呢?

Looper的构造函数是private的, 目的是让我们调用它的prepare方法获取一个Looper的对象, 在prepare方法(读者具体可查看源码)中首先会获取保存在本地线程中的Looper对象, 如果存在会抛出异常不让我们再创建, 如果不存在会创建一个Looper对象并保存在本地线程中, 也就是说: **一个线程中只会有一个Looper**

在Looper的构造函数中会创建一个messageQueue, 保存在Looper对象中, 同时也说明了: **一个线程中只会有一个messageQueue**

通过一个Looper和一个messageQueue解决了多线程访问共享数据的安全问题了!

创建Handler的时候, Handler内部会去获取存放于本地线程中的Looper, 并且会从Looper中获取messageQueue, 当Handler发送消息是, 就会向这个messageQueue中发送消息了!

```java
/**
 * message:
 * 一般创建message的方式 new Message();
 * 推荐使用, 会从message池中获取已经使用过的message重复利用,节约内存
 */
public static Message obtain() {
	synchronized (mPoolSync) {
		if (mPool != null) {
		    Message m = mPool;
		    mPool = m.next;
		    m.next = null;
		    return m;
	    }
	}
    return new Message();
}

/**
 * 传入一个message,它会从message池中获取一个, 然后将传入
 * message中的数据复制给从message池中获取的message并返回
 */
public static Message obtain(Message orig) {
    Message m = obtain();
    m.what = orig.what;
    m.arg1 = orig.arg1;
    m.arg2 = orig.arg2;
    m.obj = orig.obj;
    m.replyTo = orig.replyTo;
    if (orig.data != null) {
        m.data = new Bundle(orig.data);
    }
    m.target = orig.target;
    m.callback = orig.callback;

    return m;
}

/**
 * 传入一个Handler对象,将传入的Handler对象存放在target中, 然后调
 * 用sendToTarget方法发送message至messageQueue中
 */
public static Message obtain(Handler h) {
    Message m = obtain();
    m.target = h;

    return m;
}

public void sendToTarget() {
    target.sendMessage(this);
}

//在传入Handler的同时还能传入message的几个参数
public static Message obtain(Handler h, int what, int arg1, int arg2, 
Object obj) {
    Message m = obtain();
    m.target = h;
    m.what = what;
    m.arg1 = arg1;
    m.arg2 = arg2;
    m.obj = obj;

    return m;
}

/**
 * message对象的方法有很多, 不做一一介绍了, 大家可以去查看源码!
 * Handler:
 * 从Handler的构造函数中可看到,Handler在创建对象的时候先获取了一个Looper并从
 * Looper中取出了Looper所对应的messageQueue(消息队列)
 */
public Handler() {
	//somecode
    mLooper = Looper.myLooper();
    if (mLooper == null) {
        throw new RuntimeException("Can't create handler inside thread that"
+"has not called Looper.prepare()");
    }
    mQueue = mLooper.mQueue;
    mCallback = null;
}

/**
 * 通过Handler对象创建一个Message,可以看到Android调用的是我们上面介绍过的
 * obtain(Handler h, int what, int arg1, int arg2, Object obj)方法可
 * 以不需要再通过Handler的sendMessage来发送消息, 直接使用message.sendToTarget()
 * 即可完成消息的发送
 */
public final Message obtainMessage(int what, int arg1, int arg2, Object obj)
{
        return Message.obtain(this, what, arg1, arg2, obj);
}

/**
 * Looper:
 * Looper类中并没有几个方法, 我们介绍prepare/loop/myLooper方法, 再查看
 * Looper.myLooper()之前先查看Looper的prepare方法
 * prepare方法用来创建Looper对象的,然会会将其放置在本地线程中, 在创建之前会
 * 先判断本地线程中是否存在一个Looper, 如果存在会抛出异常!
 * 也就是说,一个线程只能有一个Looper对象,随之只有一个messageQueue!
 */
public static final void prepare() {
    if (sThreadLocal.get() != null) {
        throw new RuntimeException("Only one Looper may be created "
+"per thread");
    }
    sThreadLocal.set(new Looper());
}

/**
 * 从loop方法分析,取得消息队列,然后做死循环从messageQueue中取消息并执行, 
 * 最后将消息重复利用!
 */
public static final void loop() {
    Looper me = myLooper();
    MessageQueue queue = me.mQueue;
    while (true) {
        Message msg = queue.next(); // might block
         //somecode.....  
         msg.recycle();
        }
    }
}

//用于获取本地线程中的Looper对象
public static final Looper myLooper() {
    return (Looper)sThreadLocal.get();
}
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~