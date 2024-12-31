import{_ as n,p as a,q as s,Y as e}from"./framework-e1bed10d.js";const t="/classUpdater.jpg",o={},c=e('<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>众所周知，React 存在 Class 组件和 Function 组件，从官方给的 API 来看 Class 组件的更新使用 <code>this.setState()</code>、<code>this.forceUpdate()</code>，Function 组件使用 Hook 的形势来实现更新比如：<code>useState</code>、<code>useReducer</code>。</p><p>接下来就从 Class 组件开始看起。</p><h2 id="this-setstate-的更新" tabindex="-1"><a class="header-anchor" href="#this-setstate-的更新" aria-hidden="true">#</a> <code>this.setState()</code> 的更新</h2><h3 id="更新流程" tabindex="-1"><a class="header-anchor" href="#更新流程" aria-hidden="true">#</a> 更新流程</h3><ol><li>调用 Component 上的 <code>SetState</code> 方法</li><li>调用 updater 上的 <code>enqueueSetState</code> 方法，如下图： <img src="'+t+`" alt="classUpdater"></li><li>设置好更新队列后调度执行</li></ol><h3 id="如何处理多次更新的情况" tabindex="-1"><a class="header-anchor" href="#如何处理多次更新的情况" aria-hidden="true">#</a> 如何处理多次更新的情况？</h3><ol><li>将所有同步的更新加入队列</li><li>在 render 阶段前取出更新队列中的任务，将它们串成链表</li><li>进入 render 阶段就是处理更新队列逻辑（<code>processUpdateQueue(workInProgress, newProps, instance, renderLanes)</code>）</li></ol><ul><li>如果 <code>setState</code> 中传的是回调函数的话就会将回调函数推进回调队列</li><li>如果 <code>setState</code> 中传的是对象的话，就只会取最后一个 <code>setState</code> 传递的对象</li></ul><h3 id="疑问🤔" tabindex="-1"><a class="header-anchor" href="#疑问🤔" aria-hidden="true">#</a> 疑问🤔</h3><ul><li>为什么同步调用多次 <code>this.setState</code> 会对他们进行批处理？ <ul><li>这是因为 React 对于事件、生命周期函数等都使用了 <code>batchUpdates</code> 包裹，通过该方法包裹的函数会将变量 <code>executionContext</code> 设置为 1（默认为 0）</li><li>那将 \`\` 设置为 1 与 0 有什么区别呢？ <ul><li>区别很大，请看下面代码</li></ul><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// NoContext 默认为 0，如果 executionContext 默认为 0 的话就会进入该逻辑</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>lane <span class="token operator">===</span> SyncLane <span class="token operator">&amp;&amp;</span> executionContext <span class="token operator">===</span> NoContext <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ConcurrentMode<span class="token punctuation">)</span> <span class="token operator">===</span> NoMode <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token punctuation">(</span> ReactCurrentActQueue$2<span class="token punctuation">.</span>isBatchingLegacy<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">resetRenderTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">flushSyncCallbacksOnlyInLegacyMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 会立刻执行调度任务</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>以上的代码就解释了为什么未被 <code>batchUpdates</code> 包裹的异步函数会同步执行 <code>setState</code></li><li>等等，你还是无法理解？</li><li>那么还有一点就是事件循环的逻辑，因为 js 遇到异步任务会将该任务交给浏览器然后加入任务队列，等待被调度（也就是说需要等待 React 同步逻辑调用完毕才会执行下一次的异步任务）</li></ul></li></ul></li></ul><h2 id="hook-中-setstate-的更新" tabindex="-1"><a class="header-anchor" href="#hook-中-setstate-的更新" aria-hidden="true">#</a> hook 中 <code>setState</code> 的更新</h2><p>hook 中的状态更新与上面 <code>this.setState()</code> 类似，都是</p><h3 id="更新流程-1" tabindex="-1"><a class="header-anchor" href="#更新流程-1" aria-hidden="true">#</a> 更新流程</h3><ol><li>注册 <code>useState</code> hook，返回 <code>dispatchSetState</code> 更新函数</li></ol><ul><li>期间会注册好更新队列并保存状态</li></ul><ol start="2"><li>调用 <code>dispatchSetState</code> 函数</li></ol><ul><li>需要注意的是，这里会针对状态一样的更新做复用处理（<code>eagerState</code>）；当然，只有节点的优先级未被设置且不存在 <code>alternate</code> 才会进行该处理。</li></ul><ol start="3"><li>加入并发更新队列后调度更新</li></ol><h3 id="如何处理多次更新的情况-1" tabindex="-1"><a class="header-anchor" href="#如何处理多次更新的情况-1" aria-hidden="true">#</a> 如何处理多次更新的情况？</h3><p>和 class 组件的处理类似，不过值得注意的是由于闭包的存在，没有经过批量处理包裹的更新最后得出来的结果有差异，举个例子：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * class 组件
 * 如果不经过 batchUpdates 包裹，最终得到的结果是 3（假设原 count 为 0）
 */</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  count<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token operator">+</span><span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  count<span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token operator">+</span><span class="token number">1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token doc-comment comment">/**
 * function 组件
 * 如果不经过 batchUpdates 包裹（函数式组件 useEffect 是通过 flushPassiveEffectsImpl 设置的 executionContext），最终得到的结果是 1（假设原 count 为 0） 
 * 这里搞清楚批量更新本质就是通过设置 executionContext 不为 0 就可以了
*/</span>
<span class="token function">setCount</span><span class="token punctuation">(</span>count<span class="token operator">+</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token function">setCount</span><span class="token punctuation">(</span>count<span class="token operator">+</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token function">setCount</span><span class="token punctuation">(</span>count<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment">// 为什么会有这样的差异呢？ 这是因为函数式组件的 count 取的是闭包中 count 的值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异步调用多次更新又会怎样" tabindex="-1"><a class="header-anchor" href="#异步调用多次更新又会怎样" aria-hidden="true">#</a> 异步调用多次更新又会怎样？</h3><p>从上面的例子中我们得知有闭包的存在，所以异步调用与同步调用没啥区别</p>`,24),i=[c];function p(l,d){return a(),s("div",null,i)}const r=n(o,[["render",p],["__file","react-update.html.vue"]]);export{r as default};