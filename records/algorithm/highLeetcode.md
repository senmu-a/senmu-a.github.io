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

## 最小覆盖子串 ⭐️⭐️⭐️

## LRU 缓存 ⭐️⭐️⭐️

## 两数之和 ⭐️⭐️⭐️
