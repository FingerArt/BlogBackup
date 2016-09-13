---
title: 了解 Android HandlerThread
date: 2016-09-13 22:47:00
categories: Code
tags: 
	- Android
---

今天在分析 [Picasso](http://github.com/square/picasso) 源码是时看到里面有一个HandlerThread类，之前从未见过，查看HandlerThread源码并跟踪Picasso的用法，理解了这个类的作用。通俗的讲就是这个线程不是用来直接执行自己的run方法的，而是将Message发送到该线程的MessageQueen中，间接工作。

* {% post_link Handler和Message-异步消息机制-1 了解Handler消息机制1 %}
* {% post_link Handler和Message-异步消息机制-2 了解Handler消息机制2 %}

### HandlerThread 源码
> Handy class for starting a new thread that has a looper. The looper can then be used to create handler classes. Note that start() must still be called.

> HandlerThread是一个线程，该线程会创建一个Looper，Looper可用于创建Handler，必需要调用 `start()`

<!--more-->

``` java
@Override
public void run() {
   mTid = Process.myTid();
   Looper.prepare();
   synchronized (this) {
       mLooper = Looper.myLooper();
       notifyAll();
   }
   Process.setThreadPriority(mPriority);
   onLooperPrepared();
   Looper.loop();
   mTid = -1;
}
```

该方法在 `start()` 之后执行，创建Looper、MessageQueen，然后 `loop()` 让这个Looper工作。
### Picasso源码中的使用示例
``` java
//package com.squareup.picasso.Dispatcher

Dispatcher(Context context, ExecutorService service
, Handler mainThreadHandler,
      Downloader downloader, Cache cache, Stats stats) {
    this.dispatcherThread = new DispatcherThread();
    this.dispatcherThread.start();
    Utils.flushStackLocalLeaks(dispatcherThread.getLooper());
    //some code ...
  }
```

``` java
//package com.squareup.picasso.Utils

static void flushStackLocalLeaks(Looper looper) {
    Handler handler = new Handler(looper) {
        @Override public void handleMessage(Message msg) {
        sendMessageDelayed(obtainMessage(), THREAD_LEAK_CLEANING_MS);
        }
    };
    handler.sendMessageDelayed(handler.obtainMessage()
    , THREAD_LEAK_CLEANING_MS);
  }
```

``` java
//package com.squareup.picasso.Dispatcher.DispatcherHandler

private static class DispatcherHandler extends Handler {
    private final Dispatcher dispatcher;

    public DispatcherHandler(Looper looper, Dispatcher dispatcher) {
        super(looper);
        this.dispatcher = dispatcher;
    }

    @Override public void handleMessage(final Message msg) {
        switch (msg.what) {
          case REQUEST_SUBMIT:
          break;
          //some case ...
        }
    }
}
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用，你的一个回复即是对我的最大支持，如有任何疑问请留言。谢谢~~

