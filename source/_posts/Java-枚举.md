---
title: Java 枚举
date: 2014-10-18 16:59:03
categories: Code
tags:
	- Java
---
``` java
/*
 JDK5.0前的枚举
 */
class Grade {
    private Grade() {};
    public static final Grade A = new Grade();
    public static final Grade B = new Grade();
}

//——————————
package other;
public class EnumDemo {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
	    System.out.println(Grade.A.getValue());
	    System.out.println(Grade.B.nameG());
	    //将字符串转为枚举型(检测该字符串是否是枚举中的值)
	    try {
	        Grade g = Grade.valueOf(Grade.class , "B");
	    }catch(IllegalArgumentException e) {
	        System.out.println(e.getMessage());
	    }
	    //获取所有的枚举常量
	    Grade[] gArr = Grade.values();
	}
}

/**

带抽象类的枚举
*/
enum Grade {
	A(“100-90”) {
		public String nameG() {
		    return "优";
		}
	},
	B(“89-80”) {
	public String nameG() {
	    return "良";
	}
	};
	private String value;
	private Grade(String value) {
		this.value = value;
	}
	public String getValue() {
		return this.value;
	}
	public abstract String nameG();
}
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~