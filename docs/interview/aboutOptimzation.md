---
title: 性能优化面试题
date: 2025/03/26
author: senmu
---

## 你所了解到的前端性能指标都有哪些？

前端性能监控无非就是监测页面加载时间、用户交互是否及时，那围绕这两方面 `web-vitals` 制定了一核心的性能指标：

- FCP
- CLS
- INP
- LCP
- TTFB

## 讲讲 FCP 以及它的指标分数段是什么样的？如何提升 FCP？

FCP 是浏览器导航到页面链接开始加载到首个内容的绘制的时间。

核心原理是使用 `PerformanceObserver` 来监测 `paint` 返回 `PerformancePaintTiming` 对象，该对象接口可以分别监测 `First Paint` 和 `First Contentful Paint` 的数据。

测量分为非预渲染和预渲染页面，当然还有一些降噪处理，比如：只处理页面显示状态对于 `hidden` 状态就忽略，还有从 `bfcache` 返回的情况需要重新计算。

指标分数段：（单位: ms）

- 小于 1800 good
- 1800 到 3000 需要提升
- 大于 3000 差

## 讲讲 LCP 以及它的指标分数段是什么样的？如何提升 LCP？

LCP 是浏览器导航到页面链接开始到整个页面渲染完最大内容（图片、文本块、视频）绘制的时间。

核心原理是使用 `PerformanceObserver` 监测 `largest-contentful-paint` 返回 `LargestContentfulPaint` 对象的数据。

LCP 是会随着页面的渲染而不断变化的，所以他需要多次采集，并且上报时机与 FCP 不同，他会在页面状态变为 `hidden`、出现用户交互、从 `bfcache` 返回后强制上报。而对于非 `hidden` 状态他会「尝试上报」。

指标分数段：（单位: ms）

- 小于 2200 good
- 2200 到 4000 需要提升
- 大于 4000 差

## CLS 指标

CLS 是页面整个生命周期内，累计发生的布局偏移量。

核心原理是使用 `PerformanceObserver` 监测 `layout-shift` 返回 `LayoutShift` 对象的数据。

注意，CLS 需要发生在 FCP 发生后才去采集。测量方法是采用「会话窗口」的算法来计算，即：

- 分组，时间上接近的布局偏移分为一组
- 计时，总时间不超过 5s，相邻的布局偏移不超过 1s
- 取最大值，最终取所有分组/窗口的最大值

上报时机是：

- 出现最差的布局偏移，尝试上报
- 页面隐藏，强制上报
- 从 `bfcache` 返回，尝试上报
- 不满足以上条件，最后也会在异步任务中尝试上报

指标分数段：

- 0.1 good
- 0.1 到 0.25 需要提升
- 大于 0.25 差

## INP 指标

INP 是统计发生用户交互到页面绘制完成的时间。

核心原理是使用 `PerformanceObserver` 监测 `event` 返回 `PerformanceEventTiming` 对象的数据。

跟踪用户交互发生（点击、按键、触摸等事件），采集最慢的 10 个交互列表，计算最慢的交互，最后上报。

上报时机：

- 计算到最慢的数据，尝试上报
- 页面隐藏，强制上报
- 从 `bfcache` 返回，重置交互记录、初始化指标，准备上报

指标分数段：（单位: ms）

- 小于 200 good
- 200 到 500 需要提升
- 大于 500 差

## TTFB 指标

TTFB 是统计发起请求到出现首字节响应的时间。

核心原理是使用 `PerformanceNavigationTiming` 对象，统计 `responseStart` 减去 `activationStart` 的时间。包括：

- 重定向时间
- Service Worker 启动时间（如果适用）
- DNS 查找
- 连接和 TLS 协商
- 请求，直到响应的第一个字节到达

上报时机也比较简单：统计到响应首字节返回，立马强制上报；或者是从 `bfcache` 返回，强制上报。

指标分数段：（单位: ms）

- 小于 800 good
- 800 到 1800 需要提升
- 大于 1800 差

## 说说你所了解到的性能优化的手段

## 性能监控平台的数据采集和清洗你是怎么操作的？

## 如何监控一个接口的返回时间是否出错？

## react 有个库叫 @welldone-software/why-did-you-render，它的原理是什么？

## 可以通过 performance.timing 获得非常多的性能指标，这个你了解多少？目前被废弃了，那最新的 API 有了解吗？
