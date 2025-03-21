---
title: TypeScript 体操1
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

## 实现 MyPick

Implement the built-in Pick<T, K> generic without using it.

Constructs a type by picking the set of properties K from T

For example:

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
```

1. 分析题目意图，实现类似 `MyPick<T, K>` 的功能，换句话说就是选择泛型 `T` 中的属性，这个属性由 `K` 来定义。
2. 需要哪些知识？
   1. 泛型 ✅
   2. 泛型 `T` 属于 `K` 的属性选择出来，与上面 `MyOmit` 相反
3. 如何解题？

```ts
type MyInclude<T, U> = T extends U ? T : never;
type MyPick<T, K extends keyof any> = {
  [P in MyInclude<keyof T, K>]: T[P]
};
```

## 实现 GetReadonlyKeys

Implement a generic `GetReadonlyKeys<T>` that returns a union of the readonly keys of an Object.

For example

```ts
interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"

```

1. 分析题目意图：获取到泛型 `T` 中是 `readonly` 的属性，返回联合类型。
2. 需要哪些知识？
   1. 泛型 ✅
   2. 获取类型对象的只读属性
      1. `T[K]` 这样是获取到属性值
      2. `keyof T` 是获取属性，再进行 `readonly` 的筛选判断
         1. `type MyReadonlyKey<T extends keyof any> = T extends readonly T ? T : never;` ❌ 无法通过这种方式拿到具有 `readonly` 的属性
      3. 核心还是怎样筛选出来只读类型，👆上面的方法不行，只能通过一个辅助类型函数 `Equal<T, U>` 来判断两个类型对象是否相等来筛选只读属性了
         1. `type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false`
         2. 知道了如何判断只读属性，还得知道一个知识：`type foo<T> = { [K in keyof T as NewType]: T[K] }` 这里的 `as` 代表类型映射，意思是 `K` 最终被影射为 `NewType`
3. 有了这些知识就可开搞了！

`<T>() => T extends X ? 1 : 2` 这个是个什么东西？

其实这是一个泛型函数，仔细看定义一个泛型 `T` 给一个没有入参的函数，然后用泛型 `T` 来判断返回值，这样可以延迟判断。

`[K in keyof T as Equal<Readonly<{ [P in K ]: T[K]}>, { [P in K]: T[K]}> extends true ? K : never]` 这又是什么？

这个的意思就是逐个判断 `K` 属性是否是只读的，如果是 `[K in keyof T as Equal<Readonly<T>, T> extends true ? K : never]` 相当于直接判断整个类型对象，那肯定不对。

```ts
// TS 中的严格比较
type Equal<X, Y> =
  { <T>() => T extends X ? 1 : 2 }
  extends
  { <T>() => T extends Y ? 1 : 2 }
  ? true : false;

type GetReadonlyKeys<T> = keyof {
  [K in keyof T as Equal<Readonly<{ [P in K ]: T[K]}>, { [P in K]: T[K]}> extends true ? K : never]: T[K]
};
```

## 实现 MyReadOnly

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

// 将所有属性都设置 readonly 
type MyReadOnly1<T> = {
  readonly [K in keyof T]: T[K]
}

// 选择性的设置 readonly
type MyReadOnly2<T, K extends keyof T> = Omit<T, K> & {
  +readonly [P in K]: T[P]
}

type MyReadOnly2Other<T, K extends keyof T> = {
  readonly [P in K]: T[P]
} & {
  [key in keyof T as key extends K ? never : key]: T[key]
}
```
