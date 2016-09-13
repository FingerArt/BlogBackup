---
title: Android文件命名规范
date: 2015-09-03
categories: Code
tags:
	- Android
	- 规范
---

以下基于 [开发代码规范](/2015/09/03/%E5%BC%80%E5%8F%91%E4%BB%A3%E7%A0%81%E8%A7%84%E8%8C%83/)

### Layout命名

1. contentview命名：layout功能模块描述.xml
   例如：layout_apps_category.xml layout_appsdetail.xml
2. Dialog命名：dialog描述.xml
   例如：dlghint.xml
3. PopupWindow命名：ppw描述.xml
   例如：pop info.xml
4. 列表项命item描述.xml
   例如：itemcity.xml
5．包含项：include模块.xml
   例如：include_head.xml include_bottom.xml

<!--more-->

### 图片命名

#### 由设计人员命名

和设计人员进一步确认

1. 静态图片 模块前缀描述、通用图片 (common)
   例如: main_bg.png login_btn.png manage_download.png common_btn_comfirm.png

2. 有不同状态的图片 模块前缀描述状态、前缀描述_状态
   状态: normal pressed focus checked
   例如: film_buy_btn_normal.png film_buy_btn_pressed.png btn_back_normal.png

#### 由开发人员命名

自定义文件统一放在drawable目录下
如：自定义生成的图片 selector, 控件简称_描述_selector btn_ok_selector

### 控件命名

以下方案确认一种实施

Xml中的控件 id 命名：控件简称功能描述 —— tv login_name

如果功能描述较长，使用 进行分割 —— tv login_student_name

Java文件中控件 变量命名(遵循以上Java命名规范) ：

成员变量 ：m_控件简称+控件描述 —— mTvName
局部变量 ：控件简称+控件描述 —— tvName
控件简称取每个单词首字母, 控件只是一个单词的，取三个字母, 自定义控件或者表上控件命名方式以此类推

|           Widget         |     Name     |
|--------------------------|--------------|
|TextView                  |tv            |
|Button                    |btn           |
|ImageButton               |ib            |
|ImageView                 |iv            |
|CheckBox                  |cb            |
|RadioButton               |rb            |
|AnalogClock               |ac            |
|DigitalClock              |dc            |
|DatePicker                |dp            |
|TimePicker                |tp            |
|ToggleButton              |tb            |
|EditText                  |et            |
|ProgressBar               |pb            |
|SeekBar                   |sb            |
|AutoCompleteTextView      |actv          |
|MultiAutoCompleteTextView |mctv          |
|ZoomControls              |zc            |
|Include                   |inc           |
|VideoView                 |vv            |
|WebView                   |wv            |
|RatingBar                 |rbar          |
|Tab                       |tab           |
|Spinner                   |spn           |
|Chronometer               |cm            |
|ScrollView                |sv            |
|TextSwitcher              |ts            |
|Gallery                   |gal           |
|ImageSwitcher             |is            |
|GridView                  |gv            |
|ListView                  |lv            |
|ExpandableList            |exl           |
|MapView                   |mv            |
|ViewPager                 |vp            |
|ViewFlipper               |vf            |
|LinearLayout              |ll            |
|RelativeLayout            |rl            |
|FrameLayout               |fl            |
|Fragment                  |frg           |


> 注:文章中可能有很多错误，也有可能出现无法使用的情况，因为此技术博文是我的学习笔记，我只是记载一些看到或者想到东西，所以我不推荐你来按照该博文的内容进行直接使用。谢谢~~