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

#### 如果是异步的情况呢？
