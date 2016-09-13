---
title: 内省Introspector
date: 2014-10-27 22:15:55
categories: Code
tags:
	- Java
---
``` java
package other;
import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
内省(Introspector)
为什么要学习内省
开发框架时，经常使用java对象的属性来封装程序的数据，每次都是用反射技术完成此类
操作过于麻烦，所以sun公司开发了一套API，专门用于操作java对象的属性。
内省访问JavaBean属性的两种方式
通过propertyDescriptor类操作BeanInfo，然后通过BeanInfo来获取属性的描述器(PropertyDescriptor)
通过这个属性描述器就可以获取某个属性对应的getter/setter方法，然后通过反射机制来调用这些方法
*/
public class IntrospectorDemo {

	/**
	@param args
	@throws IntrospectionException
	@throws InvocationTargetException
	@throws IllegalArgumentException
	@throws IllegalAccessException
	*/
	public static void main(String[] args) throws IntrospectionException, IllegalAccessException, 	IllegalArgumentException, InvocationTargetException {
		test2();
	}

	//遍历bean的所有属性
	public static void test() throws IntrospectionException {
		BeanInfo info = Introspector.getBeanInfo(Person.class, Object.class);//getBeanInfo可传入其他类class文件排除其属性
		PropertyDescriptor[] pd = info.getPropertyDescriptors();//属性描述器
		for( PropertyDescriptor v : pd) {
			System.out.println(v.getName());
		}
	}
	
	//操纵bean的指定属性
	public static void test2() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, IntrospectionException {
		Person p = new Person();
		PropertyDescriptor pd = new PropertyDescriptor(“name”, Person.class);
	
		//设置属性
		Method m = pd.getWriteMethod();
		m.invoke(p, “赵橙”);
	
		//获取属性
		Method mr = pd.getReadMethod();
		System.out.print(mr.invoke(p, null));
		
		//获取字段类型
		System.out.print(pd.getPropertyType().toString());
	}
}

class Person { //javaBean
	private String name ;
	private String password ;
	
	public String getName() {
	    return name;
	}
	public void setName(String name) {
	    this.name = name;
	}
	public String getPassword() {
	    return password;
	}
	public void setPassword(String password) {
	    this.password = password;
	}
}
```

<!--more-->

> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~