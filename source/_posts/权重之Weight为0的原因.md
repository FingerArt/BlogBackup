---
title: 权重之Weight为0的原因
date: 2014-08-09 17:33:41
categories: Code
tags:
	- Android
---
线性布局中Child的最终宽度计算公式:

Child宽度 + 线性布局的剩余宽度 * Child权重数 / 线性布局的总权重数

最终, 要让宽度根据权重分配, 就让Child的宽度为0, 就占用了相应权重的相对于线性布局的宽度.