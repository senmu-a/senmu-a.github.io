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

## 实现 DeepReadonly

> <https://github.com/type-challenges/type-challenges/blob/main/questions/00009-medium-deep-readonly/README.md>

Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

For example:

```ts
type X = {
  x: {
    a: 1
    b: 'hi' | 'nihao'
  }
  y: 'hey'
}

type Expected = {
  readonly x: {
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey'
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

- 分析题目意图：实现 `DeepReadonly<T>` 用于递归对象，让每个属性都赋予 `readonly`，可以假设只处理“对象”类型。

按照自己的思路直接实现：

```ts
// ❓问题1: 如何继续判断 T[K] 是否是“对象”类型？
// ❓问题2: 如何递归下去？
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
```

- 问题1可以反向思考，与其判断 `T[K]` 是否为“对象”，不如判断 `keyof T` 是否为 `never`，作为递归的终止条件。
- 问题2类似js函数一样，直接重新调用 `DeepReadonly<T>` 即可。⭐️⭐️⭐️

有了以上知识再实践：

```ts
type DeepReadonly<T> = keyof T extends never ? {
  readonly [K in keyof T]: T[K]
} : T
```

但是！！这样判断有点问题，遇到联合类型就不行了：

```ts
type X = {
  x: {
    a: 1
    b: 'hi' | 'nihao'
  }
  y: 'hey'
} | {
  z: {
    a: number
    b: string
    foo: {
      c: 1
    }
  }
}
type Hmm<T> = keyof T extends never ? 1 : 0;
type TodoX = DeepReadonly<X>; // 1

// ❓问题3: 联合类型没法通过这样的方式来判断
```

> 参考：<https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367>

👆上面的回答很好解释了这个问题，所以又回到了问题1，我们通过 `keyof T extends never` 来确定有点局限，那么直接使用 `T extends object` 呢？

```ts
type DeepReadonly<T> = T extends object ? {
  readonly [K in keyof T]: DeepReadonly<T[K]>
} : T;
```

完美✅

总结：

- 掌握 TS 中的类型递归的方式
- 掌握如何设置递归的终止条件
  - 无论是 `keyof T extends never` 还是 `T extends object` 都是很好的思路，区别只是细节问题了

## 实现 TupleToUnion

Implement a generic `TupleToUnion<T>` which covers the values of a tuple to its values union.

For example:

```ts
type Arr = ['1', '2', '3'];
type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

- 分析题目意图：元组转成联合类型
- 思路1: 遍历元组的 `key`，然后输出 `T[key]`
- 思路2: 想办法直接把元组里的内容拿出来

实践：

```ts
// 遍历
type TupleToUnion1<T extends unknown[]> = T[keyof T]; // 这种可以拿到  '1' | '2' | '3'，但是会产生很多其他不想要的方法？能不能过滤掉
// 升级
type TupleToUnionPro1<T extends unknown[]> = T[number]; // '1' | '2' | '3'
// 直接将元组中的元素拿出来
type TupleToUnion2<T extends unknown[]> = T extends (infer U)[] ? U : never;
```
