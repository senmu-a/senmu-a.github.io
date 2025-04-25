---
title: 高频算法
date: 2025/04/24
author: senmu
---

## 最长递增子序列 ⭐️⭐️⭐️

```ts
function lengthOfLIS(nums: number[]): number {
    if (!nums || !nums.length) return 0;
    const dp = new Array(nums.length);
    dp[0] = 1;
    let max = 1;
    for (let i = 1; i < nums.length; i++) {
        dp[i] = 1;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(max, dp[i]);
    }
    return max;
};
```

## 无重复字符的最长子串 ⭐️⭐️⭐️

```ts
// 核心：快指针、慢指针、滑动窗口
function lengthOfLongestSubstring(s: string): number {
    if (!s) return 0;
    const set = new Set();
    let max = 0;
    let slow = 0;
    let fast = 1;
    set.add(s[slow]);

    while (slow < s.length) {
        while (fast < s.length && !set.has(s[fast])) {
            set.add(s[fast]);
            ++fast;
        }
        max = Math.max(max, fast - slow);
        set.delete(s[slow]);
        ++slow;
    }
    return max;
};
```

## 最小覆盖子串 ⭐️⭐️⭐️

```ts
function minWindow(s: string, t: string): string {
    // (ADOBEC)ODEBANC    ABC
    // ADO(BECODEBA)NC
    // ADOBE(CODEBA)NC
    // ADOBECODE(BANC)
    // 滑动窗口 + 哈希表
    const map = new Map();
    for (let key of t) {
        if (!map.has(key)) {
            map.set(key, 1);
        } else {
            map.set(key, map.get(key) + 1);
        }
    }
    let count = map.size;
    let left = 0;
    let right = 0;
    let minLen = Infinity;
    let minStart = 0;
    while (right < s.length) {
        const char1 = s[right];
        if (map.has(char1)) {
            let _count = map.get(char1);
            map.set(char1, --_count);
            if (_count === 0) {
                --count;
            }
        }
        ++right;
        while (count === 0) {
            if (minLen > right - left) {
                minLen = right - left;
                minStart = left;
            }
            const char2 = s[left];
            if (map.has(char2)) {
                let _count = map.get(char2);
                map.set(char2, ++_count);
                if (_count > 0) {
                    ++count;
                }
            }
            ++left;
        }
    }
    return minLen === Infinity ? '' : s.slice(minStart, minStart + minLen);
};
```

## LRU 缓存 ⭐️⭐️⭐️

哈希表+双向链表（头节点、尾节点）

## 两数之和 ⭐️⭐️⭐️

```ts
function twoSum(nums: number[], target: number): number[] {
    // 维护一个哈希表，记录 nums[i]: i
    // 遍历判断差值是否在哈希表中，在的话返回下标值
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
};
```
