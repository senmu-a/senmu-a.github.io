---
title: 手写题
date: 2025/04/02
author: senmu
---

## 实现一个 Curry 方法

Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.

For example:

```ts
const add = (a: number, b: number) => a + b;

const three = add(1, 2);



const curriedAdd = Currying(add);

const five = curriedAdd(2)(3);
```

The function passed to Currying may have multiple arguments, you need to correctly type it.

In this challenge, the curried function only accept one argument at a time.
Once all the argument is assigned, it should return its result.

1. 分析题目意图：
   1. 需要实现一个 `Currying` 函数，可以将一次按顺序传入多个参数的函数变成一个参数一个参数的传递。
   2. 注意：`Currying` 函数可能有多个参数，需要正确处理。
   3. 柯理化后的函数一次只接受一个参数、所有参数传递完成后返回结果。
2. 实现思路：
   1. `Currying` 函数接收多个参数，需要处理函数与参数
   2. `Currying` 函数返回一个柯理化后的函数，该函数可以经过多次调用，但是每次调用只能传递一个参数，所有参数传递完返回结果。
3. 具体步骤：
   1. 创建 `Currying` 函数体，第一个参数是待柯理化的函数（`callback`），后面是参数（`...args`）。
   2. 通过 `callback.length` 的方式拿到回调函数需要多少参数，记录下来。
   3. 创建 `params` 数组存储已经添加过的参数，用于判断是否已经够需要传递参数的数量，默认将 `...args` 传入。
   4. 返回一个 `fn` 函数接收一个参数 `param`。
      1. 将 `param` 添加进 `params` 数组中
      2. 判断 `params` 数组的长度是否与 `callback.length` 相等，相等的话就返回计算结果
      3. 否则返回 `fn` 函数

```ts
// ❌
function Currying(callback: (...args: any[]) => any, ...args: any[]) {
  // callback 函数所需要的参数
  const argLen = callback.length;
  // 存储已加入的参数列表
  const params = [...args];
  return function fn(param: any) {
    params.push(param);
    if (params.length === argLen) {
      return callback.apply(null, params);
    } else {
      return fn
    }
  }
}

// ✅
function Currying(callback: (...args: any[]) => any) {
  return function curried(...args) {
    if (args.length >= callback.length) {
      return callback.apply(this, args);
    } else {
      return function(...newArgs) {
        return curried([...args, ...newArgs]);
      }
    }
  }
}
```

## 手写一个 Promise.all

```ts
function myPromiseAll(arr?: Promise<unknown[]> | unknown[]): Promise<unknown> {
  if (!arr || !arr.length) return Promise.reject('xxx');
  // 包裹非 promise 的情况
  return new Promise((resolve, reject) => {
    const result = [];
    let requestCount = 0;
    arr.forEach((item, index) => {
      Promise.resolve(item).then(res => {
        result[index] = res;
        requestCount++;

        if (requestCount === arr.length) {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      });
    });
  });
}
```

## 手写一个 Promise 节流

```ts
function throttlePromises(promises: Promise<unknown[]> | unknown[], max: number): Promise<unknown[]> {
  if (!promises || !promises.length) return Promise.reject('xxx');
  return new Promise((resolve, reject) => {
    const queue = [...promises];
    const result = [];
    let requestCount = 0;

    function run() {
      if (result.length === promises.length) {
        resolve(result);
      }
      while (requestCount < max && queue.length) {
        const fn = queue.shift();
        requestCount++;
        fn().then((res) => {
          result.push(res);
          requestCount--;
          run();
        }).catch(err => {
          reject(err);
        });
      }
    }
    run();
  });
}
```
