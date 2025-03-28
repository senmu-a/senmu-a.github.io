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

**补充：**

**FCP只考虑文本、图片、SVG或非白色canvas等首次渲染的内容。**

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

跟踪用户交互发生（点击、按键、触摸等事件），采集最慢的 10 个交互列表，计算最慢的交互（从10个交互列表中去最后一个和总的交互次数/50对比取最慢的数据），最后上报。

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

前端的性能优化永远围绕小、少来做优化，比如：包体积大需要减小体积、请求数量多需要合并请求减少请求等等。

性能优化的手段：

- 从 webpack 优化 main.js 文件过大来讲
  - 将 webpack 的 runtime 单独提出 inline 到 html 中
  - 如果公司内部建设有稳定的 cdn 可以将 react 内容提取出去放到 cdn 中使用强制缓存加载
  - 使用 splitchunks 拆包，拆包规则：
    - react 生态相关单独拆出去
    - web3 相关库单独拆出去
    - ui 库单独拆出去
    - 业务公用代码拆出去
    - ...一些异步包
    - main.js
  - 开启 service-box 离线缓存，或者可以将跟首屏加载相关资源缓存到 localstorage 中
  - 使用 `quick-link` + `guess.js` 做好预加载
- 还要注意图片资源，可以尽量合并小图片减少请求，使用 base64 来减少体积
- 开启 gzip 减小体积
- 要注意 css、js 资源的加载顺序，css 资源加载会影响 js 资源的加载，js 资源的加载会影响 html 渲染，尽量使用异步的方式
- 从重绘与重排的角度来看，可以使用 `transform`，另外还可以主动开启 gpu 加速，减轻 cpu 计算的负担
- 接下来还可以建设性能监控 SDK 以及平台，收集性能相关指标数据，分析数据，针对性优化

**补充：**

`transform` 在`Compositing`阶段通过GPU直接变换图层，而 `width` 等会触发 `Layout`、`Paint`、`Compositing`

## 性能监控平台的数据采集和清洗你是怎么操作的？

- 凌晨 12 点统一去进行数据清洗，过滤，采集
- 然后将处理好的数据第二天通过接口返回给监控平台来展示数据
- 数据清洗包括：
  - 数据去重
  - 过滤掉无效数据
  - 数据格式化
  - 数据脱敏
  - 异常值处理
  - 数据归一化

讲解清楚 SDK 采集错误、性能、API 等信息然后上报到对应日志数据库，然后在低峰时处理这些数据。

## 如何监控一个接口的返回时间是否出错？

拦截 ajax 和 fetch 请求，从请求发起开启记录，从请求开始响应结束记录，计算耗时是否正常。

## react 有个库叫 @welldone-software/why-did-you-render，它的原理是什么？

他是一个在开发环境使用的可以帮助我们避免不必要的重新渲染的很好的工具库。不过要注意不能在生产环境中使用。

1. 他是 React 的猴子补丁，例如他可以拦截 `setState` 和 `forceUpdate` 等 React 更新的方式
2. 浅比较 props 和 state，他会浅比较组件的 props 和 state 看看是否相等来记录是否该次更新是否多余
3. 日志输出，当监测到有不必要的更新时他会在控制台输入日志
4. 兼容 React 和 React Native

## 可以通过 performance.timing 获得非常多的性能指标，这个你了解多少？目前被废弃了，那最新的 API 有了解吗？

关于旧版的 `performance.timing` 指标，我知道是从 `navigationStart` 开始到 `loadEventEnd` 结束；他表示了一个页面从激活导航开始到加载完成的整个过程。

目前最新的 API 是 `PerformanceNavigationTiming`，他们提供的指标类似，现在属于 `PerformanceObserver` 实例中的类型，监测导航的加载时间。

以下是一些比较关键的方法/指标：

- `navigationStart` 导航激活时间点
- `domContentLoadedEventStart`
- `domContentLoadedEventEnd`
- `domComplete`
- `domInteractive`
- `loadEventStart`
- `loadEventEnd`
- `redirectCount` 重定向的次数
- `notRestoredReasons` 不能使用 `bfcache` 的原因
- `unloadEventLoad`
- `unloadEventUnload`
- `type` 表示当前导航的类型：`navigate`、`reload`、`prerender`、`back_forward`

通过合理的计算使用可以得到具体的性能数据

**补充：**

`PerformanceNavigationTiming` 相比于 `performance.timing` 采用了更现代的Promise-based异步API设计，以及更细粒度的时间点测量。
