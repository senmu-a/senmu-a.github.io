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

## 翻转二叉树

> <https://leetcode.cn/problems/invert-binary-tree/description/>

> Tips: 可以拿图画一下二叉树，然后再画下翻转后的二叉树。

核心理念：无所谓遍历方式，需要将存在左节点或者右节点的节点交互位置

  ~~1. 使用队列进行层序遍历，需要注意要从右节点开始加入队列~~
  ~~2. 思考🤔：能不能使用栈？ 应该是可以的，但是必须是深度遍历且要注意入栈的顺序~~

```js
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
