---
title: Handler和Message-异步消息机制-1
date: 2015-08-08 01:02:02
categories: Code
tags:
	- Android
	- Handler
---

### 消息机制的来源

首先从应用场景说起, 当我先想从远程服务器获取到一个资源, 从Android4.0开始, 在Main线程中不允许使用获取远端数据, 原因是如果资源响应时间过长, 就相当于在main线程中进行了sleep, 用户界面会处于卡死状态. 所有的可视化程序, 底层都是一个循环在一直监听用户的操作时间, 所以, 一旦在main线程中sleep, 用户就不能在界面进行操作了!

<!--more-->

既然不能在main线程中访问远端数据, 当然是在子线程中进行操作了. 当我们在子线程中获取到远端的数据之后, 通过我们就需要将数据显示到界面上去给用户, 但这里Android又有了限制, 不能再子线程中直接对视图进行任何操作, 视图由谁(Main线程)创建就由谁修改. 此时的用户界面就相当于是一个共享资源一样, 线程有很多, 为了保证改变视图的有序性和安全性, Android就使用了消息机制.

Handler, Android中有一个消息处理器, 只需要在子线程中将处理的消息发送给Handler的消息队列(保证了多线程的安全线), handler中有一个一直循环的looper, 一个一个取出消息队列中的消息, 然后调用handler的具体处理操作, 进行用户视图的改变!

![](http://77fzuw.com1.z0.glb.clouddn.com/252-Handler-%E6%B6%88%E6%81%AF%E6%9C%BA%E5%88%B6.png)

```java
private Handler handler = new Handler(){
    public void handleMessage(android.os.Message msg) {
        Toast.makeText(MainActivity.this, msg.obj.toString(), 
Toast.LENGTH_SHORT).show();
    }
};

private void login() {
    final String username = mUsernameEt.getText().toString().trim();
    final String password = mPasswordEt.getText().toString().trim();

    new Thread() {
        public void run() {
            String encode = URLEncodedUtils.format(parameters , "UTF-8");
            String path = "http://192.168.1.199:99/study/AndroidRequest"
+encode;
            try {
                URL url = new URL(path);
                HttpURLConnection connection = 
(HttpURLConnection) url.openConnection();
                connection.setReadTimeout(5000);
                connection.setConnectTimeout(5000);
                connection.setRequestMethod("GET");

                InputStream is = connection.getInputStream();

                ByteArrayOutputStream outputStream = 
new ByteArrayOutputStream();

                byte[] b = new byte[1024];
                for(int len = 0 ; (len = is.read(b, 0, b.length)) != -1 ; )
                    outputStream.write(b, 0, len);

                toast(outputStream.toString());
            } catch (final Exception e) {
                toast(e.getMessage());
            }
        }
    }.start();
}
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~