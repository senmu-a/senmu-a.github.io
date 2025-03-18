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

```ts
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

## 翻转二叉树

> <https://leetcode.cn/problems/invert-binary-tree/description/>

> Tips: 可以拿图画一下二叉树，然后再画下翻转后的二叉树。

核心理念：无所谓遍历方式，需要将存在左节点或者右节点的节点交互位置

  ~~1. 使用队列进行层序遍历，需要注意要从右节点开始加入队列~~
  ~~2. 思考🤔：能不能使用栈？ 应该是可以的，但是必须是深度遍历且要注意入栈的顺序~~

```ts
// 输入：[4,2,7,1,3,6,9]
// 输出：[4,7,2,9,6,3,1]
// 时间复杂度：O(n) n为节点数
// 空间复杂度：O(w) w为树的宽度
function invertTree(root: TreeNode | null): TreeNode | null {
  // 容错
  if (!root) return root;
  // 队列，用来层序将节点入队
  let node = root;
  let queue = [node];
  while (queue.length) {
    const n = queue.shift();
    if (n?.left || n?.right) {
      const temp = n?.left;
      n.left = n.right;
      n.right = temp;
      queue.push(n?.left, n?.right);
    }
  }
  return root;
};
```

## 相同的树

> <https://leetcode.cn/problems/same-tree/>

核心理念：分治的思想。

什么是分治的思想？

1. 拆分 - 将问题拆解为一个最小的问题
2. 解决 - 解决问题
3. 合并 - 合并结果

那这个题拆成最小问题即为：树的值相同、树的左子节点相同、树的右子节点相同

```ts
// 输入：p = [1,2,3], q = [1,2,3]
// 输出：true
// function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
//   if (!p && !q) return true;
//   if (!p && q) return false;
//   if (p && !q) return false;
//   const queue = [[p, q]];
//   while (queue.length) {
//     const [node, node1] = queue.shift();
//     if (node.val !== node1.val) return false;
//     if (node.left && node1.left) {
//         queue.push([node.left, node1.left]);
//     } else if (node.left && !node1.left) {
//         return false;
//     } else if (!node.left && node1.left) {
//         return false
//     }
//     if (node.right && node1.right) {
//         queue.push([node.right, node1.right]);
//     } else if (node.right && !node1.right) {
//         return false;
//     } else if (!node.right && node1.right) {
//         return false;
//     }
//   }
//   return true;
// };
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```

## 爬楼梯

> <https://leetcode.cn/problems/climbing-stairs/>

核心理念：

  1. 分解问题，当 n 等于 1 或者 2 时为其本身；等于 3 时为 1 + 2；得出结论：当 n > 2 时为 (n - 1) + (n - 2)....直白来说就是当前的方法数为前两种方法数之和。
  2. 另外需要注意的是需要记录下来 n 之前每个数的结果这样到 n 的时候才是 n - 1 + n - 2

```ts
function climbStairs(n: number): number {
    if (n === 1 || n === 2) return n;
    // 分解问题
    let p = 1;
    let q = 2;
    let e = 0;

    for (let i = 2; i <= n; i++) {
      e = p + q;
      p = q;
      q = e;
    }
    return e;
};
```

## 背包问题

## 最长公共子序列问题

## 最短路径

## 打家劫舍

> <https://leetcode.cn/problems/house-robber/>

- 结果是什么？算出 n 以内最大的和
- 条件是什么？求和时必须相隔一个或以上
- 步骤是什么？下面模拟场景已经推导出步骤
- 模拟场景：（n 为 数组长度，r 为结果，arr 为数组，i 为下标值，dp 是累加数组）
  - 当 n 为 1 时，r 为 arr[0]；
  - 当 n 为 2 时，r 为 `Math.max(arr[0], arr[1])`；
  - 当 n 为 3 时，r 为 `Math.max(arr[1], arr[0] + arr[2])`；
    - i = 0; `dp[i] = arr[i]`
    - i = 1; `dp[i] = Math.max(dp[i - 1], arr[i])`
    - i = 2; `dp[i] = Math.max(dp[i - 1], arr[i])`
  - 当 n 为 4 时，假设：`[1,2,3,1]`，r 应为 1 + 3 => 4
    - i = 0; `dp[i] = arr[i]` => 1
    - i = 1; `dp[i] = Math.max(dp[i - 1], arr[i])` => 1 ? 2 => 2
    - i = 2; `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])` => 2 ? 4 => 4
    - i = 3; `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])` => 4 ? 2 => 4
    - 得出结论 `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])`
  - 当 n 为 5 时，假设：`[2,7,9,3,1]`，r 应为 2 + 9 + 1 => 12
    - i = 0; `dp[0] = 2`
    - i = 1; `dp[1] = 7`
    - i = 2; `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])` => 7 ? 9 + 2 => 11
    - i = 3; `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])` => 11 ? 3 + 7 => 11
    - i = 4; `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])` => 11 ? 1 + 11 => 12
    - 证明结论合理
- `dp[i] = Math.max(dp[i - 1], arr[i] + dp[i - 2])`

```ts
/**
 * 基础版
 * 时间复杂度：O(n)
 * 空间复杂度为：O(n)
*/
function rob1(nums: number[]): number {
  const len = nums.length;
  if (len === 1) return nums[0];
  if (len === 2) return Math.max(nums[0], nums[1]);
  const dp = [];
  dp.push(nums[0]);
  dp.push(Math.max(nums[0], nums[1]));
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }
  return dp.pop();
};

/**
 * 优化空间复杂度
*/
function rob2(nums: number[]): number {
  const len = nums.length;
  if (len === 1) return nums[0];
  if (len === 2) return Math.max(nums[0], nums[1]);
  let q = nums[0];
  let p = Math.max(nums[0], nums[1]);
  let r = 0;

  for (let i = 2; i < len; i++) {
    r = Math.max(p, nums[i] + q);
    q = p;
    p = r;
  }
  return r;
};
```

## 分发饼干

> <https://leetcode.cn/problems/assign-cookies/>

贪心算法，尽可能多的满足每个小孩的胃口，那换句话说就是满足每个小孩最小的胃口就好了。

那怎样能保证尽可能多的满足小孩的胃口呢？ 需要将每个小孩和饼干尺寸按小到大排序，将大胃口的小孩和大尺寸的饼干留到最后再使用。

```ts
/**
 * 结果是什么？ 尽可能多的满足小孩的胃口（但是要注意一个小孩最多分一个饼干）
 * 步骤是什么？ 
 *    - 将小孩的胃口 g 和饼干 s 的尺寸从小到大排序
 *    - 定义两个指针 i 和 j，分别来指向小孩和饼干
 *    - 遍历小孩和饼干，判断是否 s[j] >= g[i]，如果是的话则 i++（注意：不论是否条件满足 j 都要 ++）
 * 时间复杂度：O(nlogn) sort 排序算法需要的复杂度
 * 空间复杂度：O(i)
*/
function findContentChildren(g: number[], s: number[]): number {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    let i = 0;
    let j = 0;
    
    while (i < g.length && j < s.length) {
      if (s[j] >= g[i]) {
        i++;
      }
      j++;
    }
    return i;
};
```

## 买卖股票的最佳时机 II

> <https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/>

推荐指数：⭐️⭐️⭐️⭐️⭐️

核心理念：**局部最优解相加就是最优解**。

因为题目只需要算出最大的利润，那么就是说我们只需要计算出每一步的最大利润然后相加就好。

⚠️另外要注意：贪心算法的计算只是算出最大利润，并不代表每次都要进行交易。

```ts
// 输入 prices = [7,1,5,3,6,4]
// 得出 7
// [7,1,5,8,6,4]
function maxProfit(prices: number[]): number {
  let total = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i - 1] < prices[i]) {
      total += prices[i] - prices[i - 1];
    }
  }
  return total;
};
```

## 全排列

> <https://leetcode.cn/problems/permutations/>

- 结果是什么？将所有排列的情况都输出出来
- 思想是什么？回溯算法
  - 先深度递归直到数组末尾（递归终止条件）
  - 回溯
- 步骤是什么？
  - 创建结果数组 result，创建内层缓存数组 temp
  - **回溯算法**
    - 递归终止条件 - 当 temp 的长度与 nums 的长度相等就将 temp 保存的内容添加到 result 中
    - 从头开始遍历 nums
      - 跳过已经添加进 temp 的元素
      - 将 nums[i] 添加进 temp
      - **递归回溯算法**
      - 删除添加进 temp 中的元素（回溯）
  - 返回结果数组 result

```ts
/**
 * 时间复杂度：O(n! * n) 递归的深度是 n，并且每层递归中都需要循环 n、n-1、n-2... 总共是 n!
 * 空间复杂度是 O(n) 递归的深度是 n，temp 数组需要 o(n) 的空间
*/
function permute(nums: number[]): number[][] {
    const result = [];
    const temp = [];

    // 回溯算法
    backtrack(result, temp, nums);

    return result;
};

function backtrack(result, temp, nums) {
  if (temp.length === nums.length) {
    result.push([...temp]);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (temp.includes(nums[i])) continue;
    temp.push(nums[i]);
    backtrack(result, temp, nums);
    temp.pop();
  }
}
```

## 子集

> <https://leetcode.cn/problems/subsets/>

- 结果是什么？ 输出一个集合/数组的全部子集情况（包括空）
- 思想是什么？ 回溯算法
  - 还是深度递归，需要维护一个不断增长的「起始指针」用于排除掉前面已经输出的子集
  - 将每一种情况都添加进结果数组
- 步骤是什么？
  - 创建结果数组 result，创建起始指针 startIndex，创建缓存数组 temp
  - 执行回溯算法（处理结果数组）
    - 将缓存数组添加进 result
    - 从 startIndex 开始遍历所有的元素，**注意，这里和上面全排列有点区别**，因为它需要排除掉前面已经添加到子集的元素，而全排列不需要
    - 将 nums[i] 添加进 temp（入）
    - 深度递归（需要将 i + 1 赋值给 startIndex）
    - 回溯（出）
  - 返回结果数组

```ts
/**
 * 时间复杂度：O(2^n * n)
 *    - 对于长度为 n 的数组，总共有 2 ^ n 个子集（每个元素都有“选”与“不选”两种状态）
 *    - 每次找到一个子集时，需要 O(n) 的时间复制临时数组到结果中
 * 空间复杂度：O(n) n 指的是所有符合条件的子集数
*/
function subsets(nums: number[]): number[][] {
   const reuslt = [];
   const temp = [];
   let startIndex = 0;

   // 执行回溯算法，处理 result
   backtrace(result, temp, nums, startIndex);

   return result;
};

function backtrace(result: number[][], temp: number[], nums: number[], startIndex: number) {
  result.push([...temp]);

  for (let i = startIndex; i < nums.length; i++) {
    temp.push(nums[i]);
    backtrace(result, temp, nums, i + 1);
    temp.pop();
  }
}

```
