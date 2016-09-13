---
title: 使用Android的adb命令录制视频
date: 2015-11-07
categories: Code
tags: 
	- Android
	- ADB
---
之前一直寻找录制的软件, 并且还有一些模拟器也有自带的, 其实在 Android4.4 Kitkat(API level 19)以上 就提供了这样的功能, 在Android Studio 中也有一个录屏的功能按钮.

```
shell@sltechn:/ $ screenrecord --help

Usage: screenrecord [options] <filename>

Records the device's display to a .mp4 file.

Options:
--size WIDTHxHEIGHT
    Set the video size, e.g. "1280x720".  Default is the device's main
    display resolution (if supported), 1280x720 if not.  For best results,
    use a size supported by the AVC encoder.
--bit-rate RATE
    Set the video bit rate, in megabits per second.  Default 4Mbps.
--time-limit TIME
    Set the maximum recording time, in seconds.  Default / maximum is 180.
--rotate
    Rotate the output 90 degrees.
--verbose
    Display interesting information on stdout.
--help
    Show this message.

Recording continues until Ctrl-C is hit or the time limit is reached.
```

<!-- more -->

```
/* 
 * 录制
 * 录制的格式是 .mp4
 * Ctrl+C 提前结束视频录制
 */
shell@sltechn:/ $ screenrecord /sdcard/FingerArt.mp4

/* 
 * 分辨率设置
 */
shell@sltechn:/ $ screenrecord --size 1280*720 /sdcard/FingerArt.mp4

/* 
 * 比特率设置
 * 默认是4Mbps, 比特率越大越清晰, 文件也会越大
 */
shell@sltechn:/ $ screenrecord --bit-rate 2000000 /sdcard/FingerArt.mp4

/* 
 * 录制时间设置
 * 默认是180s, Ctrl+C提前停止录制
 */
shell@sltechn:/ $ screenrecord --time-limit 300 /sdcard/FingerArt.mp4
```

该方式不能录制音频.

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你完全按照该博文的内容进行直接使用，你的一个回复即是对我的最大支持，如有任何疑问请留言。谢谢~~