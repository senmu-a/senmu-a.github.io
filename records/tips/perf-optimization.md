---
title: 性能优化
date: 2024/03/22
author: senmu
---

## 一、性能优化入门

1. 解决 `main.js` 打包出来体积太大的问题
   1. 打开 `webpack-bundle-analyzer` 包分析工具
   2. 移除公共库（`react`、`react-dom`、`react-router-dom`），这步的前提是公司如果有自己稳定的 cdn 就可以，然后使用强缓存
   3. 如果第二步无法满足还可以进行 `splitchunks` 分包，下面是参考的分包，如果使用的是 http1.1 那么最好是抽离成 5 个 js 资源最好了（因为浏览器对于 http1.1 且开启 keep-alive 的情况下最多并发请求 5 个资源），如果是 http2 的话就无所谓了
      1. runtime inline 到 html 中，减少请求
      2. react libs 抽离出来
      3. router 相关的库抽离出来
      4. UI 组件库抽离出来
      5. web3 相关的库抽离出来
      6. 业务公用的代码抽离出来
      7. main.js
   4. 如果为了极致的秒开的话可以将 main.js 等资源通过离线缓存起来
      1. service box
      2. localstorage - 将生成的 manifest 映射存储到 localstorage 中，然后内部写一个启动逻辑来判断是否可以使用离线缓存
   5. 增加 `pre` 预加载
      1. 可以固定将关键的 react libs、router 预加载
      2. 也可以使用 `quick-link` + `guess.js` 方案更灵活的预加载
2. 明白 `async`、`defer` 等请求资源的方式

## 二、性能优化进阶

### 2.1 页面渲染流程

css 加载会阻塞 html 的渲染也会阻塞后面 js 语句的执行

### 2.2 重排重绘

### 2.3 使用 gpu 进行加速

## 三、性能优化深水区

### 3.1 监控指标

### 3.2 监控 SDK

### 3.2 日志上报

### 3.3 日志清洗、日志存储

### 3.4 监控平台展示日志

...
