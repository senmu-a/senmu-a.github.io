---
title: React Diff 算法
date: 2024/03/25
author: senmu
---

## 整体流程

全部逻辑都在 `reconcileChildren(current, workInProgress, nextChildren, renderLanes)` 方法中

下面对于它的入参进行解释：

* `current` 当前节点（页面中已经展示的 DOM），初次渲染为 `null`
* `workInProgress` 工作节点（当前正在进行中的节点）
* `nextChildren` 子元素节点
  - 例如：<div><p>hello</p></div>，div 节点为工作节点时 p 节点就为他的 `nextChildren`
* `renderLanes` 优先级相关

而这个方法中又细分初次渲染和更新方法：

* 初次渲染：`mountChildFibers(workInProgress, null, nextChildren, renderLanes)`
* 更新：`reconcileChildFibers(workInProgress, current.child, nextChildren, renderLanes)`
* 其实都指向：`reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes)`

可以看到他们的入参很相近，其实底层方法也是一样的，只不过内部会有一些不同的处理，还是老规矩，分析入参：

* `returnFiber` 保持单链表节点的结构
* `currentFirstChild` 这里就是初次渲染和更新最大的不同，因为更新涉及到节点的复用
* `newChild` 同上
* `lanes` 优先级相关

入参分析到此为止，下面进入真正的 Diff 逻辑。

1. 首先是对 `Fragment` 节点（<></>）进行处理，如果是该节点直接拿他的子节点
2. 判断节点的类型
  - `typof ==> 'object'`，该逻辑比较复杂，分为单节点 Diff 和多节点 Diff
  - `typeof ==> 'string'`，当作单节点处理 `TextNode`
  - `typeof ==> 'function'`，发出警告
3. 以上类型都不是就直接标记删除

## 单节点 Diff

处理三种情况：

* 类型为 `element`
  - `reconcileSingleElement(returnFiber, currentFirstChild, newChild, lanes)`
  - 先判断是否是初次渲染（`while(currentFirstChild !== null)`）
    - 初次渲染就跳过/不存在 `currentFirstChild` 也跳过
    - 不是初次渲染就走该逻辑
    - 判断 `key` 是否相同
      - 不同的话就直接删除子节点（`currentFirstChild`）
      - 相同的话就继续走该逻辑，判断 `type` 是否相同
        - 不同的话就连它与它的子节点直接全部删除
        - 相同的话就删除该节点的兄弟节点，复用该节点，返回该节点，退出逻辑 🔚
    - 赋值子节点为它的兄弟节点（`currentFirstChild = currentFirstChild.sibling`），继续上面的逻辑👆（注意这里的处理与 `key` 相同但  `type` 不同的处理逻辑不同）
  - 根据 `newChild` 的类型，创建对应节点，返回该节点，退出逻辑 🔚

* 类型为 `portal`
  - 与上面的逻辑类似
* 类型为 `lazy`
  - 执行下面逻辑
  ```js
    var payload = newChild._payload;
    var init = newChild._init; // TODO: This function is supposed to be non-recursive.

    return reconcileChildFibers(returnFiber, currentFirstChild, init(payload), lanes);
  ```
* 不是这三种类型的话就接着继续判断是否多节点

流程图如下：

![singleNodeDiff](/singleNodeDiff.jpg)

## 多节点 Diff



## 疑问🤔

* `lazy` 的组件 `_palyload` 和 `_init` 是什么？