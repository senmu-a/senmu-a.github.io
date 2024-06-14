---
title: 浏览器的工作原理
date: 2024/05/27
author: senmu
---

## 基础架构

组成浏览器的基础组件包括：

1. 界面 — 包括我们肉眼可以看到的整个浏览器
2. 浏览器引擎 — 协调界面与渲染引擎之间的操作
3. 渲染引擎 — 负责将请求到的内容进行渲染展示。（HTML、PDF等等）
4. 网络 — 对于 HTTP 请求等网络调用
5. 界面后端 — 底层基本组件的绘制等。可以操作系统界面方法。
6. 数据存储 — 这是一个持久层。浏览器可能需要在本地保存各种数据，例如 Cookie、localStorage、IndexedDB 等。
7. javascript 解释器 — 用于解析和执行 js 代码。

![browser-components](../../.vuepress/public/browser-components.png)

