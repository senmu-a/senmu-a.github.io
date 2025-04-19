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

## 实现 RequiredKeys

Implement the advanced util type `RequiredKeys<T>`, which picks all the required keys into a union.

For example:

```ts
type Result = RequiredKeys<{ foo: number; bar?: string }>; // expected to be “foo”
```

1. 分析题目意图：选出必填的属性 key
2. 实现思路：
   1. 利用非必填项可有可无的特性，然后排除掉
   2. 将留下的必填属性的 key 输出出来

```ts
type RequiredKeys<T> = keyof {
  [K in keyof T as Omit<T, K> extends T ? never : K]: T[K]
}
```

## 实现 Capitalize

Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

For example:

```ts
type capitalized = Capitalize<'hello world'>; // expected to be 'Hello world'
```

1. 分析题目意图：字符串中首字母转换为大写字母
2. 实现思路：
   1. 需要找到字符串首字母，然后替换成大写字母

```ts
type MyCapitalize<T extends string> = T extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : T;
```

## 实现 TrimLeft

Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.

For example:

```ts
type trimed = TrimLeft<'  Hello World  '>; // expected to be 'Hello World  '
```

1. 分析题目意图：将字符串的左侧的空格给删掉
2. 实现思路：
   1. 匹配掉空格和后面的字符，然后将空格删掉

```ts
type Space = ' ' | '\n' | '\t';
type TrimLeft<T extends string> = T extends `${Space}${infer R}` ? TrimLeft<R> : T;
```

## 实现 Trim

Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

For example:

```ts
type trimmed = Trim<'  Hello World  '>; // expected to be 'Hello World'
```

```ts
type Space = ' ' | '\n' | '\t';
type Trim<T extends string> = T extends `${Space}${infer R}${Space}` ? Trim<R> : T;
```
