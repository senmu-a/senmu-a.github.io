---
title: 排序算法
date: 2024/11/15
author: senmu
---

## 选择排序

核心理念：每次选择 `[i, len-1]` 区间中的最小元素与 `i` 位置的元素交换位置，之后将 `i++` 直到最后一个元素。

```js
/**
 * 给定数据 let arr = [5, 3, 2, 4, 1];
 * 排序后数据 arr = [1, 2, 3, 4, 5];
 */
function selectionSort(arr) {
  // 容错处理
  if (!Array.isArray(arr) || !arr.length) return [];
  const len = arr.length;
  let minIndex = 0;
  // 从头到尾遍历一遍，保证每个元素都为“已排序”状态
  for (let i = 0; i < len; i++) {
    minIndex = i;
    // 内层循环找到 [i, len-1] 区间中最小的元素
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
    }
  }
}
let arr = [5, 3, 2, 4, 1];
selectionSort(arr);
console.log(arr) // [1, 2, 3, 4, 5]
```
