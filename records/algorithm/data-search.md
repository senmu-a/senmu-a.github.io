---
title: 排序算法
date: 2025/02/28
author: senmu
---

## 顺序搜索

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function sequentialSearch(arr, num) {
  // 容错处理
  if (!Array.isArray(arr) || !arr.length) return -1;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      return i;
    }
  }
  return -1;
}

console.log(sequentialSearch(arr, 5)); // 输出: 4
console.log(sequentialSearch(arr, 10)); // 输出: -1
```
