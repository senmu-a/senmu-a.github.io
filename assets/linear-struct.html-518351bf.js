import{_ as n,p as s,q as a,Y as p}from"./framework-aa5c4115.js";const t={},e=p(`<p>线性结构包括有：数组、链表、栈、队列。接下来我们依次通过代码实现下。</p><h2 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h2><p>数组在内存中是以连续的空间存储的，并且该空间是固定的；说到这里前端的同学可能就会疑惑了，明明在 JS 中数组不是固定大小的，这是因为 JS 底层默认内置了「可扩展数组」。</p><p>对于数据结构的功能不外乎就是：访问数据、插入/增加数据、编辑/修改数据、删除数据。</p><h3 id="访问数据" tabindex="-1"><a class="header-anchor" href="#访问数据" aria-hidden="true">#</a> 访问数据</h3><p>因为数组在内存的存储是连续的空间，所以访问数据可以很轻松的完成，也就是给定数组存储的内存地址（首位元素地址）与索引值便可以轻松访问所有数据。</p><h3 id="插入-增加数据" tabindex="-1"><a class="header-anchor" href="#插入-增加数据" aria-hidden="true">#</a> 插入/增加数据</h3><p>因为数组存储的特性，在插入数据时需要“牵动”其他数据，比如我们想要在下标为“1”位置插入一个元素，那么对应该位置之后的每一位数据必须向后移动一位。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">insert</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> num<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;</span> index<span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 将下标 index 及之后的每一个元素向后移动一位</span>
    nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 将新元素插入到下标 index 位置</span>
  nums<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 给数组 [1, 3, 2, 4, 0] 下标 “1” 的位置插入数字 2</span>
<span class="token function">insert</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编辑-修改数据" tabindex="-1"><a class="header-anchor" href="#编辑-修改数据" aria-hidden="true">#</a> 编辑/修改数据</h3><p>该部分也比较简单，与访问数据类似，只不过多了一步赋值操作。</p><h3 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h3><p>因为数组的特效，在删除数据时需要“牵动”其他数据，比如我们想要删除下标“1”位置的元素，那么对应该位置之后的每一个数据必须向前移动一位。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>nums<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> index<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> index<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> nums<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 删除数组 [1, 3, 2, 4] 下标 “1” 的位置的数据</span>
<span class="token keyword">delete</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3><p>总的来看，数组的访问和编辑数据的效率是最高的，而对于插入和删除数据的效率不仅很低还会造成<strong>数据丢失</strong>和<strong>内存浪费</strong>的情况。</p><p>优点：</p><ul><li>支持随机访问</li><li>空间效率高：由于在内存中是以连续空间存储，无需额外的结构开销</li><li>局部缓存性：当访问数组元素时，计算机不仅会加载它，还会缓存其周围的其他数据，从而借助高速缓存来提升后续操作的执行速度。</li></ul><blockquote><p>「局部缓存性」局部性原理认为，程序在任意时刻倾向于访问附近的内存位置，而不是随机地访问内存中的任意位置。这种倾向性，我们称之为局部性原理，是一个持久的概念，对于硬件和软件系统的设计和性能都有着极大的影响。 局部性原理有两种形式，时间局部性和空间局部性。在一个具有良好时间局部性的程序中，被引用过一次的存储器在不远的将来会被再次引用。在一个具有良好空间局部性的程序中，如果一个存储器位置被引用了一次，那么程序很可能在不远的将来引用附近的一个存储器的位置。</p></blockquote><p>当然，数组也有自己的缺点：</p><ul><li>插入与删除效率低</li><li>长度不可变</li><li>空间浪费与数据丢失</li></ul><p>典型应用：</p><ul><li>数据随机访问</li><li>数据排序与搜索</li><li>查找表</li><li>机器学习</li><li>其他数据结构的实现</li></ul><h2 id="链表" tabindex="-1"><a class="header-anchor" href="#链表" aria-hidden="true">#</a> 链表</h2><p>由于链表的设计，它在内存中的存储不必是连续的空间，而是通过“引用”连接彼此；这样就意味着它比数组更适合存储需要大空间的数据，因为内存中连续的空间很有限，而非连续空间的优势就体现出来了。</p><h3 id="初始化链表" tabindex="-1"><a class="header-anchor" href="#初始化链表" aria-hidden="true">#</a> 初始化链表</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * 初始化一个链表：1-&gt;3-&gt;2-&gt;5-&gt;4
 */</span>
<span class="token keyword">class</span> <span class="token class-name">ListNode</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span>val<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> next<span class="token operator">?</span><span class="token operator">:</span> ListNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val <span class="token operator">||</span> <span class="token number">0</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>next <span class="token operator">=</span> next <span class="token operator">||</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> n1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> n5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
n1<span class="token punctuation">.</span>next <span class="token operator">=</span> n2
n2<span class="token punctuation">.</span>next <span class="token operator">=</span> n3
n3<span class="token punctuation">.</span>next <span class="token operator">=</span> n4
n4<span class="token punctuation">.</span>next <span class="token operator">=</span> n5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="访问数据-1" tabindex="-1"><a class="header-anchor" href="#访问数据-1" aria-hidden="true">#</a> 访问数据</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 延用上面的链表 1-&gt;3-&gt;2-&gt;5-&gt;4，我们想要访问 2 </span>
<span class="token keyword">function</span> <span class="token function">findNum</span><span class="token punctuation">(</span>node<span class="token operator">:</span> ListNode<span class="token punctuation">,</span> target<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>val <span class="token operator">===</span> target<span class="token punctuation">)</span> <span class="token keyword">return</span> node<span class="token punctuation">.</span>val
      node <span class="token operator">=</span> node<span class="token punctuation">.</span>next
      index <span class="token operator">+=</span> <span class="token number">1</span>
    <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 沿用上面初始化的链表</span>
<span class="token function">findNum</span><span class="token punctuation">(</span>n1<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插入-添加数据" tabindex="-1"><a class="header-anchor" href="#插入-添加数据" aria-hidden="true">#</a> 插入/添加数据</h3><p>直接插入数据即可</p><h3 id="删除数据-1" tabindex="-1"><a class="header-anchor" href="#删除数据-1" aria-hidden="true">#</a> 删除数据</h3><p>直接删除数据即可</p><h3 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h3><p>基本上链表与数据的特性是相对的，即链表的数据插入与删除效率很高但是访问数据的效率很低。</p><p>分类：</p><ul><li>单向链表</li><li>环形链表 — 头尾相连</li><li>双向链表 — 一个节点同时知道前继节点和后继节点</li></ul><p>典型应用：</p><ul><li>单向链表通常用于<em>栈</em>、<em>队列</em>、<em>哈希表</em>、<em>图</em>的实现</li><li>环形链表通常用于<em>时间片轮转调度算法</em>、<em>数据缓冲区</em>、<em>循环播放器</em></li><li>双向链表通常用于<em>LRU</em>、<em>浏览器历史</em></li></ul><blockquote><p><strong>时间片轮转调度算法</strong>是一个操作系统中常用的算法，它的基本思想是将可用的 CPU 时间分割成多个时间片，然后将时间片分配给就绪中的队列，这样便于每个时间片被公平的使用。</p></blockquote><h2 id="栈" tabindex="-1"><a class="header-anchor" href="#栈" aria-hidden="true">#</a> 栈</h2><p>简单来讲就是叠盘子，想放下的盘子在下面想要拿到最下面的盘子必须先把上面的盘子拿下去。也就是我们常说的<strong>先入后出</strong>。</p><h3 id="数组实现栈" tabindex="-1"><a class="header-anchor" href="#数组实现栈" aria-hidden="true">#</a> 数组实现栈：</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 比如，我们将 1、2、3、4 依次压入栈中</span>
<span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">// 入栈</span>
stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token comment">// 压入 1</span>
stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token comment">// 压入 2</span>
stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// 压入 3</span>
stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token comment">// 压入 4</span>

<span class="token comment">// 出栈</span>
stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取出 4</span>
stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取出 3</span>
stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取出 2</span>
stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 取出 1</span>

<span class="token comment">// 栈长度</span>
stack<span class="token punctuation">.</span>length
<span class="token comment">// 栈顶</span>
stack<span class="token punctuation">[</span>stack<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment">// 栈底</span>
stack<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

<span class="token comment">// 换种形式：</span>
<span class="token keyword">class</span> <span class="token class-name">ArrayStack</span> <span class="token punctuation">{</span>
  <span class="token comment">// 栈数组</span>
  <span class="token keyword">private</span> stackArr<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackArr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackArr<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>

  <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">===</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>

  <span class="token function">push</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackArr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&#39;栈为空&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackArr<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">top</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&#39;栈为空&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackArr<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackArr
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="链表实现栈" tabindex="-1"><a class="header-anchor" href="#链表实现栈" aria-hidden="true">#</a> 链表实现栈：</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 栈是先入后出，所以链表的头节点应该是栈顶，意味着数据压入栈时需要改变原先链表的指向</span>
<span class="token keyword">class</span> <span class="token class-name">LinkedStack</span> <span class="token punctuation">{</span>
  <span class="token comment">// 记录栈长度</span>
  <span class="token keyword">private</span> stackSize<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token comment">// 链表节点</span>
  <span class="token keyword">private</span> stackNode<span class="token operator">:</span> ListNode <span class="token operator">|</span> <span class="token keyword">null</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackSize <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取栈长度</span>
  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackSize
  <span class="token punctuation">}</span>

  <span class="token comment">// 入栈</span>
  <span class="token function">push</span><span class="token punctuation">(</span>num<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span>
    node<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode <span class="token operator">=</span> node
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackSize <span class="token operator">+=</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 出栈</span>
  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode<span class="token punctuation">.</span>next
    <span class="token keyword">this</span><span class="token punctuation">.</span>stackSize<span class="token operator">--</span>
    <span class="token keyword">return</span> num
  <span class="token punctuation">}</span>
  <span class="token comment">// 访问栈顶元素</span>
  <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>stackNode<span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&quot;stack not found&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode<span class="token punctuation">.</span>val
  <span class="token punctuation">}</span>
  <span class="token comment">// 将链表转化为数组</span>
  <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>stackNode
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>stackSize<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> arr<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> node<span class="token punctuation">.</span>val
      node <span class="token operator">=</span> node<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="队列" tabindex="-1"><a class="header-anchor" href="#队列" aria-hidden="true">#</a> 队列</h2><p>队列在实际生活中也可以当作是排队买奶茶，先排的人先买后排的人后买。<strong>先入先出</strong>。</p><p>从代码实现角度来看，队列和栈思路刚好相反，同样，我们分别用链表和数组实现下队列。</p><h3 id="数组实现队列" tabindex="-1"><a class="header-anchor" href="#数组实现队列" aria-hidden="true">#</a> 数组实现队列</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">ArrayQueue</span> <span class="token punctuation">{</span>
  <span class="token comment">// 队列数组</span>
  <span class="token keyword">private</span> queueArr<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span>
  <span class="token comment">// 队首指针</span>
  <span class="token keyword">private</span> front<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token comment">// 数组长度/队尾指针</span>
  <span class="token keyword">private</span> queueSize<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>capacity<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化固定长度的数组</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>queueArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span>capacity<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取数组容量</span>
  <span class="token keyword">get</span> <span class="token function">capacity</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queueArr<span class="token punctuation">.</span>length
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取数组队列长度</span>
  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize
  <span class="token punctuation">}</span>

  <span class="token comment">// 队列是否为空</span>
  <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">===</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 往队尾添加数据</span>
  <span class="token function">push</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">===</span> <span class="token keyword">this</span><span class="token punctuation">.</span>capacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&#39;队列已满，稍等再添加～&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> rear <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>capacity
    <span class="token keyword">this</span><span class="token punctuation">.</span>queueArr<span class="token punctuation">[</span>rear<span class="token punctuation">]</span> <span class="token operator">=</span> val
    <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize<span class="token operator">++</span>
  <span class="token punctuation">}</span>

  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>capacity
    <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize<span class="token operator">--</span>
    <span class="token keyword">return</span> num
  <span class="token punctuation">}</span>

  <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&#39;队列为空&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queueArr<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>front<span class="token punctuation">]</span>
  <span class="token punctuation">}</span>

  <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> j <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>front<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">,</span> j<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queueArr<span class="token punctuation">[</span>j <span class="token operator">%</span> <span class="token keyword">this</span><span class="token punctuation">.</span>capacity<span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">return</span> arr
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="链表实现队列" tabindex="-1"><a class="header-anchor" href="#链表实现队列" aria-hidden="true">#</a> 链表实现队列</h3><p>链表的空间要求不高反而只需要关心队列的逻辑就好（先进先出）。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">LinkQueue</span> <span class="token punctuation">{</span>
  <span class="token comment">// 首节点</span>
  <span class="token keyword">private</span> front<span class="token operator">:</span> ListNode <span class="token operator">|</span> <span class="token keyword">null</span>
  <span class="token comment">// 尾节点</span>
  <span class="token keyword">private</span> rear<span class="token operator">:</span> ListNode <span class="token operator">|</span> <span class="token keyword">null</span>
  <span class="token comment">// 队列长度</span>
  <span class="token keyword">private</span> queueSize<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">0</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>rear <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize
  <span class="token punctuation">}</span>

  <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>size <span class="token operator">===</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>

  <span class="token function">push</span><span class="token punctuation">(</span>val<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ListNode</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>rear<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果存在尾节点，就将当前的尾节点的下个节点指向新的尾节点</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>rear<span class="token punctuation">.</span>next <span class="token operator">=</span> node
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 如果不存在尾节点，说明为空队列，则设置首节点</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">=</span> node
    <span class="token punctuation">}</span>
    <span class="token comment">// 不管如何都更新尾节点</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>rear <span class="token operator">=</span> node
    <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize<span class="token operator">++</span>
  <span class="token punctuation">}</span>

  <span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> head <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>front <span class="token operator">=</span> head<span class="token punctuation">.</span>next
    <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize<span class="token operator">--</span>
    <span class="token keyword">return</span> head<span class="token punctuation">.</span>val
  <span class="token punctuation">}</span>

  <span class="token comment">// 访问首元素</span>
  <span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&#39;队列为空，先添加数据进来吧～&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>front
  <span class="token punctuation">}</span>

  <span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> node <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>queueSize<span class="token punctuation">)</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queueSize<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> node<span class="token punctuation">.</span>val
      node <span class="token operator">=</span> node<span class="token punctuation">.</span>next
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,54),o=[e];function c(i,l){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","linear-struct.html.vue"]]);export{k as default};
