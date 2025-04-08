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

## 反转链表

> <https://leetcode.cn/problems/reverse-linked-list/>

1. 分析题目意图：反转链表，很好理解，就是将原本的链表按照反方向生成一个新的链表 ❌
2. 实现思路：❌
   1. 创建一个空的链表头节点
   2. 遍历原来的链表，将每个节点指向前一个节点

以上的思考分析有问题，重新换思路：

1. 分析题目意图：反转链表，也就是需要一个“过去链表”来记忆前一个链表的头节点，在当前链表遍历结束的情况下，过去的链表的头节点也就指向链表的尾节点。
2. 实现思路：
   1. 创建一个“过去链表的头节点” `let prevNode = null;`
   2. 遍历当前的链表，暂存当前链表的下一个节点，因为要保证遍历完成，然后将当前链表的头节点指向过去链表的头节点 `head.next = prevNode;`
   3. 将“过去链表”的头节点赋值为当前的链表头节点 `prevNode = head;`
   4. 处理下一个节点 `head = tempNextHead;`
   5. 遍历结束，最终 `prevHead` 就是反转后链表的头节点

```ts
function reverseList(head: ListNode | null): ListNode | null {
  if (!head) return null;
  let prevHead = null;

  while (node) {
    const tempNextHead = head.next;

    head.next = prevHead;
    prevHead = head;

    head = tempNextHead;
  }

  return prevHead;
};
```

## 删除链表中的节点

> <https://leetcode.cn/problems/delete-node-in-a-linked-list/>

1. 分析题目意图：有一个链表的头节点 `head`，给你提供 `node` 节点（这个节点不是尾节点，一定是头节点和尾节点之间的节点），把这个 `node` 节点删除掉
2. 实现思路：
   1. `node = node.next;` ❌ 为什么？因为 `node` 是传入的形参，直接这样修改的话只是改了传入的 `node`，并不会影响原本的链表。
      1. 原来链表：4->5->1->2->3 传入的 `node` 为 5->1->2->3
      2. `node = node.next;` `node` 变为1->2->3，原来链表没变
   2. 换种思路：原来链表：4->5->1->2->3 传入的 `node` 为 5->1->2->3
      1. `node.val = node.next.val;` 原来链表变为 4->1->1->2->3，`node` 为 1->1->2->3
      2. `node.next = node.next.next;` 原来链表变为 4->1->2->3，`node` 为 1->2->3

```ts
function deleteNode(node: ListNode | null): void {
    node.val = node.next.val; // 保证链表不断
    node.next = node.next.next;
};
```

## 两数相加

> <https://leetcode.cn/problems/add-two-numbers/>

1. 分析题目意图：两个链表，按照相同的顺序相加，每个节点小于10，如果大于等于10的话想后进位，如果存在进位的情况则需要一直加到结束，如果某一个链表已经遍历结束并且没有进位的情况下，另一个链表还有下一位则直接将结果的下一位指向未完成相加的节点。
2. 实现思路：
   1. 定义一个空链表来存储结果
   2. 随意遍历 l1 和 l2 两个链表，并声明临时变量(`step`)存储进位情况
   3. 如果 l1 和 l2 的节点都存在，则 `l1.val + l2.val + step` 并判断是否大于 10，大于 10，需要变更临时变量 `step`
   4. 如果只有其中一个链表还存在节点，那么判断是否还存在 `step` 不存在直接更改链表指向，存在需要继续计算
   5. 遍历完返回结果

```ts
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const head = new ListNode();
    let node = head;
    let step = 0;
    while (l1 || l2) {
        let num = 0;
        num = (l1?.val || 0) + (l2?.val || 0) + step;
        if (num > 9) {
            num -= 10;
            step = 1;
        } else if (num ===0 && !l1?.next && !l2?.next) {
            return head;
        } else {
            step = 0;
        }
        node.next = new ListNode(num);
        l1 = l1?.next;
        l2 = l2?.next;
        node = node.next;
    }
    if (step) {
        node.next = new ListNode(step);
    }
    return head.next;
};
```

## 删除排序链表中的重复元素

> <https://leetcode.cn/problems/remove-duplicates-from-sorted-list/>

1. 分析题目意图：删除排序链表中的重复元素，那就是判断当前节点的值是否和下个节点的值相等，相等的话就改变 next 的指向，不相等就继续遍历处理下个节点。
2. 实现思路：
   1. 定义一个额外的指针用来处理当前节点的值是否和“下一个节点的值”相等的情况
   2. 遍历链表直到所以节点处理完成

```ts
function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head) return head;
    let nextNode = head.next;
    const node = head;
    while (head) {
        if (head.val === nextNode?.val) {
            nextNode = nextNode?.next;
        } else {
            head.next = nextNode;
            head = head.next;
            nextNode = nextNode?.next;
        }
    }
    return node;
};
```
