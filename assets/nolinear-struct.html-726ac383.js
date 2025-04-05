import{_ as n,p as s,q as a,Y as p}from"./framework-e1bed10d.js";const t={},e=p(`<p>非线性结构包括哈希表、树、堆、图。</p><h2 id="哈希表" tabindex="-1"><a class="header-anchor" href="#哈希表" aria-hidden="true">#</a> 哈希表</h2><blockquote><p>哈希表涉及到的基础性东西是哈希表的存储和哈希函数，其中核心点就是哈希函数。</p></blockquote><p>可以想像一下图书管理员在图书馆中添加新书籍、查找新书籍的情景；在新书籍添加时会添加特定的编号然后按照编号存放在对应的位置，在需要查找某个书籍时找到书籍对应的编号然后根据编号找到对应位置。这其中正是运用哈希表的思想，哈希函数就是书籍与编号的对应关系，存储就是书籍存放的位置；通过编号与书籍的映射关系便于管理与查找书籍的效率。</p><p>所以，哈希表其实就是 <code>data</code> 通过数组存储在某个空间，找到 <code>key</code> 与 <code>data</code> 间的映射关系（哈希函数），然后根据映射关系对于数据进行操作。</p><p>举个例子：有 A 班级，每个同学都有学号与姓名，那么我们就可以设计一个哈希表来让学号与姓名对应存储。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/***
 * 数据如下：
 * 学号|12836|15937|16750|13276|10583|
 * 姓名| 小明 | 小红 | 小白 | 小吕 | 张三 |
*/</span>

<span class="token doc-comment comment">/**
 * 简单设计：
 * 存储：采用数组来存储学号与姓名的完整数据，存储的位置由哈希函数对应的关系来存储
 * 哈希函数：hash(key) % capacity
 *  1. 通过某种哈希算法得到哈希值
 *  2. 将哈希值对应数组容量取模，从而得到该 key 对应 的 index
*/</span>

<span class="token comment">// 根据数据设计数组容量为 100，哈希函数为 key % 100 得到的数值当作数组下标进行存储管理</span>

<span class="token comment">// 键值对</span>
<span class="token keyword">class</span> <span class="token class-name">Pair</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> key<span class="token operator">:</span> <span class="token builtin">number</span>
  <span class="token keyword">public</span> value<span class="token operator">:</span> <span class="token builtin">string</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>key <span class="token operator">=</span> key
    <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> value
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 利用数组简单的实现哈希表</span>
<span class="token keyword">class</span> <span class="token class-name">ArrayHashMap</span> <span class="token punctuation">{</span>
  <span class="token comment">// 存储总数据的数组</span>
  <span class="token keyword">private</span> hashArr<span class="token operator">:</span> <span class="token builtin">Array</span><span class="token operator">&lt;</span>Pair <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Array</span></span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 哈希函数</span>
  <span class="token keyword">private</span> <span class="token function">hashFunc</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> key <span class="token operator">%</span> <span class="token number">100</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取数据</span>
  <span class="token keyword">public</span> <span class="token function">get</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hashFunc</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">const</span> pair <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>index<span class="token punctuation">]</span>
    <span class="token keyword">return</span> pair <span class="token operator">?</span> pair<span class="token punctuation">.</span>value <span class="token operator">:</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 添加数据</span>
  <span class="token keyword">public</span> <span class="token function">set</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hashFunc</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Pair</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 删除数据</span>
  <span class="token keyword">public</span> <span class="token keyword">delete</span><span class="token punctuation">(</span>key<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> index <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hashFunc</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取所有的键值对</span>
  <span class="token keyword">public</span> <span class="token function">entries</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取所有键</span>
  <span class="token keyword">public</span> <span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bucket <span class="token operator">&amp;&amp;</span> bucket<span class="token punctuation">.</span>key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>bucket<span class="token punctuation">.</span>key<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr
  <span class="token punctuation">}</span>

  <span class="token comment">// 获取所有值</span>
  <span class="token keyword">public</span> <span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> bucket <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>hashArr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>bucket <span class="token operator">&amp;&amp;</span> bucket<span class="token punctuation">.</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>bucket<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> arr
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="哈希冲突" tabindex="-1"><a class="header-anchor" href="#哈希冲突" aria-hidden="true">#</a> 哈希冲突</h3><p>上面的简单实现可能存在<strong>哈希冲突</strong>的时候，比如学号 15136、24336。</p><p>当然，如果遇到了冲突的情况我们可以选择<strong>哈希扩容</strong>的方式，不过这种方式过于简单粗暴，而且性能也不好，所以一般情况下我们遇到冲突会先使用策略来保证冲突存在也不影响我们正常操作，当冲突达到一定阈值才会进行扩容。</p><p>下面一起来看看可以解决<strong>哈希冲突</strong>的策略。</p><h4 id="链式地址" tabindex="-1"><a class="header-anchor" href="#链式地址" aria-hidden="true">#</a> 链式地址</h4><p>在原始的哈希表存储时是一个“桶”存储一条数据，这样很容易遇到哈希冲突的问题，将存储改为链式地址的方式就可以解决该问题。但是要注意哈希冲突如果过多那么性能将会变得极差，所以需要设置一个合理的阈值超过该值的话就需要进行扩容。</p><h4 id="开放寻址" tabindex="-1"><a class="header-anchor" href="#开放寻址" aria-hidden="true">#</a> 开放寻址</h4><h2 id="树🌲" tabindex="-1"><a class="header-anchor" href="#树🌲" aria-hidden="true">#</a> 树🌲</h2><h3 id="二叉树" tabindex="-1"><a class="header-anchor" href="#二叉树" aria-hidden="true">#</a> 二叉树</h3><p>简单理解就是拥有两个分支/叉的树（节点），它是一种非线性结构，一个节点包括左右两个子节点，子节点与父节点靠引用（指针）连接。和链表有些相似是不是🤔️</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">TreeNode</span> <span class="token punctuation">{</span>
  val<span class="token operator">:</span> <span class="token builtin">number</span>
  left<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span>
  right<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span>val<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> left<span class="token operator">?</span><span class="token operator">:</span> TreeNode<span class="token punctuation">,</span> right<span class="token operator">?</span><span class="token operator">:</span> TreeNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>val <span class="token operator">=</span> val <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> val
    <span class="token keyword">this</span><span class="token punctuation">.</span>left <span class="token operator">=</span> left <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> left
    <span class="token keyword">this</span><span class="token punctuation">.</span>right <span class="token operator">=</span> right <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> right
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二叉树的常见术语" tabindex="-1"><a class="header-anchor" href="#二叉树的常见术语" aria-hidden="true">#</a> 二叉树的常见术语</h3><ul><li>根节点（root node）：位于二叉树的顶层，没有父节点。</li><li>叶节点（leaf node）：位于二叉树的最底层，没有子节点。</li><li>边（edge）：连接父子节点之间的引用（指针）。</li><li>节点所在的层（level）：从顶至底递增，顶层根节点为 1。</li><li>节点的度（degree）：节点的子节点的数量，范围为0、1、2。</li><li>二叉树的高度（height）：根节点距离最远叶节点之间走过的边的数量。</li><li>节点的深度（depth）：根节点距离当前节点之间走过的边的数量。</li><li>节点的高度（height）：当前节点距离最远叶节点之间走过的边的数量。</li></ul><h3 id="二叉树的基本操作" tabindex="-1"><a class="header-anchor" href="#二叉树的基本操作" aria-hidden="true">#</a> 二叉树的基本操作</h3><h4 id="初始化二叉树" tabindex="-1"><a class="header-anchor" href="#初始化二叉树" aria-hidden="true">#</a> 初始化二叉树</h4><p>如下的树： 1 / <br> 2 3 / <br> 4 5</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">/* 初始化二叉树 */</span>
<span class="token comment">// 初始化节点</span>
<span class="token keyword">let</span> n1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    n2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    n3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    n4 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    n5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 构建引用指向（即指针）</span>
n1<span class="token punctuation">.</span>left <span class="token operator">=</span> n2<span class="token punctuation">;</span>
n1<span class="token punctuation">.</span>right <span class="token operator">=</span> n3<span class="token punctuation">;</span>
n2<span class="token punctuation">.</span>left <span class="token operator">=</span> n4<span class="token punctuation">;</span>
n2<span class="token punctuation">.</span>right <span class="token operator">=</span> n5<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="插入与删除节点" tabindex="-1"><a class="header-anchor" href="#插入与删除节点" aria-hidden="true">#</a> 插入与删除节点</h4><p>我们想要在 <code>n1</code> 与 <code>n2</code> 处添加一个节点 <code>p</code></p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//初始化 p 节点</span>
<span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeNode</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 插入 p 节点</span>
n1<span class="token punctuation">.</span>left <span class="token operator">=</span> p<span class="token punctuation">;</span>
p<span class="token punctuation">.</span>left <span class="token operator">=</span> n2<span class="token punctuation">;</span>
<span class="token comment">// 删除 p 节点</span>
n1<span class="token punctuation">.</span>left <span class="token operator">=</span> n2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常见二叉树的类型" tabindex="-1"><a class="header-anchor" href="#常见二叉树的类型" aria-hidden="true">#</a> 常见二叉树的类型</h3><h4 id="完美二叉树-满二叉树-perfect-binary-tree" tabindex="-1"><a class="header-anchor" href="#完美二叉树-满二叉树-perfect-binary-tree" aria-hidden="true">#</a> 完美二叉树/满二叉树（perfect binary tree）</h4><p>完美的二叉树，所有的节点都有左右子节点，当然，叶节点的度为 0。</p><h4 id="完全二叉树-complete-binary-tree" tabindex="-1"><a class="header-anchor" href="#完全二叉树-complete-binary-tree" aria-hidden="true">#</a> 完全二叉树（complete binary tree）</h4><p>只有最底层节点未被填满，当然，要满足优先填充左节点。</p><blockquote><p>1 下面为啥有两个边？是因为不这样的话 5 与 6 就粘一起了，实际把 1 下面当成一个边就好了。</p></blockquote><pre><code>     1
    / \\
   /   \\
  2     3
 / \\   /
4   5 6   
</code></pre><h4 id="完满二叉树-full-binary-tree" tabindex="-1"><a class="header-anchor" href="#完满二叉树-full-binary-tree" aria-hidden="true">#</a> 完满二叉树（full binary tree）</h4><p>除了叶节点之外，其他节点必须有两个子节点。</p><pre><code>    1
   / \\
  2   3
 / \\
4   5    
</code></pre><h4 id="平衡二叉树-balanced-binary-tree" tabindex="-1"><a class="header-anchor" href="#平衡二叉树-balanced-binary-tree" aria-hidden="true">#</a> 平衡二叉树（balanced binary tree）</h4><p>任意节点的左子树与右子树之间高度差的绝对值不超过 1。</p><pre><code>    1
   / \\
  2   3
 /   / \\
4   5   6
   / \\
  7   8
</code></pre><h3 id="二叉树的退化" tabindex="-1"><a class="header-anchor" href="#二叉树的退化" aria-hidden="true">#</a> 二叉树的退化</h3><p>想象一下，如果所有的节点只有左子节点会发生什么事情？是不是变成了一个链表</p><h3 id="二叉树的遍历" tabindex="-1"><a class="header-anchor" href="#二叉树的遍历" aria-hidden="true">#</a> 二叉树的遍历</h3><h4 id="广度优先" tabindex="-1"><a class="header-anchor" href="#广度优先" aria-hidden="true">#</a> 广度优先</h4><p>使用队列完成遍历</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">levelOrder</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token comment">// 初始化队列</span>
  <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span>root<span class="token punctuation">]</span>
  <span class="token comment">// 初始化遍历容器</span>
  <span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token keyword">while</span><span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> list
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="深度优先" tabindex="-1"><a class="header-anchor" href="#深度优先" aria-hidden="true">#</a> 深度优先</h4><ul><li><p><strong>先序遍历</strong>是根左右</p></li><li><p><strong>中序遍历</strong>是左根右</p></li><li><p><strong>后序遍历</strong>是左右中</p><pre><code>  1
 / \\
2   3
</code></pre><p>/ / <br> 4 5 6 / <br> 7 8</p></li></ul><p>拿上面的例子来举例：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">// 先序遍历</span>
<span class="token keyword">function</span> <span class="token function">preOrder</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
  <span class="token function">preOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  <span class="token function">preOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 中序遍历</span>
<span class="token keyword">function</span> <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
  <span class="token function">inOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 后序遍历</span>
<span class="token keyword">function</span> <span class="token function">postOrder</span><span class="token punctuation">(</span>root<span class="token operator">:</span> TreeNode <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span>
  <span class="token function">postOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>left<span class="token punctuation">)</span>
  <span class="token function">postOrder</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>right<span class="token punctuation">)</span>
  list<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>val<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="图" tabindex="-1"><a class="header-anchor" href="#图" aria-hidden="true">#</a> 图</h2><h3 id="什么是图" tabindex="-1"><a class="header-anchor" href="#什么是图" aria-hidden="true">#</a> 什么是图？</h3><p>图是由顶点（vertex）和边（edge）组成，简单来讲就是：存在几个顶点，这几个顶点之间可以通过边来连接，并且可以没有固定的顺序；</p><p>如果说树是一对多的关系，那么图就是多对多的关系。</p><h3 id="怎样表示图" tabindex="-1"><a class="header-anchor" href="#怎样表示图" aria-hidden="true">#</a> 怎样表示图？</h3><p>可以通过邻接矩阵、邻接表的方式来表示一个图，可以将邻接矩阵理解为用空间来换时间。</p><h4 id="邻接表" tabindex="-1"><a class="header-anchor" href="#邻接表" aria-hidden="true">#</a> 邻接表</h4><p>邻接表是我们常用的来表示图的方式，也即记录顶点与顶点之前是否存在边的关系来表示。</p><p>比如：</p><pre><code> A
</code></pre><p>/ <br> B C / \\ <br> D E F</p><p>表示为：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> graph <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;A&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;B&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;C&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;F&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;D&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;E&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;F&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么如何遍历一个图呢？有两种方式：</p><ol><li>广度优先遍历（BFS）</li><li>深度优先遍历（DFS）</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> graph <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token string-property property">&quot;A&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;B&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;C&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;B&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;D&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;E&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;C&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;F&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;D&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;E&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token string-property property">&quot;F&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 1. 广度优先遍历</span>
<span class="token keyword">const</span> <span class="token function-variable function">graphBFS</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">graph<span class="token punctuation">,</span> start</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 定义 visited 用来记录是否已经遍历过该节点</span>
  <span class="token keyword">const</span> queue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 定义队列用来进行遍历节点的操作</span>
  queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将初始节点入队</span>
  visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>queue<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> node <span class="token operator">=</span> queue<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//出队    </span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> adjVet <span class="token keyword">of</span> graph<span class="token punctuation">[</span>node<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>visited<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>adjVet<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">continue</span><span class="token punctuation">;</span>
      queue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>adjVet<span class="token punctuation">)</span><span class="token punctuation">;</span>
      visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>adjVet<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">graphBFS</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> <span class="token string">&quot;A&quot;</span><span class="token punctuation">)</span>

<span class="token comment">// 2. 深度优先遍历</span>
<span class="token keyword">const</span> <span class="token function-variable function">graphDFS</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">graph<span class="token punctuation">,</span> start</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> visited <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Set</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  
  <span class="token keyword">const</span> <span class="token function-variable function">dfs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">vet</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>graph<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>vet<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> ret <span class="token keyword">of</span> graph<span class="token punctuation">[</span>vet<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>visited<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        visited<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token function">dfs</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token function">dfs</span><span class="token punctuation">(</span>start<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">graphDFS</span><span class="token punctuation">(</span>graph<span class="token punctuation">,</span> <span class="token string">&#39;A&#39;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,66),o=[e];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","nolinear-struct.html.vue"]]);export{r as default};
