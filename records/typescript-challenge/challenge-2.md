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

## 实现 TupleToObject

Given an array, transform it into an object type and the key/value must be in the provided array.

For example:

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

- 分析题目意图：需要将一个数组转换成 js 普通对象形式的类型，key/value 的形式。
- 思路1: 遍历数组，映射 key-value

```ts
type TupleToObject<T extends readonly PropertyKey[]> = {
  [K in T[number]]: K
}
```

这样的思路是可以的，但是有一些细节需要注意：

1. `as const` 断言可以将一个数组断言成只读的元组，对于一些 hook 的返回值很有用～
2. 可以使用 `PropertyKey` 来灵活做类型约束
3. `T[number]` 是遍历数组/元组的方式

## 实现 Chainable

Chainable options are commonly used in Javascript. But when we switch to TypeScript, can you properly type it?
In this challenge, you need to type an object or a class - whatever you like - to provide two function option(key, value) and get(). In option, you can extend the current config type by the given key and value. We should about to access the final result via get.

For example

```ts
declare const config: Chainable
const result = config.option('foo', 123).option('name', 'type-challenges').option('bar', { value: 'Hello World' }).get();

// expect the type of result to be:

interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}

// You don't need to write any js/ts logic to handle the problem - just in type level.
// You can assume that key only accepts string and the value can be anything - just leave it as-is. Same key won't be passed twice.

type Chainable<T = {}> = {
  option: <K extends string, V>(key: K, value: V) => Chainable<T & { [P in K]: V}>
  get: () => T
}
```

1. 分析题目意图：
   1. 实现一个 `Chainable`，可以使用对象类型或者 `class` 来实现，需要包括 `option(key, value)` 和 `get()` 这两个方法。
   2. `option` 方法可以扩展 `config` 的类型，通过 `get` 来获得最终的类型。
   3. 不需要写 js 逻辑来处理这个问题
   4. 可以假设 `key` 只有 `string`，`value` 为 `any`。
   5. 相同的 `key` 不能被传递两次。
2. 尝试实现：

```ts
// 很好，但是我们无法得到 T；所以，接下来我们该对 T 进行扩展
type Chainable1<T = {}> = {
  option: (key: string, value: any) => Chainable<T>
  get: () => T
}
// 如何将 key 和 value 加入到扩展类型中？
// 肯定需要定义新的泛型来表示 key 和 value 了
type Chainable2<T = {}> = {
  option: <K extends string, V>(key: K, value: V) => Chainable<T & { [P in K]: V }>
  get: () => T
}
// 很好，但是还有一个问题，那就是相同的 key 不能被传递两次，我们上面的类型无法约束；所以，接下来我们来约束 K
type Chainable3<T = {}> = {
  option: <K extends string, V>(key: K extends keyof T ? never : K, value: V) => Chainable<T & { [P in K]: V }>
  get: () => T
}

// 结果：
type Chainable<T = {}> = {
  option: <K extends string, V>(key: K extends keyof T ? never : K, value: V) => Chainable<T & { [P in K]: V }>
  get: () => T
}
```

总结：

1. `T = {}` 可以默认给泛型赋值
2. 如果要给一个对象类型扩展类型的话，需要定义 K 和 V 额外的泛型来实现，简单来说就是借助泛型来当变量使用
3. 注意题目中的约束 `K extends keyof T ? never : K`

## 实现 First

Implement a generic `First<T>` that takes an Array T and returns its first element's type.

For example:

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

1. 分析题目意图：这个题乍一看挺简单，实现一个泛型 `First<T>` 返回数组的第一个元素
2. 实现思路：直接返回 `T[0]` 完事了

但是！！！这种简单的题也不能忘记兜底，一定要确定传入的 `T` 是数组并且有元素才行。

下面是三中不同的方式来判断 `T` 是否是空数组。

```ts
type First<T extends any[]> = T extends [] ? never : T[0];

type First<T extends any[]> = T extends [infer F, ...infer Rest] ? F : never;

type First<T extends any[]> = T['length'] extends 0 ? never : T[0];
```

## 实现 Last

Implement a generic `Last<T>` that takes an Array T and returns its last element.

For example:

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

1. 分析题目意图：使用泛型 `Last<T>` 拿到数组中最后一个元素
2. 实现思路：断言最后一个元素，存在就返回

```ts
type Last<T extends any[]> = T extends [...infer Rest, infer L] ? L : never;

// 往数组前面添加一个 any，然后再拿到 T['length'] 就是最后一个元素 ！！！🫜🫜🫜
type Last<T extends any[]> = [any, ...T][T['length']];
```
