---
title: React 相关面试题
date: 2023/12/14
author: senmu
---

### 使用 Hook 实现 `componentWillMount`

1. 搞清楚 `componentWillMount` 在类组件的生命周期，它是在挂载阶段并且在 `render` 之前
2. 搞清楚 hooks 的执行顺序，**[测试各个 hooks 的执行顺序](https://code.juejin.cn/pen/7312358390754344987)**

实现：[使用 Hook 实现 `componentWillMount`](https://code.juejin.cn/pen/7312381000334934031)

### React 实现计时器

[计时器](https://code.juejin.cn/pen/7312713608918958130)

### 状态管理

首先，对于状态管理的选择，应该考虑项目的实际需求；我接触过的状态管理如下：

- Redux
  - 一个集中式数据源 Store、一个 Reducer、一个 Action（Dispatch）
  - 通过 Action 更新状态
  - 但是，如果一个项目中的状态越来越庞大越来越多，很容易造成混乱，复杂性也会越来越高。
- Mobx
  - observable、action 响应式的数据变化，适合数据状态频繁变化的项目。
- useReducer、useState
  - 适合小型项目内部自行管理状态
- Context + Provider
  - 能解决跨组件层级通信问题，本质状态管理没发生多大变化
- Recoil
  - 原子状态
  - 但是 API 太多太杂了，复杂性太高
- Jotai+immer
  - 原子状态，简洁，可以共享状态
  - 减少不必要的 re-render
- Zustand
  - TODO
- Xstate
  - TODO

#### 状态管理的意义/目的是什么？引入或者进行状态管理能解决什么问题？为什么要进行状态管理？


