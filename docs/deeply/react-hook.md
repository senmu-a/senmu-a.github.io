---
title: React Hook 的原理
date: 2024/05/09
author: senmu
---

## 前言

探究 Hook 的原理我们需要从它的使用入手，即：Hook 的规则、不同 Hook 的不同能力如何实现。

## Hook 的规则

[规则列表](https://react.dev/warnings/invalid-hook-call-warning)：

1. 不要在条件判断和循环中调用 Hook
2. 不要在有条件判断的 `return` 语句后调用 Hook
3. 不要在事件处理函数中调用 Hook
4. 不要在 class 组件中调用 Hook
5. 不要在 `useMemo`、`useReducer`、`useEffect` 内部函数中调用 Hook

那么它的规则判断是怎么实现的呢？下面一起来探究下：

我使用的的版本是 v18.2.0，通过对上面规则进行实测，发现有三种情况：
> 前提需要忽视掉 eslint 的警告

* 可以正常运行不报错
  - 1、2、3
* 控制台会打印错误，但是可以正常运行
  - 5 中的 `useMemo`
* 会抛出错误，不可以正常运行
  - 4 与 5 中的 `useEffect`、`useReducer`

1、2、3 不用过多讨论了，这是因为除了语法块包裹与正常调用 Hook 没有区别。

`useMemo` 中调用 Hook 控制台会报错是因为在初始化 `useMemo` 时调用了 `InvalidNestedHooksDispatcherOnMountInDEV` 方法，而该方法会添加控制台的报错情况。

最后也是我们本次分析的重点。由于他们的抛出的错误不同，我们分别来看。

### `useEffect` 函数内执行 Hook

> 表现为 `throwInvalidHookError` 方法中的报错，页面无法正常展示。

要想搞懂该问题那就得对 Hook 注册有所了解，也就是 `ReactCurrentDispatcher.current` 的值（因为暴露给用户的 Hook 会通过该变量来获得内部定义的 Hook）。

* 初始化注册 `ContextOnlyDispatcher`，暂时先理解为含有 `throwInvalidHookError` 报错的 Hook 方法，如果在此时就调用 Hook 就会报错
  - 在 render 阶段开始之前
* render 时将 `ReactCurrentDispatcher.current` 赋值为 `HooksDispatcherOnMountInDEV` | `HooksDispatcherOnMountWithHookTypesInDEV` | `HooksDispatcherOnUpdateInDEV`，这几个都是我们平时 Hook 对应的处理逻辑，具体功能暂时不展开，只要知道如果此时调用 Hook 就不会报 `throwInvalidHookError` 方法中的错误
* 调用完 Hook 方法后会调用 `finishRenderingHooks` 方法，将 `ReactCurrentDispatcher.current` 赋值为 `ContextOnlyDispatcher`，所以在执行 `useEffect` 内部的函数时就有 `throwInvalidHookError` 报错了～

### `useReducer` 函数内执行 Hook

可以发现在不执行 `dispatch` 方法时是不会报错的，这是因为在调用 Hook 方法后会将 `ReactCurrentDispatcher.current` 的值设置为 `InvalidNestedHooksDispatcherOnMountInDEV` 方法，而该方法会添加控制台的报错情况。

### 总结

从上面这些 Hook 的规则报错情况来看，有的报错由 Eslint 发出的，是在编译层面发出的。而另一部分运行时的报错是跟 Hook 的执行时机有关的，比如：在调用了 `useEffect` 后将 `ReactCurrentDispatcher.current` 的值变为有报错的 Hook 函数，此时调用 `useState` 等 Hook 就会执行该报错。

## Hook 核心内容

### `useState` 基本原理

要想探寻 `useState` 的原理，我们需要知道数据如何存放、更新后的重新渲染如何进行？

#### 数据存放

我们都知道 React 中存在 `mount` 和 `update` 阶段，我们分别来看下，在 `mount` 时：

* 初始化数据对象
  ```ts
  const hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  }
  ```
* 如果传入的初始值（`initialState`）为函数则立刻执行，并将结果保存
* 将 `initialState` 值赋值给 `hook.memoizedState`、`hook.baseState`
* 初始化队列
  ```ts
  // basicStateReducer
  function basicStateReducer(state, action) {
    return typeof action === 'function' ? action(state) : action;
  }
  const queue = {
    pending: null,
    lanes: NoLanes, // 0
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState // 用户传进来的初始值
  }
  ```
* 将 `queue` 赋值给 `hook.queue`
* 绑定 `dispatchSetState` 函数给 `queue.dispatch`
* 返回 `[hook.memoizedState, queue.dispatch]`

由上述过程可以看出来，数据其实是存放在 `hook.memoizedState` 上的，那此时便会有疑问，如果我直接更改该值可不可以重新渲染？

答案是否定的，因为重新渲染本质是更新了状态值然后利用调度函数进行更新才会重新渲染页面。但如果 React 暴露调度方法供我们调用，那我们便可以自行维护状态管理了～

另外值得注意的是，我更改上面 `hook.memoizedState` 的初始化赋值会对页面渲染的值有影响，这是因为 `hook.memoizedState` 与 `fiber.memoizedState` 会相关联。

#### 数据更改

这部分其实可以在大方向上分为两种情况

### `useEffect` 基本原理

类似 `useState` 也会在初始执行时将回调函数和第二个依赖项加入 `hook.memoizedState` 存储，然后在适当时机（在 commit 阶段加入微任务队列）执行。

执行会根据依赖项的不同执行回调函数。

如果没有依赖项则每次重新渲染都会执行回调函数（这里包括 setup 与 destroy 函数，update 时先执行 destroy，再执行 setup。mount 时只执行setup）。

如果依赖项为空数组的话只有mount时会执行 setup，在卸载时执行 destroy。

如果依赖项存在，则会判断状态是否更改，如果更改的话就同没有依赖项一样执行。