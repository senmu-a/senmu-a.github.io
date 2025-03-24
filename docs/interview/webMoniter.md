---
title: 性能监控
date: 2024/03/24
author: senmu
---

## 什么是性能监控？

性能监控简单来说就是通过一个 SDK 进行零负担的监测网站运行的性能情况以及报错等等。

## 为什么要做性能监控？

性能监控旨在收集网页的性能信息，然后分析信息进行改进提升，最终提升用户留存率等等。

## 怎样做性能监控？

1. 定好需要统计的指标，例如（FP、FCP、CLS、INP等）
2. 写一个 SDK 进行指标的统计、收集、上报
   1. 可以参考 `web-vitals` 库
   2. 注意做好兜底等边缘情况
   3. 注意性能问题
3. 建设/使用第三方成熟的数据处理平台进行数据的维护
   1. 收集数据
   2. 清洗脏数据，但是注意不要丢掉，单独存放进行分析是否有价值
   3. 存储正常数据
   4. 通过监控平台展示

如果要做错误等回放功能，可以考虑 [`rrweb`](https://github.com/rrweb-io/rrweb?tab=readme-ov-file)

## FCP（首次有内容的绘制）指标

- 核心部分
  - 利用 [`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver) API
  - 监测 `paint`
    - 对于 FCP，`entry.name` 为 `first-contentful-paint`
    - 对于 FP，`entry.name` 为 `first-paint`
  - 计算指标
  - 上报
- 处理边缘情况
  - 预渲染
  - 页面是 `hidden` 状态
  - bfCache
