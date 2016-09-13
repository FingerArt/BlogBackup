---
title: Java 可变参数
date: 2014-10-18 10:00:29
categories: Code
tags:
	- Java
---

``` java
package other;
public class ChangeableArgument {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
	    demo(1, 2, 3, 4);
	}
	public static void demo(int ...num) {
	    for(int v : num) {
	        System.out.println(v);
	    }
	}
}
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~