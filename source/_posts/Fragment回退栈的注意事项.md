---
title: Fragment回退栈的注意事项
date: 2014-08-09 01:29:04
categories: Code
tags:
	- Android
---
Fragment回退栈与非回退栈的混用, 会造成视图的重叠.

在Fragment的回退栈之后, replace了一个非回退栈的Fragment, 就会造成在回退的时候, 这个Fragment一直是可见的. 只有当回退栈都退出完毕了, 这个Fragment才会被销毁.

在做Fragment的回退的时候, 最好不要再填充非回退栈的Fragment.


在清除Fragment的时候有很多的参数, 这是每个参数的具体用法:


sfm. popBackStackImmediate (Son1Fragment . class. getName() , FragmentManager .POP_BACK_STACK_INCLUSIVE ); //移除至设置的Fragment(包含本身)

sfm. popBackStackImmediate (Son1Fragment . class. getName() , 0) ;//保留顶层的Fragment(保留本身)

sfm. popBackStackImmediate (null , 1) ;//移除所有的Fragment

sfm. popBackStackImmediate (null , 0) ;//与无参一样移除上一个Fragment

sfm. popBackStack (null , 1) ;//移除所有的Fragment

sfm. popBackStack (null , 0) ;//移除上一个Fragment
sfm. popBackStack (); //移除上一个Fragment

sfm. popBackStackImmediate (); //移除上一个Fragment