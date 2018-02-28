---
title: Android事件传递机制分析
date: 2016-03-02 15:17:54
tags:
    - Android
---

一直想写一篇关于事件传递的分析博文，因工作的原因，现在才有时间。

当前博文的源码分析是参考SDK19，示例代码是精简过的伪代码，具体以源码为准。

## 事件的开始

用户触摸手机屏幕时，系统会将事件传递给当前 `Activity`，在 `dispatchTouchEvent` 中调用当前 `Window(PhoneWindow).superDispatchTouchEvent` 方法将事件继续往下传递。

```java
class Activity {
    boolean dispatchTouchEvent(MotionEvent ev) {
        if (getWindow().superDispatchTouchEvent(ev)) {
            return true;
        }
        return onTouchEvent(ev);
    }
}
```

<!--more-->

在 `PhoneWindow` 中，将事件向下传递给了 `DecorView.superDispatchTouchEvent`；DecorView实质上是一个ViewGroup，所以将其事件通过 `dispatchTouchEvent` 进行了继续传递。

```java
class DecorView extends FrameLayout {
    boolean superDispatchTouchEvent(MotionEvent event) {
        return super.dispatchTouchEvent(event);
    }
}
```

## View与ViewGroup对事件的处理

Android视图主要分为 `View` 与 `ViewGroup`，当DecorView `DecorView.superDispatchTouchEvent` 接收到事件后，询问 `onInterceptTouchEvent` 是否拦截该事件；
1. 拦截
    当事件被拦截后，会调用 `dispatchTransformedTouchEvent(ev, canceled, null,TouchTarget.ALL_POINTER_IDS)` 传入的子view为 `null`，该方法的内部会调父类 `View#dispatchTouchEvent`，以此结束本次事件的传递。
2. 未拦截
    遍历所有的子view，此时子view可能是 `View` 或 `ViewGroup`，调用子view的 `dispatchTouchEvent` 方法，如果某个子view返回了 `true`，会调用 `addTouchTarget` 记录下那个子view以便后续的触摸事件直接传递给该子view。

```java
class ViewGroup extends View {

    //分发事件
    boolean dispatchTouchEvent(MotionEvent ev) {
        int action = ev.getAction();
        int actionMasked = action & MotionEvent.ACTION_MASK;

        boolean intercepted, handled;
        if (actionMasked == MotionEvent.ACTION_DOWN || mFirstTouchTarget != null) {
            intercepted = onInterceptTouchEvent(ev);//是否拦截这个事件
        } else {
            intercepted = true;
        }

        //遍历子view并传递事件
        if (!intercepted) {
            for (int i = 0; i < childrenCount; i++) {
                View child = children[i];
                if (dispatchTransformedTouchEvent(ev, false, child, idBitsToAssign)) {//某个子view返回true则停止遍历
                    handled = true;
                    newTouchTarget = addTouchTarget(child, idBitsToAssign);//记录该子view
                    break;
                }
            }
        }

        if (mFirstTouchTarget == null) {
            //如果事件被拦截或者没有子view要处理该事件，分发事件，但子view为null，会调用父类 View#dispatchTouchEvent
            handled = dispatchTransformedTouchEvent(ev, canceled, null,TouchTarget.ALL_POINTER_IDS);
        } else {
            //如果有子view需要处理的，直接向该子view传递事件
            TouchTarget target = mFirstTouchTarget;
            while (target != null) {
                if (!handled)  {
                    if (dispatchTransformedTouchEvent(ev, cancelChild,
                            target.child, target.pointerIdBits)) {
                        handled = true;
                    }
                }
                target = target.next;
            }
        }

        return handled;
    }

    //是否拦截事件
    boolean onInterceptTouchEvent(MotionEvent ev) {
    }

    //向子view传递事件
    boolean dispatchTransformedTouchEvent(MotionEvent event, boolean cancel,
                View child, int desiredPointerIdBits) {
        if (child == null) {
            handled = super.dispatchTouchEvent(event);//View#dispatchTouchEvent
        } else {
            handled = child.dispatchTouchEvent(event);
        }
        return handled;
    }

    //记录需要处理的子view
    TouchTarget addTouchTarget(View child, int pointerIdBits) {
        TouchTarget target = TouchTarget.obtain(child, pointerIdBits);
        mFirstTouchTarget = target;
        return target;
    }
}
```

```java
class View {
    boolean dispatchTouchEvent(MotionEvent event) {
        if (onTouchEvent(event)) {
            result = true;
        }
        return result;
    }

    boolean onTouchEvent(MotionEvent event) {
    }
}
```

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来直接按照该博文的内容进行直接使用，谢谢~~