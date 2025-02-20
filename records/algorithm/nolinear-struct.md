---
title: 非线性结构
date: 2023/10/31
author: senmu
---

非线性结构包括哈希表、树、堆、图。

## 哈希表

> 哈希表涉及到的基础性东西是哈希表的存储和哈希函数，其中核心点就是哈希函数。

可以想像一下图书管理员在图书馆中添加新书籍、查找新书籍的情景；在新书籍添加时会添加特定的编号然后按照编号存放在对应的位置，在需要查找某个书籍时找到书籍对应的编号然后根据编号找到对应位置。这其中正是运用哈希表的思想，哈希函数就是书籍与编号的对应关系，存储就是书籍存放的位置；通过编号与书籍的映射关系便于管理与查找书籍的效率。

所以，哈希表其实就是 `data` 通过数组存储在某个空间，找到 `key` 与 `data` 间的映射关系（哈希函数），然后根据映射关系对于数据进行操作。

举个例子：有 A 班级，每个同学都有学号与姓名，那么我们就可以设计一个哈希表来让学号与姓名对应存储。

```ts
/***
 * 数据如下：
 * 学号|12836|15937|16750|13276|10583|
 * 姓名| 小明 | 小红 | 小白 | 小吕 | 张三 |
*/

/**
 * 简单设计：
 * 存储：采用数组来存储学号与姓名的完整数据，存储的位置由哈希函数对应的关系来存储
 * 哈希函数：hash(key) % capacity
 *  1. 通过某种哈希算法得到哈希值
 *  2. 将哈希值对应数组容量取模，从而得到该 key 对应 的 index
*/

// 根据数据设计数组容量为 100，哈希函数为 key % 100 得到的数值当作数组下标进行存储管理

// 键值对
class Pair {
  public key: number
  public value: string

  constructor(key: number, value: string) {
    this.key = key
    this.value = value
  }
}

// 利用数组简单的实现哈希表
class ArrayHashMap {
  // 存储总数据的数组
  private hashArr: Array<Pair | null>

  constructor() {
    this.hashArr = new Array(100).fill(null)
  }

  // 哈希函数
  private hashFunc(key: number) {
    return key % 100
  }

  // 获取数据
  public get(key: number) {
    const index = this.hashFunc(key)
    const pair = this.hashArr[index]
    return pair ? pair.value : null
  }

  // 添加数据
  public set(key: number, value: string) {
    const index = this.hashFunc(key)
    this.hashArr[index] = new Pair(key, value)
  }

  // 删除数据
  public delete(key: number) {
    const index = this.hashFunc(key)
    this.hashArr[index] = null
  }

  // 获取所有的键值对
  public entries() {
    const arr = []
    for (let i = 0; i < this.hashArr.length; i++) {
      if (this.hashArr[i]) {
        arr.push(this.hashArr[i])
      }
    }
    return arr
  }

  // 获取所有键
  public keys() {
    const arr = []
    for (let i = 0; i < this.hashArr.length; i++) {
      const bucket = this.hashArr[i]
      if (bucket && bucket.key) {
        arr.push(bucket.key)
      }
    }
    return arr
  }

  // 获取所有值
  public keys() {
    const arr = []
    for (let i = 0; i < this.hashArr.length; i++) {
      const bucket = this.hashArr[i]
      if (bucket && bucket.value) {
        arr.push(bucket.value)
      }
    }
    return arr
  }
}

```

### 哈希冲突

上面的简单实现可能存在**哈希冲突**的时候，比如学号 15136、24336。

当然，如果遇到了冲突的情况我们可以选择**哈希扩容**的方式，不过这种方式过于简单粗暴，而且性能也不好，所以一般情况下我们遇到冲突会先使用策略来保证冲突存在也不影响我们正常操作，当冲突达到一定阈值才会进行扩容。

下面一起来看看可以解决**哈希冲突**的策略。

#### 链式地址

在原始的哈希表存储时是一个“桶”存储一条数据，这样很容易遇到哈希冲突的问题，将存储改为链式地址的方式就可以解决该问题。但是要注意哈希冲突如果过多那么性能将会变得极差，所以需要设置一个合理的阈值超过该值的话就需要进行扩容。

#### 开放寻址


## 树🌲

### 二叉树

简单理解就是拥有两个分支/叉的树（节点），它是一种非线性结构，一个节点包括左右两个子节点，子节点与父节点靠引用（指针）连接。和链表有些相似是不是🤔️

```ts
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(val?: number, left?: TreeNode, right?: TreeNode) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}
```

### 二叉树的常见术语

* 根节点（root node）：位于二叉树的顶层，没有父节点。
* 叶节点（leaf node）：位于二叉树的最底层，没有子节点。
* 边（edge）：连接父子节点之间的引用（指针）。
* 节点所在的层（level）：从顶至底递增，顶层根节点为 1。
* 节点的度（degree）：节点的子节点的数量，范围为0、1、2。
* 二叉树的高度（height）：根节点距离最远叶节点之间走过的边的数量。
* 节点的深度（depth）：根节点距离当前节点之间走过的边的数量。
* 节点的高度（height）：当前节点距离最远叶节点之间走过的边的数量。

### 二叉树的基本操作

#### 初始化二叉树

如下的树：
      1
     / \
    2   3
   / \
  4   5

```ts
/* 初始化二叉树 */
// 初始化节点
let n1 = new TreeNode(1),
    n2 = new TreeNode(2),
    n3 = new TreeNode(3),
    n4 = new TreeNode(4),
    n5 = new TreeNode(5);
// 构建引用指向（即指针）
n1.left = n2;
n1.right = n3;
n2.left = n4;
n2.right = n5;
```

#### 插入与删除节点

我们想要在 `n1` 与 `n2` 处添加一个节点 `p`

```ts
//初始化 p 节点
const p = new TreeNode(0);
// 插入 p 节点
n1.left = p;
p.left = n2;
// 删除 p 节点
n1.left = n2;
```

### 常见二叉树的类型

#### 完美二叉树/满二叉树（perfect binary tree）

完美的二叉树，所有的节点都有左右子节点，当然，叶节点的度为 0。

#### 完全二叉树（complete binary tree）

只有最底层节点未被填满，当然，要满足优先填充左节点。

> 1 下面为啥有两个边？是因为不这样的话 5 与 6 就粘一起了，实际把 1 下面当成一个边就好了。

         1
        / \
       /   \
      2     3
     / \   /
    4   5 6   
#### 完满二叉树（full binary tree）

除了叶节点之外，其他节点必须有两个子节点。

        1
       / \
      2   3
     / \
    4   5    

#### 平衡二叉树（balanced binary tree）

任意节点的左子树与右子树之间高度差的绝对值不超过 1。

        1
       / \
      2   3
     /   / \
    4   5   6
       / \
      7   8

### 二叉树的退化

想象一下，如果所有的节点只有左子节点会发生什么事情？是不是变成了一个链表

### 二叉树的遍历

#### 广度优先

使用队列完成遍历

```ts
function levelOrder(root: TreeNode | null) {
  if (!root) return
  // 初始化队列
  const queue = [root]
  // 初始化遍历容器
  const list = []
  while(queue.length) {
    const node = queue.shift()
    list.push(node.val)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }

  return list
}
```

#### 深度优先

* **先序遍历**是根左右
* **中序遍历**是左根右
* **后序遍历**是左右中

        1
       / \
      2   3
     /   / \
    4   5   6
       / \
      7   8

拿上面的例子来举例：

```ts
const list = []
// 先序遍历
function preOrder(root: TreeNode | null) {
  if (root === null) return
  list.push(root.val)
  preOrder(root.left)
  preOrder(root.right)
}

// 中序遍历
function inOrder(root: TreeNode | null) {
  if (root === null) return
  inOrder(root.left)
  list.push(root.val)
  inOrder(root.right)
}

// 后序遍历
function postOrder(root: TreeNode | null) {
  if (root === null) return
  postOrder(root.left)
  postOrder(root.right)
  list.push(root.val)
}
```

## 图

### 什么是图？

图是由顶点（vertex）和边（edge）组成，简单来讲就是：存在几个顶点，这几个顶点之间可以通过边来连接，并且可以没有固定的顺序；

如果说树是一对多的关系，那么图就是多对多的关系。

### 怎样表示图？

可以通过邻接矩阵、邻接表的方式来表示一个图，可以将邻接矩阵理解为用空间来换时间。

#### 邻接表

邻接表是我们常用的来表示图的方式，也即记录顶点与顶点之前是否存在边的关系来表示。

比如：

     A
   /   \
  B     C
 / \     \
D   E     F

表示为：

```js
const graph = {
  "A": ["B", "C"],
  "B": ["D", "E"],
  "C": ["F"],
  "D": [],
  "E": [],
  "F": []
};
```

那么如何遍历一个图呢？有两种方式：

1. 广度优先遍历（BFS）
2. 深度优先遍历（DFS）

```js
const graph = {
  "A": ["B", "C"],
  "B": ["D", "E"],
  "C": ["F"],
  "D": [],
  "E": [],
  "F": []
};
// 1. 广度优先遍历
const graphBFS = (graph, start) => {
  const visited = new Set(); // 定义 visited 用来记录是否已经遍历过该节点
  const queue = []; // 定义队列用来进行遍历节点的操作
  queue.push(start); // 将初始节点入队
  visited.add(start);

  while (queue.length) {
    const node = queue.shift(); //出队    
    console.log(node);

    for (let adjVet of graph[node]) {
      if (visited.has(adjVet)) continue;
      queue.push(adjVet);
      visited.add(adjVet);
    }
  }
}

graphBFS(graph, "A")

// 2. 深度优先遍历
const graphDFS = (graph, start) => {
  const visited = new Set();
  
  const dfs = (vet) => {
    if (!graph) return;

    console.log(vet);

    for (let ret of graph[vet]) {
      if (!visited.has(ret)) {
        visited.add(ret);
      }
      dfs(ret);
    }
  }

  dfs(start);
}

graphDFS(graph, 'A')

```