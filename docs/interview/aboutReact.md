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

## memo 有什么用途？useMemo 和 memo 的区别是什么？useCallback 和 useMemo 的区别是什么？

一般来说，使用 `memo(CompA)` 包裹组件来减少不必要的重新渲染，例如：有个组件 A 只是展示了某些静态元素的内容（没有 `state`，没有 `props`），如果在其父组件 B 中发生了状态更新，触发了 React 的 `re-render`，那么组件 A 也会跟着更新（即使他什么都没变化）；但是！如果使用了 `memo` 包裹后组件 A 就不会跟着更新。

更进一步说，使用了 `memo(CompA)` 包裹的组件在触发 `re-render` 时会进行 `Object.is(prevProps, curProps)` 这样的浅比较。

`useMemo` 用来包裹复杂的函数/逻辑计算，接受传入依赖项（依赖项更新会重新计算缓存，不更新的话就保持缓存）；他与 `memo` 的使用场景不同，但是实现的功能类似。

`useCallback` 与 `useMemo` 的区别在于，前者缓存函数后者缓存函数执行结果，前者不会立即执行，后者会立即执行。

## React 的新老生命周期有什么区别？合并新老生命周期的理由是什么？

在 React16.3 以前生命周期的钩子中存在很多副作用钩子，这些副作用钩子会造成额外的重新渲染，所以在新版的生命周期中去除了这些钩子，并提供了新的钩子使用纯函数的形式提供。新版生命周期函数如下：

- constructor
- static getProp(获取 props 和 state 的静态钩子) => static getDerivedStateFromProps
- shouldComponentRender - 判断是否要进行渲染的钩子
- render
- getComponentSnapShot - 获取快照 => getSnapShotBeforeUpdate
- DidComponentUpdate - 触发了 re-render 时会触发该钩子
- DidComponentMount - commit 阶段
- ComponentWillUnMount - 卸载

改进：

- 移除了旧版生命周期钩子有：`componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate`
- 是因为并发模式下移除的这些钩子可能会被调用多次，新方法设计为纯函数，适用于可能暂停、恢复的渲染过程

## 什么是 React 中的状态撕裂问题？setState 是同步还是异步？

状态撕裂问题是 React 新的并发模式下状态不同步问题，例如：并发模式下高优先级任务可以暂停页面的渲染，而如果渲染到一半用户触发了 input 输入更改了状态值则需要优先响应状态的更改，而如果用户又将状态改回原来的状态值，那么页面渲染就不会进行了，就会造成不同步问题。

`setState` 我认为不能通过简单的同步还是异步来定义，深入分析是因为 React 内部处理 `setState` 时是将执行逻辑加入到异步队列中执行，但是如果使用了 `setTimeout` 这样的语法包裹导致 `setState` 脱离了 React 的执行环境，React 没有正常将 `setState` 内部逻辑加入到异步队列中，所以看起来是同步的。

而对于这种歧义，在 React18 版本已经做了修复，不管在什么环境中都是异步的。

改进：

状态撕裂问题：当 UI 的不同部分反映同一状态的不同值时发生，尤其在并发更新场景下。换句话说就是在并发模式下，同一个状态被用在不同的 UI 渲染，会造成状态撕裂问题。

## React 中的 Portal 是什么？

React 中用于将元素脱离当前元素组件的方式，通常我们封装全局弹窗使用。

## 自己实现一个 Hook 的关键点是什么？

1. 保证 Hook 是纯函数
2. 遵守 React Hook 的语法与规则
3. 要保证 Hook 功能单一，简洁

## 你去实现 React 具体业务时 TS 类型不知道怎么设置怎么办？

- 去 `React.d.ts` 中查看，可以参考一些 hook 等逻辑的类型编写
- 使用 google 搜索/问 AI（chatgpt、claude、deepseek等）

**补充**：

```tsx
// 一些常见的 TS 类型挑战及解决方案示例：
// 1. 处理事件处理函数
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// 2. 复杂组件 Props 类型
type ButtonProps = {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isFullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
} & (
  | { href: string; as?: 'a' } 
  | { href?: never; as?: 'button' }
);

// 3. 泛型 Hook 示例
function useLocalStorage<T>(key: string, initialValue: T) {
  // implementation
}

// 类型推断工具

import { ComponentProps, ReturnType } from 'react';

// 从现有组件获取 props 类型
type MyButtonProps = ComponentProps<typeof Button>;

// 从 Hook 获取返回类型
type UseQueryResult = ReturnType<typeof useQuery>;v
```

## React 与其他框架对比优缺点是什么？你们团队选择 React 的理由是什么？

React 的优点：

- 生态完善，周边配套产品很多
- 社区庞大且活跃
- 灵活且强大的 `jsx` 语法
- Hook 功能支持逻辑可复用性
- 官方文档完善，并且有中、英文等支持
- 跨浏览器兼容友好
- 涵盖移动端（React-Native）、SSR（Next.js）
- 由 Facebook 团队出品，可靠度高

缺点：

- 学习周期陡峭，不容易上手
- 跨版本升级改动大，而且可能会完全推翻以前的实现
- React 只是个处理视图的库，路由等功能都需要自行实现或者找第三方库

总的来说，React 依然是非常优秀的框架，我们团队通常选择某个技术栈的理由如下：

1. 考虑团队内大多数人的技术栈的情况
2. 该框架是否稳定可靠（star 数、社区活跃度、测试覆盖率等）
3. 技术栈是否与公司整体技术栈一致

**补充**：

与 Vue 的对比：

- Vue 提供了更多开箱即用的功能(路由、状态管理)，而 React 更专注于视图层
- Vue 使用模板语法和单文件组件，而 React 使用  JSX 语法
- Vue 的响应式系统是自动的，而 React 需要手动触发更新

与 Angular 对比：

- Angular 是一个更加完整的框架
- Angular 使用 TypeScript 和依赖注入，更适合大型企业应用
- React 学习曲线相对较低，更灵活，但需要做更多架构决策

## React 16/17/18 都有哪些变化？useTransition 是啥？解决了什么问题？

React16:

- 16.3 版本发布了新的生命周期钩子并废弃了一些有额外副作用的钩子
- 16.8 版本发布了 Hook
- 还使用 fiber reconcile重构了以前的 stack reconcile
- 提出了并发渲染模式

React17:

- 垫脚石版本，为了升级 18 做准备
- 移除了事件池
- 将全局 document 绑定的事件改为了每个 app 实例上
- 推出并发渲染模式实验版
- 将底层任务调度改为 Line 模型

React18:

- 正式推出并发渲染模式
- 增加了一些异步渲染的 Hook

`useTransition` 是 React18 新增的异步渲染 Hook，可以降低渲染任务的优先级，让页面优先响应用户交互的事件。

它解决了长列表渲染未完成页面无法交互的问题，提高的页面的可交互性，对用户更加友好。

**补充**：

React18还有一些特性：

- Suspense 服务器组件支持
- 新的 root API (`createRoot` 替代 `render`)
- 自动批处理
- 批量更新的自动化

另外，补充 `useTransition` 的事例：

```tsx
import { useTransition, useState } from 'react';

function FilterableList({ items }) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 高优先级更新 - 立即反映在UI上
    setQuery(e.target.value);
    
    // 低优先级更新 - 可以被中断
    startTransition(() => {
      setFilteredItems(
        items.filter(item => 
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    });
  };

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <div>更新中...</div> : null}
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
```

## React 的整体渲染流程能描述一下吗？ ⭐️⭐️⭐️⭐️⭐️

1. 初始化方式不同 React 会走不同的渲染模式（`.render`/`.createRoot`）
2. 初始化一些内部变量，将渲染任务加入任务调度
3. 在浏览器空闲时执行工作任务 - render 阶段，会深度递归整棵树，更新会做 diff 标记每个元素/组件是“新增、删除、修改”，然后处理 Hook 等 Effect
4. commit 阶段，异步处理 Effect， 根据前面标记的情况进行页面元素的渲染挂载，还有合成事件的注册
5. 处理完成将整棵树加入缓存，利用双缓存技术更新下次的渲染变更

**补充**：

React 渲染流程详解:

1. 触发渲染
   - 初次挂载: `ReactDOM.createRoot(container).render(<App />)`
   - 状态更新: `setState`, `useState` 更新函数,`useReducer dispatch`

2. Render 阶段 (可中断)
   - 构建/更新 Fiber 树
   - 执行函数组件/类组件的 render 方法
   - Reconciliation: Diff 算法比较新旧 Fiber 树
   - 为每个 Fiber 节点标记副作用标签(Placement, Update, Deletion)
   - 此阶段纯计算，不涉及 DOM 操作

3. Commit 阶段 (不可中断)
   - 前置: 准备 DOM 变更，调用 `getSnapshotBeforeUpdate`
   - 变更: 根据 flags 应用 DOM 更新，处理 ref
   - 后置: 调用 `LayoutEffect`, `componentDidMount/Update`, 安排 `useEffect` 执行

4. 浏览器绘制

5. 被动副作用执行
   - 运行 `useEffect` 回调函数

## Fiber 架构请细致描述下 ⭐️⭐️⭐️

从底层架构的角度说，Fiber 是一个节点，它包含了一个底层节点的所有信息，并且通过双向链表的形式连接。

从渲染性能的角度来说，Fiber Reconcile 让渲染过程变得可暂停、中断、将任务切片。

正是有了 Fiber 架构，React 才得以突破 cpu 任务的性能瓶颈。

**补充**：

Fiber 架构深度解析:

1. 数据结构
   每个 Fiber 节点包含:
   - type: 元素类型 (如 'div', MyComponent)
   - key: 唯一标识符
   - child: 第一个子节点的指针
   - sibling: 下一个兄弟节点的指针
   - return: 父节点的指针
   - pendingProps: 新的待处理 props
   - memoizedProps: 上次渲染使用的 props
   - memoizedState: 组件状态和 hooks 链表
   - flags: 副作用标记 
   - lanes: 优先级相关信息

2. 工作原理
   - 双缓存: current 树(当前显示)与 workInProgress 树(正在构建)
   - 单向工作循环: beginWork (向下) 和 completeWork (向上)
   - 时间切片: 每个工作单元执行后检查时间预算

3. 调度优先级
   - 同步任务
   - 过渡任务 (Transition)
   - 普通任务
   - 空闲任务

4. 中断与恢复
   - 协作式调度: 主动让出控制权 
   - 保存进度: 通过 WIP 树跟踪已完成工作
   - 恢复机制: 从上次中断点继续
