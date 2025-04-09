---
title: 面试题
date: 2025/04/04
author: senmu
---

从 2025-04-04 开始，暂时节奏是一天 5 道题。

下面是 2025-04-04 的题：

## 1. 你所了解到的前端性能指标都有哪些？

## 2. 说说你所了解到的性能优化的手段

## 3. 如何监控一个接口的返回时间是否出错？

## 4. react 有个库叫 @welldone-software/why-did-you-render，它的原理是什么？

## 5. 可以通过 performance.timing 获得非常多的性能指标，这个你了解多少？目前被废弃了，那最新的 API 有了解吗？

下面是 2025-04-05 的题：

## 1. React 在开发过程中有哪些性能优化策略？

## 2. React useTransition 在实际工程中能起到优化的作用么？你是怎么落地的？

## 3. 详细解释下 React 的 Fiber 架构?

## 4. TypeScript 中 interface 和 type 的区别是什么?

## 5. 如何在 TypeScript 中定义一个支持可选参数和默认参数的函数？

下面是 2025-04-06 的题：

## 1. Redux 和 Redux Toolkit 有哪些区别?在什么情况下会选择 Redux Toolkit?

Redux Toolkit 是 Redux 官方推出的工具集，底层思想概念还是 Redux，但是它大大降低了编写 Redux 代码的复杂度。

1. Redux Toolkit 大大降低了样板代码的编写，对于 Redux 来说需要手动去创建 action types、action creators 和 reducers，而 Redux Toolkit 只需要使用 createSilce API 即可完成。
2. Redux Toolkit 简化了 store 配置，不需要再去手动设置 middleware、devtool 等。
3. Redux Toolkit 内置了 immer，不需要我们再去手动管理不可变状态的更新，只需要关注业务逻辑，减少心智负担。
4. Redux Toolkit 对于异步操作友好，可以使用 createAsynChunk 创建异步操作，而 Redux 则需要使用 saga 等方式才行
5. Redux Toolkit 对于 TypeScript 的支持很友好

Redux Toolkit 对于新项目尤其是中大型项目非常适合使用；或者是需要重构 Redux 的场景；再者团队成员对于 Redux 的经验不足，使用 Redux Toolkit 大大降低学习曲线

## 2. 介绍一下 React 服务器端渲染(SSR)的实现方式?

React 服务端渲染指的就是将 React 组件在服务端渲染成 HTML 字符串然后发送给客户端/浏览器，浏览器再进行水合快速展现页面的过程。它的具体实现如下：

1. 在服务端使用 renderToString 或者 renderToNodeStream API 将组件渲染成 HTML 字符串
2. 将生成好的 HTML 字符串嵌入到完整的 HTML 文档中，注入一些初始状态数据，通过 window.__INITIAL_DATA__ 这样的方式
3. 在客户端使用 hydrateRoot 将服务端返回的 HTML 字符串进行水合，添加交互事件
4. 确保状态同步，这通常是在服务端进行数据预加载同步给客户端来实现

当然，市面上已经有比较成熟的框架，比如 Nextjs，如果是要改造已有 React 项目可以通过 React Router + Express/Koa 来实现。

## 3. 了解哪些 React19 的新特性?

1. 引入了 React Compiler（以前叫 React Forget），能够自动优化渲染性能，减少用户手动 useMemo、useCallback 以及 memo 的操作。它通过静态分析代码的方法，自动添加必要的记忆化，让开发者专注逻辑而非优化。
2. 推出了全新的 Actions API，提供了一种更直接的方式处理表单和数据变更，特别是在服务器组件环境中。这使得表单处理变得更简洁、更符合直觉。
3. Document Metadata API 让我们可以直接从组件中管理页面元数据，如标题、描述和 Open Graph 标签，无需额外的库。

## 4. React 19 对 React 18 的 useTransition 和 useDeferredValue 进行了哪些优化?

useTransition：

1. 通过与 React Compiler 的集成，useTransition 获得了更智能的依赖跟踪，大幅减少了不必要的重渲染，特别是在复杂 UI 层级中的性能提升明显
2. 调度算法得到了改进，能够更精确地平衡高低优先级任务，实际使用时，用户几乎感觉不到低优先级更新正在后台进行。
3. 优化了 useTransition 的内存占用，减少了转换过程中的资源消耗，对大型应用尤其重要。

useDefferedValue：

1. 引入了智能的自适应延迟机制，会根据设备性能动态调整延迟策略，不再使用固定阈值，使得不同设备上的体验更加一致。
2. 增强了与 Suspense 的集成，现在当延迟值触发数据加载时，不会干扰用户正在进行的交互，交互体验更加流畅。
3. 改进了内部的比较算法，减少了不必要的计算和渲染，特别是在处理大型数据集时效果显著。

## 5. React 19 的 SSR 和 Hydration 机制相比 React 18 有哪些优化?它如何更高效地进行部分 Hydration (PartialHydration)?

主要围绕性能、开发体验和渲染灵活性三个方面。最突出的改进是引入了更完善的部分水合(Partial Hydration)机制，与 React 18 相比，它能更精确地仅激活页面中需要交互的部分。

1. 流式渲染增强，React 19 进一步优化了数据获取与渲染的协调，支持更细粒度的 Suspense 边界，使内容能够更快地分批到达用户浏览器。这使'骨架屏→内容块'的过渡更加流畅，大幅改善了用户感知性能。
2. 部分水合优化，更加细粒度的进行水合控制，优化页面的加载速度
3. 水合错误处理优化，在 React 18 中，水合不匹配会导致整个组件树重新渲染，而 React 19 能够隔离不匹配区域，只重渲染最小必要的部分，保持其他区域的完整性，大大提高了应用在不稳定网络环境下的弹性。

## 6. 为什么要做一个自己的脚手架?使用 commander 完成脚手架注册指令大致是怎么实现的呢?

1. 脚手架可以大幅提高效率
2. 统一的架构与规范
3. 集成特定功能，简化工作流程
4. 对于新人来说降低学习成本

## 7. 提高 webpack5 构建速度都有哪些方案？

## 8. webpack5 源码核心模块有哪几个分别是什么作用？

## 9. 如何保证各个loader按照预想方式工作？

## 10. 是否写过Loader？简单描述一下loader的思路？

> TODO: 待手写 Loader ✅

👇下面是 2025-04-07 的题：

## 1. 是否写过 plugin？简单描述下编写 plugin 的思路？

## 2. 请详细描述下 babel 的原理？

## 3. 请详细描述 swc 的原理？

## 4. 使用 swc-loader 相比于使用 babel-loader 的优势多哪些？

## 5. Vite 的原理是什么？

1. 模块的解析和加载
   1. 利用浏览器对于原生 ESM 加载的支持，遇到 `import` 语法会按需去请求资源模块，避免构建时的预打包。
   2. 服务器处理请求，利用 KOA 的中间件开发服务器，拦截浏览器请求的资源，根据文件类型的不同做不同的转换处理。
2. 依赖的预构建
   1. 在项目冷启动过程中，vite 会监测 `node_modules` 中的依赖。将非 ESM 的模块通过 esbuild 将他们构建成 ESM 模块放到 `.vite` 目录下
3. HMR
   1. 每个模块的依赖关系会被构建生成模块图
   2. 当某个模块发生变更，vite 会：
      1. 触发文件监听
      2. 在模块图中定位到受影响的模块
      3. 通过 websocket 发送通知
      4. 浏览器收到更新通知后，重新请求变更了的资源模块
4. 利用 Rollup 的插件系统
5. 生产环境使用 Rollup 打包
6. 优化 css 等静态资源

👇下面是 2025-04-08 的题：

## 1. 说一下 webpack 的热更新原理？

## 2. 如何对 bundler 体积进行监控和分析？

## 3. 你的项目工程化 Sonar 是如何配置的？

TODO: 实战接入 Sonar

## 4. 以一个 Vue 项目为例，说一下 Sonar 的具体配置

## 5. 你的项目 CI CD 使用的是什么？
