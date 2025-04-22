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

## 实现 Replace

Implement `Replace<S, From, To>` which replace the string From with To once in the given string S

For Example:

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'>; // expected to be 'types are awesome!'
```

1. 分析题目意图：替换类型中的某块内容
2. 实现思路：
   1. 应该是要递归判断字符串内容是否与 `From` 相同，相同的话用 `To` 替换掉 ❌
   2. 直接使用 `infer` 断言就行

```ts
type Replace<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer F}${From}${infer R}` ? `${F}${To}${R}` : S;
```

## 实现 ReplaceAll

Implement `ReplaceAll<S, From, To>` which replace the all the substring From with To in the given string S

For example:

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''>; // expected to be 'types'
```

1. 分析题目意图：替换掉类型中所有匹配到的内容
2. 实现思路：
   1. 应该是要递归判断了

```ts
type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer F}${From}${infer R}` ? `${F}${To}${ReplaceAll<R, From, To>}` : S;
```

## 实现 All

Returns true if all elements of the list are equal to the second parameter passed in, false if there are any mismatches.

For example:

```ts
type Test1 = [1, 1, 1];
type Test2 = [1, 1, 2];

type Todo = All<Test1, 1>; // should be same as true
type Todo2 = All<Test2, 1>; // should be same as false
```

1. 分析题目意图：如果列表中所有的元素都等于第二个参数的值，返回 `true` 否则返回 `false`
2. 实现思路：
   1. 将数组转成联合类型，然后判断是否等于第二个参数
   2. 遍历数组，一个一个的判断是否相等

```ts
type Equal<X, Y> =
   (<T>() => T extends X ? 1 : 2) extends
   (<T>() => T extends Y ? 1 : 2) ?
   true : false;

type All<T extends any[], V> = T extends (infer U)[] ? Equal<U, V> : false;

type All<T extends any[], V> = T[number] extends V ? true : false;
```

## 实现 OmitByType

From T, pick a set of properties whose type are not assignable to U.

For Example:

```ts
type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }
```

1. 分析题目意图：将泛型 T 中含有泛型 U 类型的属性给排除掉
2. 实现思路：
   1. 遍历对象 key，拿到 `T[K]` 然后做断言判断
   2. 排除掉 `T[K]` extends `U` 的属性即可

```ts
// ❌
type OmitByType<T extends {}, U> = {
   [K in keyof T]: T[K] extends U ? never : T[K]
}
// ✅
type OmitByType<T extends {}, U> = {
   [K in keyof T as T[K] extends U ? never : K]: T[K]
}
```
