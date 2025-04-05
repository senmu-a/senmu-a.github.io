---
title: 二刷算法题
date: 2025/04/04
author: senmu
---

## 利用栈进行二叉树前序遍历

> <https://leetcode.cn/problems/binary-tree-preorder-traversal/>

- 时间复杂度：O(n) n 是二叉树节点的数量
- 空间复杂度：O(n) n 是 `result` 的长度

```ts
function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const stack: TreeNode[] = [];
  const result: number[] = [];

  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    result.push(node);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
  return result;
};
```

## 有效的括号

> <https://leetcode.cn/problems/valid-parentheses/description/>

看了提示做出来了。

关键点：

1. 使用栈
2. 遇到开括号入栈
3. 遇到闭括号出栈与闭括号比较是否是一对

```ts
// 建立映射表
const map = {
  '(': ')',
  '[': ']',
  "{": '}'
}
function isValid(s: string): boolean {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const str = s.charAt(i);
    if (str in map) {
        stack.push(str);
    } else {
        if (stack.length === 0) return false;
        const node = stack.pop();
        if (map[node] !== str) return false;
    }
  }
  return stack.length === 0;
};
```

## 代码打印顺序

```ts
const pro = new Promise((resolve, reject) => {
  const innerpro = new Promise((r, reject) => {
    setTimeout(() => {
      r(1);
    })
    console.log(2);
    r(3);
  });
  resolve(4);
  innerpro.then((res) => console.log(res));
  console.log('yideng');
});

pro.then((res) => console.log(res));
console.log('end');
```

2
'yideng'
'end'
4 ❌ 3 ✅
3 ❌ 4 ✅

pro 先入栈，innerpro 后入，先出，所以应该是 3 优先

## 最近的请求次数 ⭐️⭐️⭐️⭐️⭐️

> <https://leetcode.cn/problems/number-of-recent-calls/>

1. 分析题目意图：计算 `[t-3000, t]` 内发生的请求数，并且是闭区间，换句话说，已经 ping 过的请求大于 `t-3000` 就算是发生了请求。
2. 解题思路：
   1. 将计算好的区间 `[t-3000, t]` 添加进数组中，然后遍历数组判断旧的请求是否满足 `[t-3000, t]` 区间。
   2. 将 `t` 加入队列，如果 `t < t-3000` 就出队，最后返回队列长度。

```ts
class RecentCounter {
    queue: number[]
    constructor() {
      this.queue = [];
    }

    ping(t: number): number {
        this.queue.push(t);
        while (this.queue[0] < t-3000) {
            this.queue.shift();
        }
        return this.queue.length;
    }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
```
