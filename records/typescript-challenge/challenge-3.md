---
title: TypeScript 体操2
date: 2025/04/17
author: senmu
---

## 实现 UnionToIntersection

Implement the advanced util type `UnionToIntersection<U>`

For example:

```ts
type I = Union2Intersection<'foo' | 42 | true>; // expected to be 'foo' & 42 & true
```

1. 分析题目意图：实现联合类型转为交叉类型
2. 实现思路：
   1. 如果可以遍历到每个联合类型的每一项那么就直接增加 `&` 符就行了 ❌

没搞懂，先这样吧

```ts
type Union2Intersection<U> = (U extends U ? (arg: U) => void : never) extends ((arg: infer T) => void) ? T : never;
```
