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

## 环形链表

> <https://leetcode.cn/problems/linked-list-cycle/>

1. 分析题目意图：判断当前链表是否是环形链表，可以用一个列表来记录访问过的节点，如果有遇到已访问过的节点，那就是环形链表。
2. 实现思路：
   1. 创建一个列表来记录访问过的节点
   2. 遍历节点，遇到访问过的节点就返回 true
   3. 遍历完没遇到访问过的节点就返回 false

```ts
function hasCycle(head: ListNode | null): boolean {
    if (!head) return false;
    const historys = new Set();
    while(head) {
        if (historys.has(head)) {
            return true;
        }
        historys.add(head);
        head = head.next;
    }
    return false;
};
```

进阶：使用 O(1) 空间复杂度来完成

- 实现思路：
  - 不能用额外的空间存储节点
  - 使用双指针的方式，一个快指针一个慢指针，如果是个环肯定会相遇
  - 注意边界情况

```ts
function hasCycle(head: ListNode | null): boolean {
    if (!head) return false;
    let fast = head?.next; // 一次增加两格
    let slow = head;

    while(fast && slow) {
        if (slow === fast) {
            return true;
        }
        fast = fast?.next?.next;
        slow = slow?.next;
    }
    return false;
};
```

## 两个数组的交集 ⭐️⭐️⭐️

> <https://leetcode.cn/problems/intersection-of-two-arrays/>

没啥好说的，直接上 [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection) 就完事了

```ts
function intersection(nums1: number[], nums2: number[]): number[] {
    const set1: Set<number> = new Set(nums1);
    const set2: Set<number> = new Set(nums2);
    const result: number[] = [];
    
    set1.forEach(item => {
        if (set2.has(item)) {
            result.push(item);
        }
    });
    return result;
};
```

## 两数之和

> <https://leetcode.cn/problems/two-sum/>

1. 分析题目意图：找到数组中两个数相加等于 target 的数组的下标，并返回他们
2. 实现思路：
   1. 一眼扫过去可以使用两个 for 循环实现，时间复杂度是 O(n^2)
   2. 先排好序（O(n)），再二分 ❌
   3. 使用“哈希表”，将每个数组项和下标值加入哈希表中，判断 `target - nums[i]` 是否在哈希表中，在的话就返回。

```ts
// 暴力解法
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return []
};

// 哈希表
function twoSum(nums: number[], target: number): number[] {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
  return []
};
```

## 无重复字符的最长子串

> <https://leetcode.cn/problems/longest-substring-without-repeating-characters/>

1. 分析题目意图：给定一个字符串中，没有重复字符的最长子串，也就是连续无重复最长的子串的长度是多少。
2. 实现思路：
   1. 既然要求最长的子串，那么肯定要遍历这个字符串，并且维护一个最长子串的长度值，最终返回，另外还需要维护一个 Set 集合用于不断添加字符。
   2. 使用滑动窗口，先找到最大的窗口，然后再缩小窗口在增加窗口，直到指针都指向末尾。

```ts
// 暴力解法
function lengthOfLongestSubstring(s: string): number {
    let max = 0;
    const set = new Set();
    for (let i = 0; i < s.length; i++) {
        const str1 = s.charAt(i);
        set.add(str1);
        for (let j = i+1; j < s.length; j++) {
            const str2 = s.charAt(j);
            if (!set.has(str2)) {
                set.add(str2);
            } else {
                max = Math.max(max, set.size);
                set.clear();
                break;
            }
        }
    }
    return Math.max(max, set.size);
};

// 滑动窗口
function lengthOfLongestSubstring(s: string): number {
    if (!s.length) return 0;
    let max = 1;
    const set = new Set();
    let start = 0;
    let end = 1;
    set.add(s[start]);
    while (start < s.length) {
        while (end < s.length && !set.has(s[end])) {
            set.add(s[end]);
            ++end;
        }
        max = Math.max(max, end - start);
        set.delete(s[start]);
        ++start;
    }
    return max;
};
```

## 最小覆盖子串 ⭐️⭐️

> <https://leetcode.cn/problems/minimum-window-substring/>

1. 分析题目意图：最小覆盖子串换句话说就是 s 字符串中能覆盖 t 字符串中字符的最小子串的内容是什么
2. 实现思路：
   1. 滑动窗口、哈希表
   2. 使用双指针来控制窗口的滑动，使用哈希表来映射存储 t 字符串字符，以此来简化处理 t 字符串内容
   3. 定义 minLen 和 minStart 来记录最小窗口，便于截取最小子串

```ts
function minWindow(s: string, t: string): string {
    //(ADOBEC)ODEBANC
    // ADO(BECODEBA)NC
    // ADOBE(CODEBA)NC
    // ADOBECODE(BANC)
    // ADOBECODEB(ANC) break

    // 如果 s 小于 t 字符串的长度，单独处理
    if (s.length < t.length) return '';

    // 将 t 中的字符映射到哈希表
    const map = new Map();
    for (const key of t) {
        map.set(key, map.has(key) ? map.get(key) + 1 : 1);
    }

    // 定义 count 为 map 的长度
    let count = map.size;

    let left = 0; // 定义左指针用于控制窗口的大小
    let right = 0; // 定于右指针用来查找符合字符串 t 的内容

    // 记录最小窗口的起始下标和长度
    let minLen = Infinity, minStart = 0;
    
    while (right < s.length) {
        const r = s[right];
        if (map.has(r)) {
            let _count = map.get(r);
            map.set(r, --_count);
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
            const l = s[left];
            if (map.has(l)) {
                let _count = map.get(l);
                map.set(l, ++_count);
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

## 使用JavaScript/TypeScript实现树的深度优先遍历和广度优先遍历~

树的结构是一个可以把问题拆分成一个最小问题的情况，也就是一个“根节点”，分了两个左右子节点，那么深度递归的话就是一直找当前节点是否还有子节点，有的话就继续找，直到找不到子节点为止。

```ts
class TreeNode {
    constructor(val, left=null, right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7

// 深度优先遍历（递归）
function deepReclusive(node) {
    if (!node) return;
    
    console.log(node.val);

    deepReclusive(node.left);
    deepReclusive(node.right);
}
deepReclusive(root); // 1 2 4 5 3 6 7 

// 广度优先
function bfs(node) {
    if (!node) return;
    const queue = [node];
    while (queue.length) {
        const n = queue.shift();
        console.log(n.val);
        n.left && queue.push(n.left);
        n.right && queue.push(n.right);
    }
}
bfs(root); // 1 2 3 4 5 6
```

## 使用JavaScript/TypeScript实现树的先中后序遍历（不能使用递归）

先中后说的就是“根节点”的顺序在哪个位置。

- 先序遍历：根、左、右
- 中序遍历：左、根、右
- 后续遍历：左、右、根

```ts
class TreeNode {
    constructor(val, left=null, right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

let root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);
root.right.right = new TreeNode(7);

//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7

// 先序遍历
function preOrder(node) {
    if (!node) return;
    const stack = [node];

    while (stack.length) {
        const n = stack.pop();
        console.log(n.val);
        n.right && stack.push(n.right);
        n.left && stack.push(n.left);
    }
}
preOrder(root); // 1 2 4 5 3 6 7

// 中序遍历
function midOrder(node) {
    if (!node) return;
    const stack = [node];

    while (stack.length) {
        // if (node.left) {
        //     node = node.left;
        //     stack.push(node);
        // } else {
        //     const n = stack.pop();
        //     console.log(n?.val);
        //     if (n.right) {
        //         node = n.right;
        //         stack.push(node);
        //     }
        // }
        while (node.left) {
            node = node.left;
            stack.push(node);
        }
        const n = stack.pop();
        console.log(n.val);
        if (n.right) {
            node = n.right;
            stack.push(node);
        }
    }
}
midOrder(root); // 4 2 5 1 6 3 7

// 后序遍历
function lastOrder(node) {
    if (!node) return;
    const stack = [node];
    let last = null;

    while (stack.length) {
        while (node?.left) {
            node = node.left;
            stack.push(node);
        }
        const n = stack[stack.length - 1];
        if (!n.right || n.right === last) {
            console.log(n.val);
            last = n;
            stack.pop();
        } else {
            node = n.right;
            stack.push(node);
        }
    }
}
lastOrder(root); // 4 5 2 6 7 3 1
```

## 二叉树的最大深度

> <https://leetcode.cn/problems/maximum-depth-of-binary-tree/>

1. 分析题目意图：找到二叉树的最大深度，也就是从根节点到最远节点的节点数量有多少
2. 实现思路：
   1. 将每个节点遍历一遍，并且记录每个节点的“最大深度”是多少，最后输出那个最远的节点深度值即可

```ts
/**
 * Definition for a binary tree node.
 */
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;

    const stack: Array<[TreeNode | null, number]> = [[root, 1]];

    let maxDepth = 0;

    while (stack.length) {
        const [node, depth] = stack.pop();

        maxDepth = Math.max(maxDepth, depth);

        if (node.left) {
            stack.push([node.left, depth+1]);
        }
        if (node.right) {
            stack.push(node.right, depth+1);
        }
    }
    return maxDepth;
};

// 递归版
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;

    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
```

## 二叉树的最小深度

> <https://leetcode.cn/problems/minimum-depth-of-binary-tree/>

1. 分析题目意图：从根节点到最近“叶子节点”的最小深度，叶子节点是没有子节点的节点。
2. 实现思路：同上题，只不过需要判断“叶子节点”

```ts
function minDepth(root: TreeNode | null): number {
    if (!root) return 0;

    const stack: Array<[TreeNode|null, number]> = [[root, 1]];
    let min = Infinity;

    while (stack.length) {
        const [node, depth] = stack.pop();

        if (!node?.left && !node?.right) {
            min = Math.min(min, depth);
        }
        node.left && stack.push([node.left, depth+1]);
        node.right && stack.push([node.right, depth+1]);
    }
    return min;
};
```

## 二叉树的层序遍历

> <https://leetcode.cn/problems/binary-tree-level-order-traversal/>

1. 分析题目意图：按照层级（从上到下）从左到右依次遍历节点并保存，最后输出结果
2. 实现思路：
   1. 使用队列直接一次入队出队就行

```ts
// 标记层级，然后对应添加元素
function levelOrder(root: TreeNode | null): number[][] {
    if (!root) return [];

    const queue: Array<[TreeNode | null, number]> = [[root, 0]];
    const result: number[][] = [];

    while (queue.length) {
        const [node, index] = queue.shift();
        if (!result[index]) {
            result[index] = [];
        }
        result[index].push(node.val);
        node.left && queue.push([node.left, index+1]);
        node.right && queue.push([node.right, index+1]);
    }
    return result;
};

// 优先处理层级
function levelOrder(root: TreeNode | null): number[][] {
    const result = [];
    if (!root) return result;

    const queue: TreeNode[] = [root];

    while (queue.length) {
        const size = queue.length;
        result.push([]);
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            result[result.length - 1].push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
    }
    return result;
};
```

## 二叉树的中序遍历

> <https://leetcode.cn/problems/binary-tree-inorder-traversal/>

```ts
// 使用栈
function inorderTraversal(root: TreeNode | null): number[] {
    if (!root) return [];

    const stack: TreeNode[] = [root];
    const result = [];

    while (stack.length) {
        while (root.left) {
            root = root.left;
            stack.push(root);
        }
        const node = stack.pop();
        result.push(node.val);
        if (node.right) {
            root = node.right;
            stack.push(root);
        }
    }
    return result;
};
```
