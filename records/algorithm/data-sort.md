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

## 插入排序

核心理念：类似扑克牌整理牌，依次从未排序区拿一个元素，然后根据大小插入已排序区

```js
let array = [12, 11, 13, 5, 6];
function insertionSort(arr) {
  // 容错处理
  if (!Array.isArray(arr) || !arr.length) return [];
  // 已排序区
  const arrEd = [arr[0]];
  // 是否被添加进已排序区
  let flag = false;
  for (let i = 1; i < arr.length; i++) {
    flag = false;
    for (let j = arrEd.length - 1; j >= 0; j--) {
      if (arr[i] > arrEd[j] && !flag) {
        arrEd.splice(j+1, 0, arr[i]);
        flag = true;
        break;
      }
    }
    if (!flag) {
      arrEd.unshift(arr[i]);
    }
  }
  return arrEd;
}
const arr = insertionSort(array);
console.log(arr);
```

## 归并排序

核心理念：

  1. 分治理念
  2. 具体划分为**分解**和**合并**
    - **分解**：把数组不断地二分，直到数组的长度小于2
    - **合并**：将拆分出来的数组按照顺序合并到一起

```js
let array = [4, 2, 5, 1, 6, 3];
// 1. 分解数组
function mergeSort(arr) {
  // 容错处理
  if (!Array.isArray(arr) || !arr.length) return [];
  // 递归的终止条件
  if (arr.length < 2) return arr;
  // 找到二分点
  const mid = Math.floor(arr.length/2);
  const arrLeft = arr.slice(0, mid);
  const arrRight = arr.slice(mid, arr.length);
  return merge(mergeSort(arrLeft), mergeSort(arrRight));
}

// 2. 合并数组
function merge(left, right) {
  // 存放合并后的数组
  const result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  // 左侧或者右侧已经添加进合并后的数组，发现还存在有未添加的
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}
const arr = mergeSort(array);
console.log(arr);
```
