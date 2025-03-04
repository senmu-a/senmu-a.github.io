---
title: 查找算法
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

## 二分搜索/查找

核心理念：

  1. 使用二分法去进行查找的前提是要求数据必须是排好序的，如果没有排好序的话那么需要先进行排序。
  2. 构建排好序的二叉树也简单，从头遍历一遍数组，遵循比“根”节点小的放到左侧，大的放到右侧。

```js
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let target = 7;
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left+right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] > target){
      right--;
    } else {
      left++;
    }
  }
  return -1;
}
console.log(binarySearch(arr, target));
```
