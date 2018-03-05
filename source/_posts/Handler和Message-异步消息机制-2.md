---
title: Handler和Message-异步消息机制-2
date: 2015-08-10
categories: Code
tags:
	- Android
	- Handler
---

上次简单的介绍了handler的消息机制的应用场景, handler将message发送给messageQueue, looper不停的在messageQueue中取出message并执行相应的操作。

这次我们从码Android的底层源分析Handler的消息机制原理。

<!--more-->
![Handler消息机制](http://77fzuw.com1.z0.glb.clouddn.com/262-Handler-%E6%B6%88%E6%81%AF%E6%9C%BA%E5%88%B6.png)

首先, 我们先讲Handler和Message之间的联系, Message是传递消息的载体, Handler即是消息发送者也是消息处理者。

```java
class Handler {
    boolean sendMessageAtTime(Message msg, long uptimeMillis) {
        MessageQueue queue = mQueue;
        return enqueueMessage(queue, msg, uptimeMillis);
    }
    
    boolean enqueueMessage(MessageQueue queue, Message msg, long uptimeMillis) {
        msg.target = this;
        return queue.enqueueMessage(msg, uptimeMillis);
    }
}

class Looper {
    public static void loop() {
        Looper me = myLooper();
        MessageQueue queue = me.mQueue;
        for (;;) {
            Message msg = queue.next(); // might block
            msg.target.dispatchMessage(msg);
        }
    }
}
```

从源码知道, Handler是将message发送到MessageQueue中的, 然后Looper会一直循环处理MessageQueue中的message中的.那么Looper和MessageQueue是怎么创建的呢?

```java
class Looper {
    final MessageQueue mQueue;
    static final ThreadLocal<Looper> sThreadLocal = new ThreadLocal<>();
    
    private Looper() {
        mQueue = new MessageQueue(quitAllowed);
    }
    
    void prepare() {
        sThreadLocal.set(new Looper());
    }
}

class Handler {
    /**
     * Handler在创建对象的时候先获取了一个Looper并从
     * Looper中取出了Looper所对应的MessageQueue
     */
    Handler() {
        mLooper = Looper.myLooper();
        mQueue = mLooper.mQueue;
    }
}
```

Looper的构造函数是private的, 目的是让我们调用它的prepare方法, 在prepare方法中首先会获取保存在本地线程中的Looper对象, 如果存在会抛出异常不让我们再创建, 如果不存在会创建一个Looper对象并保存在本地线程中, 也就是说: **一个线程中只会有一个Looper**。
在Looper的构造函数中创建了一个MessageQueue, 保存在Looper对象中, 同时也说明了: **一个线程中只会有一个MessageQueue**。
通过一个Looper和一个MessageQueue解决了多线程访问共享数据的安全问题。
创建Handler的时候, Handler内部会去获取存放于本地线程中的Looper, 并且会从Looper中获取MessageQueue, 当Handler发送消息时, 就会向这个MessageQueue中发送消息了。

## MessageQueue 工作原理

在MessageQueue中，Message之间通过链表结构来存储消息。

```java
class MessageQueue {
    Message mMessages;
    
    /**
    * 消息入队
    */
    boolean enqueueMessage(Message msg, long when) {
        Message p = mMessages;
        msg.next = p;
        mMessages = msg;
        if (needWake) {
            nativeWake(mPtr);//唤醒
        }
        return true;
    }
    
    //取消息
    Message next() {
        for (;;) {
            if (nextPollTimeoutMillis != 0) {
                Binder.flushPendingCommands();
            }
            nativePollOnce(ptr, nextPollTimeoutMillis);//epoll机制
            Message prevMsg = null;
            Message msg = mMessages;
            if (msg != null) {
                if (now < msg.when) {
                    // Next message is not ready.  Set a timeout to wake up when it is ready.
                    nextPollTimeoutMillis = (int) Math.min(msg.when - now, Integer.MAX_VALUE);
                } else {
                    // Got a message.
                    mMessages = msg.next;
                    msg.next = null;
                    return msg;
                }
            } else {
                // No more messages.将一直阻塞
                nextPollTimeoutMillis = -1;
            }
        }
    }
}

class Message {
    Message next;
}
```

再看下Android中的UI线程是如何使用的

```java
class ActivityThread {
    public static void main(String[] args) {
        Looper.prepareMainLooper();
        Looper.loop();
    }
}
```

关于如何在其它线程使用Handler消息机制可通过` HandlerThread` 实现({% post_link Handler和Message-异步消息机制-1 了解Handler消息机制1 %})。

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~