---
title: 取消 Promise
date: 2024/12/27
author: senmu
---

> 引用自 [Canceling a Promise](https://github.com/facebook/react/issues/5465#issuecomment-157888325)

```js
// 这种方法会有个问题，必须等 promise 执行完才能取消
const makeCancelable1 = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      (val) => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      (error) => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
// 更好的取消方式，会立刻取消掉 promise
const makeCancelable2 = (promise) => {
  let onCancel;
  const cancelPromise = new Promise((res, rej) => {
    onCancel = () => rej({ isCanceled: true });
  });
  return {
    promise: Promise.race([promise, cancelPromise]),
    cancel: onCancel,
  };
};
```