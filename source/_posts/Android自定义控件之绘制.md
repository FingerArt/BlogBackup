---
title: Android自定义控件之绘制
date: 2016-03-03 15:13:57
tags:
    - Android
---

在自定义控件中除了对View的编排之外最重要的就是绘制了，本篇文章主要讲View的绘制。

## Canvas

### Canvas的坐标系

```text
    |
  0 |1 2 3 4 5 n
----+------------>
  1 |           x
  2 |
  3 |
  4 |
  n |y
```

### 颜色填充(Canvas.drawColor)

``` java
Canvas.drawColor(@ColorInt int color)
```

### 画圆(Canvas.drawCircle)

``` java
Canvas.drawCircle(float centerX, float centerY, float radius, Paint paint)
```

### 矩形

``` java
Canvas.drawRect(float left, float top, float right, float bottom, Paint paint)
```
### 画点

``` java
Canvas.drawPoint(float x, float y, Paint paint)

/**
* offset: 跳过前面的offset个点
* count: 只绘制count个点
*/
Canvas.drawPoints(float[] pts, int offset, int count, Paint paint)

Canvas.drawPoints(float[] pts, Paint paint)
```

### 画椭圆

``` java
Canvas.drawOval(float left, float top, float right, float bottom, Paint paint)
```

### 画线

``` java
Canvas.drawLine(float startX, float startY, float stopX, float stopY, Paint paint) 
Canvas.drawLines(float[] pts, int offset, int count, Paint paint)
Canvas.drawLines(float[] pts, Paint paint)
```

### 画圆角矩形

``` java
/**
* rx: 圆角的横向半径
* ry: 圆角的纵向半径
*/
Canvas.drawRoundRect(float left, float top, float right, float bottom, float rx, float ry, Paint paint)
```

### 绘制弧形或扇形

``` java
/**
* startAngle: 起始角度
* sweepAngle: 扫过的角度
* useCenter: 是否连接到圆心
*/
Canvas.drawArc(float left, float top, float right, float bottom, float startAngle, float sweepAngle, boolean useCenter, Paint paint) 
```

### 绘制路径（自定义图形）

``` java
Canvas.drawPath(Path path, Paint paint)
```

### 路径

``` java
/**
* 相对于Canvas坐标原点，将起点移动到指定位置
*/
Path.moveTo(float x, float y)
/**
* 相对于最后一个点，将起点移动到指定位置
*/
rMoveTo(float dx, float dy)
```

#### 线

``` java
/**
* 从最后一个点到指定的点添加一条直线，如果没有调用moveTo，会从(0,0)开始绘制
*/
Path.lineTo(float x, float y)
/**
* 相对于最后一个点到指定点添加一个直线，而不是相对于Canvas的坐标点。
*/
Path.rLineTo(float dx, float dy)
```

#### 矩形
``` java
/**
* 向路径中添加一个封闭的矩形轮廓
* dir: 路径方向
*/
Path.addRect(RectF rect, Direction dir)
Path.addRect(float left, float top, float right, float bottom, Direction dir)
```

#### 圆形

``` java
/**
* 向路径中添加一个封闭的圆形轮廓
* dir: 路径方向
*/
Path.addCircle(float x, float y, float radius, Direction dir)
```

#### 弧形

``` java
/**
* 向路径中添加个圆弧作为新轮廓
*/
Path.addArc(RectF oval, float startAngle, float sweepAngle)
Path.addArc(float left, float top, float right, float bottom, float startAngle, float sweepAngle)

/**
* 向路径中添加个圆弧作为新轮廓
* forceMoveTo: 如果路径不为空，决定圆弧的起始点与路径起始点是否不进行连接
*/
Path.arcTo(float left, float top, float right, float bottom, float startAngle, float sweepAngle, boolean forceMoveTo)
Path.arcTo(RectF oval, float startAngle, float sweepAngle, boolean forceMoveTo)
Path.arcTo(RectF oval, float startAngle, float sweepAngle)
```

#### 椭圆

``` java
/**
* 向路径中添加一个封闭的椭圆轮廓
*/
Path.addOval(RectF oval, Direction dir)
Path.addOval(float left, float top, float right, float bottom, Direction dir)
````

#### 圆角矩形

``` java
/**
* 向路径中添加一个封闭的圆角矩形轮廓
* radii: Array of 8 values, 4 pairs of [X,Y] radii
*/
Path.addRoundRect(RectF rect, float rx, float ry, Direction dir)
Path.addRoundRect(float left, float top, float right, float bottom, float rx, float ry, Direction dir)
Path.addRoundRect(RectF rect, float[] radii, Direction dir)
Path.addRoundRect(float left, float top, float right, float bottom, float[] radii, Direction dir)
````

#### 贝赛尔曲线

``` java
Path.quadTo(float x1, float y1, float x2, float y2)
Path.cubicTo(float x1, float y1, float x2, float y2, float x3, float y3)
```

#### 路径叠加

``` java
Path.setFillType(Path.FillType ft)
```

| FillType | 说明 |
| :------------ | :------------ |
| `EVEN_ODD` | 奇偶原则，由奇数成组成则会被涂色 |
| `WINDING` | 非零环绕数原则，顺时针为+1，逆时针为-1，不为0会被涂色 |
| `INVERSE_WINDING` | 与`WINDING`相反 |
| `INVERSE_EVEN_ODD` | 与`EVEN_ODD`相反 |

## Paint
即画笔，用于设置颜色画笔大小等。

### 设置颜色

``` java
Paint.setColor(int color)
```

### 绘制模式
``` java
Paint.setStyle(Paint.Style style)
```

| Style | 说明 |
| :------------ | :------------ |
| `FILL` | 填充模式 |
| `STROKE` | 描边模式 |
| `FILL_AND_STROKE` | 填充+描边模式 |

### 画笔大小

``` java
Paint.setStrokeWidth(float width)
```

### 抗锯齿

``` java
Paint paint = new Paint(Paint.ANTI_ALIAS_FLAG);
//或
Paint.setAntiAlias(boolean aa)
```










> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来直接按照该博文的内容进行直接使用，谢谢~~