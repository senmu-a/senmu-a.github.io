---
title: TypeScript 体操
date: 2025/03/14
author: senmu
---

## 实现 MyReturnType

> 参考文档：[`typeof` 类型运算符](https://www.typescriptlang.org/docs/handbook/2/typeof-types.html)
> 参考文档：[条件类型](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)

题目要求如下：

Implement the built-in `ReturnType<T>` generic without using it.

For example:

```ts
const fn = (v: boolean) => {
  if (v) {
    return 1
  } else {
    return 2;
  }
}

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

1. 分析题目意图 - 实现一个类型 `MyReturnType<T>` 来表示函数执行后的返回类型
2. 需要哪些知识？
   1. 泛型 ✅
   2. `typeof` 可以用来表示一个值的类型是什么，包括引用值以及他的属性。

      ```ts
      const obj = { name: 11, age: 'ss', sex: [1], b: { xx: 1 } };
      const arr = [1]
      const str = 'ss';

      type a = typeof obj; // { name: number, age: string, sex: number[], b: { xx: number }}
      type b = typeof arr; // number[]
      type c = typeof str; // string
      type d= typeof a; // ❌ 'a' only refers to a type, but is being used as a value here.
      ```

   3. `extends` 条件约束，类似于 js 当中的三元运算符的问号
   4. `infer` 类型推断，可以用在 `extends` 条件类型内进行推断

      ```ts
      // 比如，这道题需要返回 fn 的返回值那么我们就可以使用 extends 来判断泛型 T 是否是函数，然后再推断返回值
      type GetReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
      // 等号前面的 extends 用于类型约束
      // 等号后面的 extends 类似条件判断，然后再利用 infer 推断返回值 R，如果 R 存在就返回 R 的类型
      ```

3. 该如何解题？ - 懂了以上的知识就很简单了。

```ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

## 实现 MyOmit

题目要求如下：

Implement the built-in `Omit<T, K>` generic without using it.

Constructs a type by picking all properties from `T` and then removing `K`

For example:

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}
  
type TodoPreview = MyOmit<Todo, 'description' | 'title'>; // { completed: boolean }
const todo: TodoPreview = { completed: false };
```

1. 分析题目意图，实现类似 `Omit<T, K>` 的功能，换句话说就是排除泛型 `T` 中的属性，这个属性由 `K` 来定义。
2. 需要哪些知识？
   1. 泛型 ✅
   2. 泛型 `T` 如何排除掉联合类型？
      1. 联合类型是泛型 `T` 的 `key`
      2. `keyof T` => `'title' | 'description' | 'completed'`、`K` => `'description' | 'title'`
      3. `keyof T extends K ? never : T` 如果 `K` 在 `T` 的 `key` 中，就排除他
3. 如何解题？ - 懂了以上知识就简单了

```ts
type MyExclude<T, U> = T extends U ? never : T;
type MyOmit<T extends object, K extends keyof any> = {
  [key in MyExclude<keyof T, K>]: T[key]
}
```
