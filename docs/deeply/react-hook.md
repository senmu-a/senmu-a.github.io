---
title: React Hook 的原理
date: 2024/04/18
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
