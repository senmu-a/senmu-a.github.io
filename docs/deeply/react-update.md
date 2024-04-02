---
title: React 更新与重新渲染
date: 2024/03/31
author: senmu
---

## 前言

众所周知，React 存在 Class 组件和 Function 组件，从官方给的 API 来看 Class 组件的更新使用 `this.setState()`、`this.forceUpdate()`，Function 组件使用 Hook 的形势来实现更新比如：`useState`、`useReducer`。

接下来就从 Class 组件开始看起。

## `this.setState()` 的更新

### 更新流程

1. 调用 Component 上的 `SetState` 方法
2. 调用 updater 上的 `enqueueSetState` 方法，如下图：
![classUpdater](/classUpdater.jpg)
3. 设置好更新队列后调度执行

### 如何处理多次更新的情况？

1. 将所有同步的更新加入队列
2. 在 render 阶段前取出更新队列中的任务，将它们串成链表
3. 进入 render 阶段就是处理更新队列逻辑（`processUpdateQueue(workInProgress, newProps, instance, renderLanes)`）
  - 如果 `setState` 中传的是回调函数的话就会将回调函数推进回调队列
  - 如果 `setState` 中传的是对象的话，就只会取最后一个 `setState` 传递的对象

## 疑问🤔

* 为什么同步调用多次 `this.setState` 会对他们进行批处理？
  - 这是因为 React 对于事件、生命周期函数等都使用了 `batchUpdates` 包裹，通过该方法包裹的函数会将变量 `executionContext` 设置为 1（默认为 0）
  - 那将 `` 设置为 1 与 0 有什么区别呢？
    - 区别很大，请看下面代码
    ```ts
    // NoContext 默认为 0，如果 executionContext 默认为 0 的话就会进入该逻辑
    if (lane === SyncLane && executionContext === NoContext && (fiber.mode & ConcurrentMode) === NoMode && !( ReactCurrentActQueue$2.isBatchingLegacy)) {
        resetRenderTimer();
        flushSyncCallbacksOnlyInLegacyMode(); // 会立刻执行调度任务
      }
    ```
    - 以上的代码就解释了为什么未被 `batchUpdates` 包裹的异步函数会同步执行 `setState`
    - 等等，你还是无法理解？
    - 那么还有一点就是事件循环的逻辑，因为 js 遇到异步任务会将该任务交给浏览器然后加入任务队列，等待被调度（也就是说需要等待 React 同步逻辑调用完毕才会执行下一次的异步任务）
