---
title: TypeScript 体操2
date: 2025/03/21
author: senmu
---

## 实现简单的 Vue 类型

> <https://github.com/type-challenges/type-challenges/blob/main/questions/00006-hard-simple-vue/README.md>

1. 分析题目意图，实现一个简单 Vue 类型，并且给出了要实现的条件，包括接受一个对象参数，`key` 为 `data`、`computed`、`methods`，返回值是任意的，并且要求 `computed` 和 `methods` 中的函数可以使用 `this` 来访问 `data`、`computed`、`methods` 中的属性。
2. 需要哪些知识？
   1. 泛型 ✅
   2. 交叉类型(`&`)与联合类型(`|`)的区别 ✅ - 简单来说，联合类型是定义的值要么是联合类型中的 A 要么是 B，而交叉类型则是定义的值既要包含 A 又要包含 B。
   3. [`ThisType<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype)
   4. [`ReturnType<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)
3. 有了以上知识并且搞懂题目意思就可以开搞了！

```ts
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
});

type ObjectOptionsDescriptor<D, C, M> = {
  data: () => D,
  computed: C & ThisType<D & MyComputedType<C>>,
  methods: M & ThisType<D & M & MyComputedType<C>>
}

// computed 必须是有返回值的
type MyComputedType<T> = T extends Record<string, () => any> ? { [K in keyof T]: ReturnType<T[K]>} : never;

declare function SimpleVue<D, C, M>(options: ObjectOptionsDescriptor<D, C, M>): any
```
