---
title: React 相关面试题
date: 2023/12/14
author: senmu
---

## 使用 Hook 实现 `componentWillMount`

1. 搞清楚 `componentWillMount` 在类组件的生命周期，它是在挂载阶段并且在 `render` 之前
2. 搞清楚 hooks 的执行顺序，**[测试各个 hooks 的执行顺序](https://code.juejin.cn/pen/7312358390754344987)**

实现：[使用 Hook 实现 `componentWillMount`](https://code.juejin.cn/pen/7312381000334934031)

## React 实现计时器

[计时器](https://code.juejin.cn/pen/7312713608918958130)

## 状态管理

> 状态管理的核心目的是解决前端应用中数据流动和共享的问题。
> 随着应用复杂度增加，多个组件需要访问和修改相同的数据，如果仅靠组件内部状态和props传递，会导致代码难以维护。

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

### 状态管理的定义

简单来说，状态管理用来管理应用中的数据及其变化的方法和模式。

### 为什么要进行状态管理？

1. 数据共享问题
   1. 没有状态管理，需要通过 props 层层传递
   2. 有了状态管理，只需要在顶层定义状态，在需要使用的子组件中使用即可
2. 数据一致性问题
   1. 没有状态管理，同一数据可能在多个组件中被复制，导致不一致
   2. 有了状态管理，数据源单一，确保所有组件看到一致的数据
3. 数据更新于 UI 同步问题
   1. 没有状态管理，需要手动确保 UI 组件反映最新的状态
   2. 有了状态管理，状态变化自动触发 UI 更新
4. 调试和开发效率问题
   1. 没有状态管理，难以追踪数据的变化，调试复杂
   2. 有了状态管理，提供清晰的状态管理且可以利用 devtool 更加直观的追踪数据的变化。

### 引入或者进行状态管理能解决什么问题？

1. 简化组件设计，将 UI 与数据逻辑分离
2. 提高可维护性
3. 提升性能
4. 保证系统功能健壮性

## 高阶组件（HOC）是什么？你在业务中使用它解决过什么问题？

我理解的高阶组件（HOC）实际就是对组件做一层包裹，然后可以拦截其 Props 等并做一些处理。

高阶组件是一个纯函数，它接受一个组件作为参数，并返回一个新的组件，这个新的组件支持在使用时传入额外的 Props。

我在业务中使用它解决过：

1. 组件库样式及 DOM 结构不符合我的要求，对其进行包裹处理
2. 处理通用组件的埋点
3. 错误处理

**补充**：

- 不要在 render 函数中处理逻辑，会造成不必要的重新渲染
- 经过 HOC 包裹后的静态方法不会被继承，可以手动复制静态方法或者使用库 `hoist-non-react-statics` 解决。
- 避免包裹层级太多的情况，会导致项目变得复杂且混乱
- props 命名冲突问题，可以使用命名空间或者增加特殊标识等方式解决

## 什么时候应该使用类组件而不是函数式组件？错误捕获怎么做？

1. 在早期 React15.x 类组件提供了完整的生命周期以及状态管理，而函数式组件并没有这些完整功能，所以需要使用类组件
2. 随着 React16.8 版本发布 Hook 后基本函数式组件就成为了主流，但是还有一种场景使用类组件，那就是 `ErrorBound` 错误边界，用来捕获子组件的错误。

错误边界简易版案例：

```tsx
class ErrorBound extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // logService handle something
  }

  render() {
    if (this.state.hasError) {
      return 'Error!!';
    }
    return this.props.children
  }
}
```

## 在 React 中如何对 Props 进行应用校验？

在一般项目中通常我们使用 TypeScript 进行静态编译校验：

- 在函数式组件中我们会传入 `React.FC<CustomPropsType>` 这样的形式来校验 Props
- 在类组件中我们也是采用类似方案 `class CustomComponent extend Component<CustonPropsType, CustomStateType>{}`
- 另外，在 React 的早期版本也可以使用 `props-type` 去校验

## React 中如何创建 Refs？创建 Refs 的方式有何不同？

- 在类组件中我们可以通过 `React.createRef()` 的方式创建 Refs，并且将该变量绑定在元素上，可以访问该元素完整的 DOM 实例
- 在函数式组件中可以通过 `useRef()` 的方式来创建 Refs，使用方法与类组件也类似

**补充：**

- 可以使用回调函数的形式创建 Refs，例如：`<div ref={(ref) => do something;}></div>`;
- 如果遇到需要定制组件的 Refs 功能，则需要使用 `forwardRef` 包裹组件
- `useRef` 在渲染间保持相同引用，更改 `.current` 不会触发重新渲染
- `createRef` 每次渲染都创建新引用，不保持状态
