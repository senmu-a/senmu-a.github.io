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
