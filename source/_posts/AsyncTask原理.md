---
title: AsyncTask原理
date: 2015-09-19
categories: Code
tags:
	- Android
	- AsyncTask
---

### AsyncTask的来源

我们知道执行耗时任务需要在子线程中去操作, 完成后通过MessageQueue让主线程去更新UI, 不能在子线程操作UI, 原因在Handler的消息机制中已经讲过了; 而每一个子线程的开启和执行都是很消耗资源的, 线程是非常宝贵的资源, 可以进行复用, 避免重复创建和销毁, 于是Google的工程师就开发了一个ThreadPollExecutor(线程池的执行器), AsyncTask的底层使用的就是ThreadPollExecutor, 这样我们只需要使用AsyncTask就不需要再去手动的创建线程了.

<!--more-->

![AsyncTask](http://77fzuw.com1.z0.glb.clouddn.com/292-1.png)

### AsyncTask底层原理

首先从ThreadPollExecutor(线程池的执行器)讲起, 线程池的执行器用于维护开启线程的最大数量(包括核心数量, 线程的空闲时间)和线程队列的最大数量, 当最大数量的线程达到之后, 会将之后的添加到线程的任务队列中去, 如果线程的任务队列的最大值超过后, 程序会抛出运行时异常.

ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue)
corePoolSize: 核心的线程数量
maximumPoolSize: 最大的线程数量
keepAliveTime: 空闲线程(最大线程数量-核心线程数量)的空闲时间, 如果空闲线程的空闲时间超过了就会被线程池中销毁, 核心数量会一直存在, 等待下次复用
unit: 空闲时间的单位
workQueue: 线程队列, 如果所有的线程都在执行任务, 那么这个任务就会被添加到这个任务队列中, 等待空闲的线程到这个任务队列中来取当需要执行线程数量超过(线程队列的数量+最大的线程数量)时, 程序就会抛出运行时异常
ThreadPoolExecutor的继承关系
ThreadPoolExecutor->AbstractExecutorService->ExecutorService->Executors(想到Collections,集合工具类)
Executors有很多的静态方法, 是Google工程师方便我们快速的获取ThreadPoolExecutor的对象

![ThreadPoolExecutor](http://77fzuw.com1.z0.glb.clouddn.com/292-2.png)

### AsyncTask异步任务框架

AsyncTask的底层是基于ThreadPollExecutor

![ThreadPollExecutor](http://77fzuw.com1.z0.glb.clouddn.com/292-3.png)

查阅AsyncTask源码(4.1.2), 有一个默认的TheadPollExecutor:
核心线程数: 5
最大线程数: 128
空闲线程的保持时间:1 s
线程任务队列的最大数:10
Google的工程师方便我们定义自己的ThreadPollExecutor, 添加了一个方法:
executeOnExecutor(Executor exec, Params… params)

#### AsyncTask的优点

简单, 方便, 灵活, 线程复用, 防止重复创建

#### AsyncTask的缺点

* 旧版(以2.3.1源码为例), 线程的核心数量:5, 最大数量:128, 队列的数量:10
  当执行的任务多了, 开的线程就变多了, 相应的, CPU在各个线程之间切换次数增加了, 占用的资源也就变多了.
  新版(以4.4.3源码为例), 线程的核心数量:CPU数量+1, 最大数量:CPU数量的2倍+1, 队列的数量:128, 如图(核心数)
  相比之前明显的这个版本默认的线程池执行器效率提升了.
* 当线程的数量超过线程最大数+线程任务队列数时, 就会发生异常.

![核心数](http://77fzuw.com1.z0.glb.clouddn.com/292-4.png)


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~