---
title: ListView设置适配器+使用inflate填充布局文件
date: 2015-08-03 01:13:09
categories: Code
tags:
---
先看一下通过new的方式创建组键并添加到ListView中

``` java
//伪代码
mListView.setAdapter(new BaseAdapter() {
    /**
     * 重复利用已经创建过的对象, 不会造成内存溢出情况
     */
    public View getView(int position, View convertView, ViewGroup parent) {
        TextView textView;
        if(convertView == null)
            textView = new TextView(MainActivity.this);
        else
            textView = (TextView) convertView;    
        textView.setText("我是自动生成的"+position);
        textView.setTextSize(25);
        return textView;
    }
});
```

<!--more-->

下面使用inflate方式填充布局文件

``` java
public View getView(int position, View convertView, ViewGroup parent) {
    if(convertView == null)
    	convertView = View
		.inflate(MainActivity.this, R.layout.adapter_list_item, null);
	//注意这里是从convertView中查找不是this对象
    TextView textView = (TextView) convertView.findViewById(R.id.tv);
    textView.setText("我是使用inflate创建的"+position);
    return convertView;
}
```


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~