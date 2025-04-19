import{_ as n,p as s,q as a,Y as e}from"./framework-aa5c4115.js";const i={},t=e(`<h2 id="_215-数组中的-k-个最大元素" tabindex="-1"><a class="header-anchor" href="#_215-数组中的-k-个最大元素" aria-hidden="true">#</a> 215. 数组中的 K 个最⼤元素</h2><blockquote><p>地址：https://leetcode.cn/problems/kth-largest-element-in-an-array/description/</p></blockquote><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 找到数组中第k大的元素
 * 分析：
 *  1. 可以直接对数组进行排序，然后取出第k大的元素。
 *  2. 题目中提到找到第k大的元素吗，那么可以使用最小堆来维护k个最大的元素，堆顶元素就是第k大的元素。
 *  3. 进一步优化，可以使用快速排序的思想，使用pivot先进行分区，然后确定n-k个元素在pivot的哪边，只需要对那一边进行递归即可。递归的终止条件是k === n - k。
 */</span>
<span class="token doc-comment comment">/**
 * 第一种解法，采用冒泡排序进行排序然后取第k大的元素
 * 时间复杂度 O(n^2)
 * 空间复杂度 O(1)
 */</span>
<span class="token comment">// function findKthLargest(nums: number[], k: number) {</span>
<span class="token comment">//   for (let i = 0; i &lt; nums.length; i++) {</span>
<span class="token comment">//     for (let j = i + 1; j &lt; nums.length; j++) {</span>
<span class="token comment">//       // 将 i 挨个与 j 对比，i 大则交换他们的位置，直到尾部</span>
<span class="token comment">//       if (nums[i] &gt; nums[j]) {</span>
<span class="token comment">//         [nums[i], nums[j]] = [nums[j], nums[i]];</span>
<span class="token comment">//       }</span>
<span class="token comment">//     }</span>
<span class="token comment">//   }</span>
<span class="token comment">//   return nums[nums.length - k];</span>
<span class="token comment">// }</span>

<span class="token doc-comment comment">/**
 * 第一种解法再优化，冒泡排序的时间复杂度过高，使用快速排序代替
 */</span>
<span class="token comment">// function partition(nums: number[], left: number, right: number) {</span>
<span class="token comment">//   const pivot = nums[left];</span>
<span class="token comment">//   let i = left;</span>
<span class="token comment">//   let j = right + 1;</span>

<span class="token comment">//   while (i &lt; j) {</span>
<span class="token comment">//     do {</span>
<span class="token comment">//       i++;</span>
<span class="token comment">//     } while (nums[i] &lt; pivot);</span>

<span class="token comment">//     do {</span>
<span class="token comment">//       j--;</span>
<span class="token comment">//     } while (nums[j] &gt; pivot);</span>

<span class="token comment">//     if (i &lt; j) {</span>
<span class="token comment">//       [nums[i], nums[j]] = [nums[j], nums[i]];</span>
<span class="token comment">//     }</span>
<span class="token comment">//   }</span>

<span class="token comment">//   [nums[left], nums[j]] = [nums[j], nums[left]];</span>
<span class="token comment">//   return j;</span>
<span class="token comment">// }</span>

<span class="token comment">// function quickSort(nums: number[], left: number, right: number) {</span>
<span class="token comment">//   if (left &gt;= right) return;</span>
<span class="token comment">//   // 找到基准值下标</span>
<span class="token comment">//   const pivot = partition(nums, left, right);</span>
<span class="token comment">//   quickSort(nums, left, pivot - 1);</span>
<span class="token comment">//   quickSort(nums, pivot + 1, right);</span>
<span class="token comment">// }</span>

<span class="token doc-comment comment">/**
 * 时间复杂度：O(nlogn)，为什么？logn 是因为每次都是对一半的元素进行递归，n 是因为每次都需要遍历所有元素
 * 空间复杂度：O(logn)，递归调用栈的深度
 */</span>
<span class="token comment">// export function findKthLargest(nums: number[], k: number) {</span>
<span class="token comment">//   quickSort(nums, 0, nums.length - 1);</span>
<span class="token comment">//   return nums[nums.length - k];</span>
<span class="token comment">// }</span>

<span class="token doc-comment comment">/**
 * 第二种解法，最小堆，维护k大小的最小堆
 * 时间复杂度：O(nlogk)，为什么？n 是遍历所有元素，logk 是因为每次都需要维护一个大小为 k 的最小堆
 * 空间复杂度：O(k)，最小堆的大小
 */</span>
<span class="token comment">// class MinHeap {</span>
<span class="token comment">//   private heap: number[];</span>

<span class="token comment">//   constructor() {</span>
<span class="token comment">//     this.heap = [];</span>
<span class="token comment">//   }</span>

<span class="token comment">//   left(index: number) {</span>
<span class="token comment">//     return this.heap[2 * index + 1];</span>
<span class="token comment">//   }</span>

<span class="token comment">//   right(index: number) {</span>
<span class="token comment">//     return this.heap[2 * index + 2];</span>
<span class="token comment">//   }</span>

<span class="token comment">//   parent(index: number) {</span>
<span class="token comment">//     return this.heap[Math.floor((index - 1) / 2)];</span>
<span class="token comment">//   }</span>

<span class="token comment">//   peek() {</span>
<span class="token comment">//     return this.heap[0];</span>
<span class="token comment">//   }</span>

<span class="token comment">//   insert(val: number) {</span>
<span class="token comment">//     this.heap.push(val);</span>
<span class="token comment">//     this.heapifyUp();</span>
<span class="token comment">//   }</span>

<span class="token comment">//   extractMin(n: number) {</span>
<span class="token comment">//     this.heap[0] = n;</span>
<span class="token comment">//     this.heapifyDown();</span>
<span class="token comment">//   }</span>

<span class="token comment">//   size() {</span>
<span class="token comment">//     return this.heap.length;</span>
<span class="token comment">//   }</span>

<span class="token comment">//   /**</span>
<span class="token comment">//    * 步骤是什么？</span>
<span class="token comment">//    *  1. 找到最后一个非叶子节点</span>
<span class="token comment">//    *  2. 从最后一个非叶子节点开始，向上比较子节点和父节点的大小，如果子节点大于父节点，则交换子节点和父节点的值</span>
<span class="token comment">//    *  3. 重复步骤2，直到根节点</span>
<span class="token comment">//    *  4. 重复步骤1和步骤2，直到堆有序</span>
<span class="token comment">//    */</span>
<span class="token comment">//   private heapifyUp() {</span>
<span class="token comment">//     let index = this.heap.length - 1;</span>
<span class="token comment">//     while (index &gt; 0) {</span>
<span class="token comment">//       const parentIndex = Math.floor((index - 1) / 2);</span>
<span class="token comment">//       if (this.heap[index] &lt; this.heap[parentIndex]) {</span>
<span class="token comment">//         [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];</span>
<span class="token comment">//         index = parentIndex;</span>
<span class="token comment">//       } else {</span>
<span class="token comment">//         break;</span>
<span class="token comment">//       }</span>
<span class="token comment">//     }</span>
<span class="token comment">//   }</span>

<span class="token comment">//   /**</span>
<span class="token comment">//    * 步骤是什么？</span>
<span class="token comment">//    *  1. 从根节点开始，比较当前节点和左右子节点的值</span>
<span class="token comment">//    *  2. 如果当前节点比左右子节点都大，则交换当前节点和左右子节点中的最小值</span>
<span class="token comment">//    *  3. 重复步骤1和2，直到堆的每个节点都满足堆的性质</span>
<span class="token comment">//    *  4. 最终得到一个有序的堆</span>
<span class="token comment">//    *</span>
<span class="token comment">//    */</span>
<span class="token comment">//   heapifyDown() {</span>
<span class="token comment">//     let index = 0;</span>
<span class="token comment">//     while (index &lt; this.heap.length) {</span>
<span class="token comment">//       const leftIndex = 2 * index + 1;</span>
<span class="token comment">//       const rightIndex = 2 * index + 2;</span>
<span class="token comment">//       let smallest = index;</span>
<span class="token comment">//       if (leftIndex &lt; this.heap.length &amp;&amp; this.heap[leftIndex] &lt; this.heap[smallest]) {</span>
<span class="token comment">//         smallest = leftIndex;</span>
<span class="token comment">//       }</span>
<span class="token comment">//       if (rightIndex &lt; this.heap.length &amp;&amp; this.heap[rightIndex] &lt; this.heap[smallest]) {</span>
<span class="token comment">//         smallest = rightIndex;</span>
<span class="token comment">//       }</span>
<span class="token comment">//       if (smallest !== index) {</span>
<span class="token comment">//         [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];</span>
<span class="token comment">//         index = smallest;</span>
<span class="token comment">//       } else {</span>
<span class="token comment">//         break;</span>
<span class="token comment">//       }</span>
<span class="token comment">//     }</span>
<span class="token comment">//   }</span>
<span class="token comment">// }</span>

<span class="token comment">// function findKthLargest(nums: number[], k: number) {</span>
<span class="token comment">//   const heap = new MinHeap();</span>
<span class="token comment">//   for (let i = 0; i &lt; nums.length; i++) {</span>
<span class="token comment">//     if (heap.size() &lt; k) {</span>
<span class="token comment">//       heap.insert(nums[i]);</span>
<span class="token comment">//     } else if (nums[i] &gt; heap.peek()) {</span>
<span class="token comment">//       heap.extractMin(nums[i]);</span>
<span class="token comment">//     }</span>
<span class="token comment">//   }</span>
<span class="token comment">//   return heap.peek();</span>
<span class="token comment">// }</span>

<span class="token doc-comment comment">/**
 * 第三种解法，快速选择算法
 * 时间复杂度：平均 O(n)，最坏 O(n^2)。
 *  - 平均 O(n) 是因为每次都是对一半的元素进行递归。
 *  - 最坏 O(n^2) 是因为可能会遇到最坏情况，每次都是对 n-1 个元素进行递归。
 * 空间复杂度：O(1)。
 */</span>
<span class="token keyword">function</span> <span class="token function">findKthLargest</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> k<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">quickSelect</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">quickSelect</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> left<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> right<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> k<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 递归函数的终止条件</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">===</span> right<span class="token punctuation">)</span> <span class="token keyword">return</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token comment">// 分区操作，找到基准值下标</span>
  <span class="token keyword">const</span> pivot <span class="token operator">=</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">let</span> pivotIndex <span class="token operator">=</span> left<span class="token punctuation">;</span>
  <span class="token keyword">let</span> i <span class="token operator">=</span> left<span class="token punctuation">;</span>
  <span class="token keyword">let</span> j <span class="token operator">=</span> right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
      i<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> pivot<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">do</span> <span class="token punctuation">{</span>
      j<span class="token operator">--</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">&gt;</span> pivot<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">[</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">[</span>nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  pivotIndex <span class="token operator">=</span> j<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">===</span> pivotIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> nums<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token operator">&lt;</span> pivotIndex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果 k 小于 pivotIndex，则说明第 k 大的元素在 pivotIndex 的左边</span>
    <span class="token keyword">return</span> <span class="token function">quickSelect</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> left<span class="token punctuation">,</span> pivotIndex <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果 k 大于 pivotIndex，则说明第 k 大的元素在 pivotIndex 的右边</span>
    <span class="token keyword">return</span> <span class="token function">quickSelect</span><span class="token punctuation">(</span>nums<span class="token punctuation">,</span> pivotIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> right<span class="token punctuation">,</span> k<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),l=[t];function p(c,o){return s(),a("div",null,l)}const u=n(i,[["render",p],["__file","02-21.html.vue"]]);export{u as default};
