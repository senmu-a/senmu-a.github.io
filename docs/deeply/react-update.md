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

### 疑问🤔

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

## hook 中 `setState` 的更新

hook 中的状态更新与上面 `this.setState()` 类似，都是

### 更新流程

1. 注册 `useState` hook，返回 `dispatchSetState` 更新函数
  - 期间会注册好更新队列并保存状态
2. 调用 `dispatchSetState` 函数
  - 需要注意的是，这里会针对状态一样的更新做复用处理（`eagerState`）；当然，只有节点的优先级未被设置且不存在 `alternate` 才会进行该处理。
3. 加入并发更新队列后调度更新

### 如何处理多次更新的情况？

和 class 组件的处理类似，不过值得注意的是由于闭包的存在，没有经过批量处理包裹的更新最后得出来的结果有差异，举个例子：

```ts
/**
 * class 组件
 * 如果不经过 batchUpdates 包裹，最终得到的结果是 3（假设原 count 为 0）
 */
this.setState({
  count: this.state.count+2
})
this.setState({
  count: this.state.count+1
})

/**
 * function 组件
 * 如果不经过 batchUpdates 包裹（函数式组件 useEffect 是通过 flushPassiveEffectsImpl 设置的 executionContext），最终得到的结果是 1（假设原 count 为 0） 
 * 这里搞清楚批量更新本质就是通过设置 executionContext 不为 0 就可以了
*/
setCount(count+2)
setCount(count+3)
setCount(count+1)

// 为什么会有这样的差异呢？ 这是因为函数式组件的 count 取的是闭包中 count 的值
```

### 异步调用多次更新又会怎样？

从上面的例子中我们得知有闭包的存在，所以异步调用与同步调用没啥区别
