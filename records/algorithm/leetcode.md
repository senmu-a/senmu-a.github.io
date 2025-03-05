---
title: leetcode 算法题
date: 2025/03/05
author: senmu
---

## 猜数字大小

> <https://leetcode.cn/problems/guess-number-higher-or-lower/description/>

核心理念：

  1. 二分法！！
  2. 找到左右边界，防止无限二分

```js
var guess = function(num) {}

function guessNumber(n: number): number {
  let left = 0;
  let right = n;

  while (left <= right) {
    // 使用 (left + right) >>> 1 避免整数溢出
    const mid = Math.floor((right + left) / 2);
    const res = guess(mid);

    if (res === 0) {
      return mid; // 猜对了
    } else if (res === -1) {
      right = mid - 1; // 猜大了，往左半部分搜索
    } else {
      left = mid + 1; // 猜小了，往右半部分搜索
    }
  }
  
  return -1; // 实际上题目保证有解，不会返回-1
};
```
