---
title: Android自定义控件之布局
date: 2016-03-03 11:15:48
tags:
    - Android
---

Android的自定义控件分为视图控件和组合控件，即View和ViewGroup。部分生命周期为：

```
+-----------+       +----------+       +--------+
| onMeasure | ----> | onLayout | ----> | onDraw |
+-----------+       +----------+       +--------+
```

本篇文章只着重介绍前两个方法，最后一个将在下篇博文讲解。

## 测量(onMeasure)

`onMeasure` 根据父View、自身和子view的一些约束测量出自身大小。

```java
class View {
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
    }
}
```

这里有几个概念：
1. MeasureSpec(高度或宽度的测量规格)

`MeasureSpec` 是父View对子view规格的限制，其中包含 `size` 和 `mode`

2. Measure specification mode(测量规格的模式)

| Mode | 说明 |
| :------------ | :------------ |
| `MeasureSpec.EXACTLY` | 父类强加了一个精确的值(具体值) |
| `MeasureSpec.UNSPECIFIED` | 父类不限定大小(wrap_content) |
| `MeasureSpec.AT_MOST` | 父类设定了一个最大值(match_parent) |

具体的测量过程是：父类通过当前View的width和height计算出 `MeasureSpec` 并传入 `onMeasure(int widthMeasureSpec, int heightMeasureSpec)`，在 `onMeasure` 中通过 `MeasureSpec.getSize(measureSpec)` 和 `MeasureSpec.getMode(measureSpec)` 可得到父View对当前View的大小和mode限制，然后遍历所有的子view获取它们的初始width和height，再通过 `MeasureSpec.makeMeasureSpec(size, mode)` 计算出子view的 `MeasureSpec` ，再调用 `child.measure(widthMeasureSpec, heightMeasureSpec)` 让子view计算出自己的大小，最后通过 `setMeasuredDimension(width, height)` 设置当前View具体的宽高；

## 布局(onLayout)

`onLayout` 根据 `onMeasure` 测量出的大小，对子view进行布局（一般只有ViewGroup才会用到该方法）。
在特定的需求下遍历子view调用 `child.layout(int l, int t, int r, int b)` 即可完成布局编排。

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来直接按照该博文的内容进行直接使用，谢谢~~