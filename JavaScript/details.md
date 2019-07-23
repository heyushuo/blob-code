
<h2 style="color:#0269c8;" id="0">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>

### 谈谈你对前端组件化和模块化的理解

前文中我们提到过,组件化也是工程化的表现形式,那么到底什么是前端组件化呢

页面上的每个独立的、可视/可交互区域视为一个组件;
每个组件对应一个工程目录,组件所需的各种资源都在这个目录下就近维护;
由于组件具有独立性,因此组件与组件之间可以 自由组合;
页面只不过是组件的容器,负责组合组件形成功能完整的界面;
当不需要某个组件,或者想要替换组件时,可以整个目录删除/替换。

组件化将页面视为一个容器,页面上各个独立部分例如:头部、导航、焦点图、侧边栏、底部等视为独立组件,不同的页面根据内容的需要,去盛放相关组件即可组成完整的页面。

PS:模块化和组件化一个最直接的好处就是复用,同时我们也应该有一个理念,模块化和组件化除了复用之外还有就是分治,我们能够在不影响其他代码的情况下按需修改某一独立的模块或是组件,因此很多地方我们及时没有很强烈的复用需要也可以根据分治需求进行模块化或组件化开发。

### MVC 和 MVVM 模式的区别和各自的优点

**MVC**

- M - Model ：数据保存
- V - View : 用户界面
- C - Controller ： 业务逻辑

在通常的开发中，除了简单的 `Model、View` 以外的所有部分都被放在了 `Controller` 里面。`Controller` 负责显示界面、响应用户的操作、网络请求以及与 `Model` 交互。

**MVC 有两个很明显的问题：**

- 逻辑复杂，难以维护。
- 和 `View` 紧耦合，无法测试。
- m 层和 v 层直接打交道，导致这两层耦合度高
- 因为所有逻辑都写在 c 层，导致 c 层特别臃肿

![mvc](https://img-blog.csdn.net/20180610090729972)

**MVVM**

MVVM 是 Model-View-ViewModel 的缩写。

- Model 代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑。
- View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来。
- ViewModel 监听模型数据的改变和控制视图行为、处理用户交互，简单理解就是一个同步 View 和 Model 的对象，连接 Model 和 View

在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。
![mvvm](https://img-blog.csdn.net/20180610091312850)
<p><a href="#0" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="1">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#1" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="2">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#2" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="3">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#3" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="4">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#4" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="5">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#5" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="6">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#6" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="7">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#7" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="8">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#8" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="9">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#9" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="10">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#10" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="11">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#11" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="12">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#12" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="13">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#13" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="14">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#14" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="15">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#15" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="16">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#16" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="17">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#17" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="18">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#18" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="19">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#19" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="20">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#20" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="21">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#21" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="22">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#22" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="23">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#23" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="24">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#24" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="25">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#25" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="26">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#26" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="27">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#27" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="28">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#28" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="29">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#29" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="30">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#30" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="31">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#31" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="32">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#32" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="33">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#33" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="34">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#34" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="35">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#35" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="36">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#36" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="37">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#37" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="38">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#38" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="39">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#39" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="40">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#40" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="41">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#41" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="42">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#42" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="43">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#43" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="44">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#44" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="45">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#45" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="46">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#46" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="47">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#47" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="48">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#48" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="49">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#49" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="50">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#50" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="51">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#51" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="52">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#52" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="53">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#53" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="54">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#54" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="55">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#55" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="56">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#56" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="57">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#57" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="58">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#58" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="59">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#59" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="60">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#60" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="61">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#61" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="62">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#62" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="63">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#63" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="64">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#64" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="65">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#65" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="66">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#66" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="67">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#67" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="68">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#68" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="69">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#69" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="70">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#70" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="71">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#71" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="72">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#72" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="73">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#73" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="74">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#74" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="75">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#75" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="76">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#76" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="77">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#77" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="78">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#78" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="79">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#79" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="80">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#80" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="81">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#81" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="82">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#82" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="83">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#83" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="84">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#84" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="85">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#85" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="86">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#86" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="87">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#87" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="88">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#88" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="89">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#89" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="90">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#90" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="91">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#91" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="92">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#92" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="93">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#93" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="94">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#94" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="95">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#95" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="96">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#96" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="97">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#97" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="98">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#98" ><b>返回</b></a></p>
</details>



<h2 style="color:#0269c8;" id="99">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>
<p><a href="#99" ><b>返回</b></a></p>
</details>


