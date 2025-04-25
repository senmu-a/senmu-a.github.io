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

## 实现一个 jsonp

创建一个 `script` 标签，写入地址并给 `query` 传一个函数，然后将该标签插入文档 `body` 中。

```js
const script = document.createElement('script');
script.src = 'www.qiandu.com?callback=fn';
document.body.appendChild(script);
function fn(data) {
  console.log(data);
}
```

## 实现 Promise TODO

核心理念：

- 有三个状态，并且状态不可逆
- 需要两个队列，成功状态的和失败状态的
- 一个结果 result
- 链式调用

```ts
enum EPromiseState {
  PENDING = 'pending',
  FULLFILLED = "fullfilled",
  REJECTED = "rejected"
}
class MyPromise<T = unknown> {
  state: EPromiseState;
  result: T;
  onFulfilledCallbacks: Array<(value: T) => void>;
  onRejectedCallbacks: Array<(reason: any) => void>;

  constructor(callback: (resolve, reject) => MyPromise) {
    this.state = EPromiseState.PENDING;
    this.result = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value: T) => {
      if (this.state === EPromiseState.PENDING) {
        this.state = EPromiseState.FULFILLED;
        this.result = value;
        this.onFulfilledCallbacks.forEach(callback => callback(value));
      }
    };
    
    const reject = (reason: any) => {
      if (this.state === EPromiseState.PENDING) {
        this.state = EPromiseState.REJECTED;
        this.result = reason;
        this.onRejectedCallbacks.forEach(callback => callback(reason));
      }
    };

    try {
      callback(resolve, reject);
    } catch(err) {
      reject(error);
    }
  }

  static resolve(value?: T): MyPromise<T> {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  then(cb, errCb) {
    const queuePromise = new MyPromise();
    
  }

  catch(cb) {

  }
}
```

## 实现深拷贝

```ts

// 基本正确，但是有缺陷
// 1. 没处理循环引用的情况
// 2. Map 和 Set 的处理有问题
function deepClone(obj) {
  // 1. 判断 obj 是否存在，不存在直接返回
  // 2. 判断 obj 是否是基本类型，是的话直接返回
  // 3. 判断 obj 是否是其他引用类型，例如：正则、日期对象、Promise 对象、Map、Set
  // 4. 判断 obj 是否是数组，是的话进行遍历，然后递归调用 deepClone
  // 5. 判断 obj 是否是对象，是的话遍历对象，递归调用 deepClone
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.pattern, obj.flags);
  if (obj instanceof Promise) return Promise.resolve(obj);
  if (obj instanceof Map) return new Map(obj.entries());
  if (obj instanceof Set) return new Set(obj.entries());
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    const result = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
    return result;
  }
  return obj;
}

// 正确版本 ✅
function deepClone(obj) {
  // 创建 WeakMap 用于存储已克隆的对象，防止循环引用
  const hash = new WeakMap();

  function _deepClone(_obj) {
    // 1. 判断 obj 是否存在，不存在直接返回
    // 2. 判断 obj 是否是基本类型，是的话直接返回
    // 3. 判断 obj 是否是其他引用类型，例如：正则、日期对象、Promise 对象、Map、Set
    // 4. 判断 obj 是否是数组，是的话进行遍历，然后递归调用 deepClone
    // 5. 判断 obj 是否是对象，是的话遍历对象，递归调用 deepClone
    if (_obj === null || typeof _obj !== 'object') return _obj;
    if (hash.has(_obj)) return hash.get(_obj);
    if (_obj instanceof Date) return new Date(_obj.getTime());
    if (_obj instanceof RegExp) return new RegExp(_obj.pattern, _obj.flags);
    if (_obj instanceof Promise) return Promise.resolve(_obj);
    if (_obj instanceof Date) return new Date(_obj.getTime());
    if (_obj instanceof RegExp) return new RegExp(_obj.pattern, _obj.flags);
    if (_obj instanceof Promise) return Promise.resolve(_obj);
    if (_obj instanceof Map) {
      const map = new Map();
      hash.set(_obj, map);
      _obj.forEach((value, key) => {
        map.set(key, _deepClone(value));
      });
      return map;
    }
    if (_obj instanceof Set) {
      const set = new Set();
      hash.set(_obj, set);
      _obj.forEach(value => {
        set.add(_deepClone(value));
      });
      return set;
    }
    if (Array.isArray(_obj)) {
      const arr = [];
      hash.set(_obj, arr);
      return _obj.forEach((item, index) => {
        arr[index] = _deepClone(item);
      });
    }
    if (Object.prototype.toString.call(_obj) === '[object Object]') {
      const result = {};
      hash.set(_obj, result);
      for (const key in _obj) {
        if (_obj.hasOwnProperty(key)) {
          result[key] = _deepClone(_obj[key]);
        }
      }
      return result;
    }
  }
  
  return _deepClone(obj);;
}
```

## 函数防抖

不要有多次触发/执行，最后一次触发/执行才执行

```ts
function debounce(fn) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, 500);
  }
}
```

## 函数节流

想象一下水流，从高处到低处水会一直流出来，想要节流应该怎么办呢？那就是设置一个阀门，打开阀门后一段时间内水才能通过，阀门关闭后一段时间才能打开。

```ts
function throttle(fn) {
  let timer = null;
  return (...args) => {
    // 阀门不开，不允许运行任务
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, 500);
  }
}
```

## 函数柯理化

```ts
const add = (a: number, b: number) => a + b;
const three = add(1, 2);

const curriedAdd = Currying(add);
const five = curriedAdd(2)(3);

function Currying(fn) {
  // 收集回调函数的参数，拿到他有几个入参，便于判断
  const fnLen = fn.length;
  return function curried(args) {
    if (args.length >= fnLen) {
      return fn.apply(this, args);
    } else {
      return function(...newArgs) {
        return curried([...args, ...newArgs]);
      }
    }
  }
}
```
