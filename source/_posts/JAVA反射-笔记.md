---
title: JAVA反射-笔记
date: 2014-10-19 23:39:36
categories: Code
tags:
	- Java
	- 反射
---

``` java
package other;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * 反射，加载类并解剖出类的各个组成部分
 * 	getConstrctors()		获取所有public权限的构造函数、方法、字段
 * 	getDeclaredConstrctors()	获取所有声明的构造函数、方法、字段
 * 
 * 	Method
 * 	Field
 * @author Administrator
 */
class ReflectDemo {
	/**
	 * 获取类字节码文件的三种方法
	 * @throws Exception 
	 */
	private static void getFlectClass() throws Exception {
		new Demo(0).getClass();
		Demo.class.getName();

		Class.forName("other.Demo").getName();//反射技术获取
	}

	/**
	 * 创建实例对象
	 * @throws Exception 
	 */
	public void getInstance() throws Exception {
		//使用newInstance()获取类的实例对象，会抛出异常
		Class<?> demoClass = Class.forName("other.Demo");
		demoClass.newInstance();//等效于使用构造函数传入null

		//通过Sting.class指向对应参数的构造函数
		Constructor<?> c = demoClass.getConstructor(String.class);
		//最后通过构造函数对象创建对应的类对象
		Demo d = (Demo) c.newInstance("hello");
	}

	/**
	 * 暴力反射
	 * @throws Exception 
	 */
	public void getConstructForPrivate() throws Exception {
		Class<?> d = Class.forName("other.Demo");

		Constructor<?> c = d.getDeclaredConstructor(boolean.class);
		c.setAccessible(true);//暴力反射，取消访问控制权限检测
		Demo demo = (Demo) c.newInstance(true);
	}

	/**
	 * 方法
	 * @throws Exception 
	 */
	public void getMethod() throws Exception {
		Class<?> d = Class.forName("other.Demo");
		Object obj = d.newInstance();

		Method test = d.getMethod("test", null);
		test.invoke(obj, null);	//运行取得的test方法

//		main方法，JDK1.4将传入的数组每个值作为参数，1.5为多参数，直接传入数组的话会出现参数个数异常

		Method m = d.getMethod("main", String[].class);
		m.invoke(null, new Object[]{new String[]{"aa","bb"}});//解决1.5对1.4的兼容性：方式1
		m.invoke(null, (Object)new String[]{"aa", "bb"});//解决1.5.对1.4的兼容性：方式2
	}

	/**
	 * 获取字段
	 * @throws Exception 
	 */
	public void getField() throws Exception {
		Class<?> d = Class.forName("other.Demo");

		Object obj = d.newInstance();

		Field[] field = d.getFields();//获取public权限的字段
		for(Field f : field) {
			String fieldStr = f.getName();//字段名
			String fieldVal = f.get(obj).toString();//取值
			String fieldTyp = f.getType().toString();//类型
			System.out.println(fieldTyp+ " " + fieldStr +" = "+ fieldVal);
		}
	}

	/**
	 * 使用反射获取Demo类的构造函数方法;
	 * @throws Exception 
	 */
	public void getConstructors() throws Exception {
		Class<?> d = Class.forName("other.Demo");
		Constructor<?>[] constructor = d.getDeclaredConstructors();//获取一个装载所有存在的构造函数的数组(包括私有)
		String name = null;
		for(Constructor<?> c : constructor) {
			name = c.getName();//构造函数名
			System.out.print(Modifier.toString(c.getModifiers())+ " " + name +" (");//构造函数的全县修饰符
			for(Class<?> p : c.getParameterTypes()) {
				System.out.print(" "+p.getName());//遍历参数
			}
			System.out.println(" )");
		}
	}
}
```

<!--more-->

``` java
package other;

class Demo{
	public String str = "this is String!";
	private String priStr = "this is private String";

	public static void main(String[] args) {
		System.out.println("run main.");
	}
	public Demo() {
		System.out.println("not argement Construct");
	}
	public Demo(String a, int b) {
		System.out.println("heeh");
	}
	public Demo(String s) {
		System.out.println(s);
	}
	public Demo(int i) {
		System.out.println(i);
	}
	private Demo(boolean f) {
		System.out.println(f);
	}
	public void test() {
		System.out.println("test");
	}
	private void privateMethod() {
		System.out.println("this is private method!");
	}
}
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~