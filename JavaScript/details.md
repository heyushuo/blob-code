
<h2 style="color:#0269c8;" id="0">我是问题?</h2>
<details>
<summary><b>查看解析</b></summary>

# 滴滴WebApp实践经验分享
黄轶，前端技术专家，现就职于滴滴出行公共FE团队，前端技术专家。计算机专业硕士，2012年毕业于北京科技大学，曾任职百度。擅长前端自动化、工程化，前端架构等方向。业余时间喜欢写点H5小游戏，偶尔造造轮子。喜欢关注业界一些新技术，乐于分享，热爱开源。对代码有洁癖，追求高质量的代码。

本文为滴滴公共FE团队在WebApp方向的一些实践经验总结，主要内容包括：WebApp首页技术架构、前端工程化在WebApp的实践、通用地图JS库的设计和实践、 统一登录SDK的设计、通用客户端JSBridge的封装、在公共部门做通用服务的一些感悟、个人成长总结。

[这里是github地址](https://github.com/ustbhuangyi)，欢迎star和follow~

## 1. WebApp首页技术架构
### 需求分析
（1）滴滴多条业务线在一个 WebApp 页面里运行，业务线之间互不影响。
（2）业务线发单流程基本一致，部分业务线支持自定义化。
（3）业务线可以独立自主迭代上线，不需要公共团队的参与。
（4）新业务线可以快速接入首页。

### 解决方案
（1）每个业务线提供自已的 biz.js，首页加载的时候会异步请求这些 JS 文件。
（2）公共提供全局的 dd.registerBiz(option) 方法，供业务线 biz.js 调用，同时在 option 里提供 init、onEnter、onExit、orderRecover 等钩子函数，业务线的代码通过调用 dd.registerBiz 方法完成接入。
（3）把页面拆分成多个区块，有一些公共区块如一级导航菜单和地址选择区块；也有一些业务线区块如 ETA 区块、发单区块、自定义区块等。公共会在业务线区块下根据 registerBiz 注册的业务线动态创建业务线独立的子区块，业务线可以填充这些子区块的 DOM，公共这边提供通用的样式。创建业务线区块的时候完毕会调用 init 钩子函数，业务线可以在这个函数里做一些初始化操作。
（4）公共负责管理业务线的切换，来控制每个业务线子区块的 show 和 hide，这些细节业务线不用关心。在切入的时候会调用 onEnter 钩子函数，切出的时候会调用 onExit 钩子函数。
（5）公共会提供业务线一些公共方法调用，比如统一的 sendOrder 发单方法。还会通过事件机制和业务线通讯，比如当公共定位完成会调用 events.emit('location.suceess',posInfo) 派发事件，业务线可以监听该事件拿到定位信息。
（6）公共会提供一些封装好的通用组件，供业务线调用。
（7）业务线的 biz.js 地址是通过服务端渲染前端模板的时候通过变量传到模板里的，这个 JS 地址业务线可以自主配置，达到业务线自主上线的目的。
（8）新业务线的接入只需要提供业务线 biz.js，实现 dd.registerBiz 接口。公共不用关心具体接入的业务线，与业务线这边完全解耦。公共这边还提供了一套完整的 wiki，方便业务线接入。

### 技术栈
（1）scrat 完成模块化 + 构建。
（2）zepto + gmu 实现组件化。
（3）前端模板 handlebar。
（4）combo 服务。

### 部分代码示例
业务线接入的 biz.js 示例如下：

```js
dd.registerBiz({
        id: 123, 
        _tpl: {
            // ...
        },
        init: function (ids) {
            // ...
        },
        onEnter: function () {
            // ...
        },
        onExit: function() {
            // ...
        }
    });
```

## 2. 前端工程化在WebApp的实践
### 需求分析
（1）支持模块化开发，包括 JS 和 CSS。
（2）组件化开发。一个组件的 JS、CSS、模板放在一个目录，方便维护。
（3）多个项目按项目名称 + 版本部署，采用非覆盖式发布。
（4）允许第三方引用项目公共模块。
（5）要支持 CSS 预处理器，前端模板。
（6）与公司的 jenkins 发布平台配合，上线方便。
（7）前后端分离，前端可以独立自主上线。

### 解决方案
（1）使用 [scrat](http://scrat.io/#!/index) 做前端工程化工具，完美支持上述的 1-5 需求。
（2）每个项目用一个 git 的 repo 维护，然后有专门上线的2个 repo，一个存储静态资源，另一个存储页面模板。每个项目有一个shell脚本，脚本通过 scrat 编译当前项目，把编译后的结果分别 push 到上线的 repo。然后上线的 2 个 repo 关联公司的 jenkis 平台发布上线。
（3）每个项目迭代上线前修改版本号，所有静态资源都会增量发布。上线过程先全量上线静态资源，线上模板仍然指向旧的资源，不会有任何问题。然后再上线模板，先上到预发布环境让 qa 回归，回归完后再全量上线模板，完成整个上线流程。

### 部分代码示例
一个WebApp项目的目录结构如下：

```
project
  |- component_modules（生态模块）
  |- components       （工程模块）
  |- views            （非模块资源）
  |- component.json   （模块化资源描述文件）
  |- fis-conf.js      （构建工具配置文件）
  |- package.json     （项目描述文件）
  |- index.html
  |- …
```

一个组件的目录结构如下：

```
components
  |- header
    |- header.js
    |- header.styl
    |- header.tpl
    |- logo.png
```

按项目名称 + 版本发布的 fis-conf.js 配置规则如下：

```js
var meta = require('./package.json');
fis.config.set('name', meta.name);
fis.config.set('version', meta.version);

// 自定义发布规则
var userRoadMap = [
    {
        reg: /^\/components\/(.*\.tpl)$/i,
        isHtmlLike: true,
        release: '/pages/c/${name}/${version}/$1'
    },
    {
        reg: /^\/pages\/(.*\.tpl)$/,
        useCache: false,
        isViews: true,
        isHtmlLike: true,
        release: '/pages/${name}/${version}/$1'
    },
    {
        reg: /^\/pages\/boot\.js$/,
        useOptimizer: false,
    },
    {
        reg: /^\/pages\/(.*\.(?:js))$/,
        useCache: false,
        isViews: true,
        url: '/${name}/${version}/$1',
        release: '/public/${name}/${version}/$1'
    },
    {
        reg: /^\/pages\/(.*\.(?:html))$/,
        useCache: false,
        useOptimizer: false,
        isViews: true,
        release: '$1'
    },
    {
        reg: /^\/pages\/(.*)$/,
        useSprite: true,
        isViews: true,
        url: '/${name}/${version}/$1',
        release: '/public/${name}/${version}/$1'
    }
];

var defaultRoadmap = fis.config.get('roadmap.path');
fis.config.set('roadmap.path', userRoadMap.concat(defaultRoadmap));
```

编译后部署的目录结构如下：

```
 |-public （生成的静态资源目录）
    |- c
      |- project
        |-1.0.0
          |- header
           |- header.css
           |- header.css.js
           |- header.js
        |- home
        ...
    |- project
      |- 1.0.0
      |- lib
 |- index.html
 |-views    （模板目录）
 |- … 
```

## 3. 通用地图JS库的设计和实践
### 需求分析
（1）支持多种地图、多种地图场景的开发。
（2）屏蔽底层地图库（高德、腾讯）的接口差异。
（3）实现小车平滑移动。

### 解决方案
（1）底层对腾讯地图和高德地图分别封装（不会在源码中出现 if(qq){} 风格的代码)，依据 webpack 动态打包成 2 个 JS文件，上游根据需求异步加载 JS ，对外提供同一套编程接口。
（2）抽象地图场景的概念，可以通过接口注册一个场景类，在场景中可以操作各种封装好的地图组件和方法，编写业务逻辑，实现需求。
(3）小车的平滑移动通过封装地图 sdk 提供的底层 marker，轮询小车坐标点，实现小车平滑移动（css3），并把“移动 + 转向 + 移动...”一系列操作抽象出动画队列的概念。

### 技术栈
（1）原生 js
（2）webpack 打包

### 行程分享实践
![行程分享](https://camo.githubusercontent.com/df4abbc8c47ec8a8c5949a884ff8d9638dc6b394/687474703a2f2f7765626170702e646964697374617469632e636f6d2f7374617469632f7765626170702f736869656c642f7472697073686172652e706e67)
行程分享这个场景中，有等待接驾、行程中、行程结束等状态，有轨迹，小车平滑移动等功能。我们要做的就是利用通用地图 JS 库暴露的接口去编写行程分享的逻辑。

贴一下部分代码，看一下如何去使用封装好的地图 JS 库。

我们可以先去写一个行程分享的场景：tripShare.js

```js
var Map = window.map;

var _ = Map.utils._;
var inherit = Map.utils.inherit;
var api = Map.utils.api;
var config = Map.utils.config;
var EventEmitter = Map.utils.EventEmitter;
var Car = Map.component.Car;
var StartPoint = Map.component.StartPoint;
var EndPoint = Map.component.EndPoint;
var TrackControl = Map.control.TrackControl;
var TrafficControl = Map.control.TrafficControl;
var TrafficLayer = Map.layer.TrafficLayer;
var Polyline = Map.Polyline;

function TripShare(map, options) {
    TripShare._super.call(this);
    // ...
}

inherit(TripShare, EventEmitter);

TripShare.prototype.begin = function () {
    // ...
};

// ...
```

然后我们这样去注册场景。

```js
var Map = window.map;
var fromlat = 31.17626;
var fromlng = 121.425;
var tolat = 31.20425;
var tolng = 121.40398;


Map.ready(function (mapInstance) {
    var map = mapInstance.createMap('container', {});

    var TripShare = require('./tripShare');

    var scene = map.scene.register(TripShare, {
        orderStatus: 1,
        url: 'xxxx',
        oid: 'aaaa',
        pathUrl: 'xxxx'
        fromlat: fromlat,
        fromlng: fromlng,
        tolat: tolat,
        tolng: tolng,
        usePath: true
    });
    scene.begin();
    scene.on('path.badCase', function(badCase) {
        // do anything
    });
});
```

我们可以调用场景的方法，又由于场景继承了 EventEmitter 事件中心，它会通过 trigger 派发事件，我们可以监听这些事件，去做一些事情。

## 4. 统一登录SDK的设计
### 需求分析
（1）滴滴有众多业务线，每个业务线都有独立的域名，需要打通各个WebApp域名的登录态。
（2）方便新老业务线、运营活动等页面接入登录。
（3）提供简单、友好的接口。

### 解决方案
（1）与帐号部门合作，通过跨域方式访问 passport 域名下的接口。跨域方案是通过 iframe passport 域名下的页面，利用 postmessage 进行通信。登录成功后会在 passport 域名下利用种下 ticket。后端提供判断是否登录的接口，前端请求这个接口的时候会从 passport 域名下读取 ticket 并把它作为请求的参数传给后端，这样一旦用户在 a 域名下登录成功，那么在 b 域名下调用是否登录接口，返回的就是登录成功的结果，这样就打通了多个域名的登录态。
（2）封装复杂的登录交互细节，对外提供简单的交互接口。
（3）提供完善 wiki 文档，建立专门的钉钉服务交流群。

### 技术方案
![此处输入图片的描述](https://camo.githubusercontent.com/5bf02d958807f8397dbb7fa74a9992949643fbb5/687474703a2f2f7765626170702e646964697374617469632e636f6d2f7374617469632f7765626170702f736869656c642f33343039364631392d423445442d343836452d414538392d4230303935414237323138392e706e67)

### 技术栈
（1）原生 js
（2）webpack 打包

## 5. 通用客户端JSBridge的封装
### 需求分析
（1）内嵌在滴滴 app 端里的页面，需要通过 JSBrigde 的方式获取端的一些能力。
（2）屏蔽 IOS 端和 Android 端的一些底层通讯差异。
（3）提供简单、友好的接口。

### 解决方案
（1）对 IOS 和 Anroid 的交互接口进一层封装，所有需要与端通讯的接口封装成 DDBridge.funcName(options,callback) 的方式。
（2）对端的一些具象接口，比如分享微信、分享微博等做更高级封装，提供share接口，通过参数指定分享到不同的渠道。
（3）提供完善 wiki 文档，建立专门的钉钉服务交流群。

### 技术栈
（1）es6 + eslint
（2）webpack 打包

### 部分代码示例：
```
export function initGlobalAPI(DDBridge) {
    each(config.api, (conf, name) => {
        DDBridge[name] = makeBridgeFn(conf);
        DDBridge[name].support = conf.support;
    });

    initSupport(DDBridge);
    initVersion(DDBridge);
    initShare(DDBridge);
    initPay(DDBridge);
};

export function makeBridgeFn(conf) {
    return function (param = '', callback = noop) {
        if (arguments.length === 1 && isFn(param)) {
            callback = param;
            param = '';
        }

        let fn = conf.fn;
        if (supportPrompt) {
            promptSend(fn, param, callback);
        } else {
            bridgeReady((bridge) => {
                bridge.callHandler(fn, param, (data) => {
                    if (isStr(data)) {
                        data = JSON.parse(data);
                    }
                    callback(data);
                });
            });
        }
    };
};
```

## 在公共部门做通用服务的一些感悟
入职滴滴一年，造了不少公司级别的“轮子”，不少轮子已经在业务线跑起来了，运行状况还算可以。我自己也总结了做通用服务要注意的几点：

1.一定要好用，用起来要简单。

这是我一直贯彻的理念，如果你写的通用服务不好用，那一定会受到质疑和吐槽。同样我们用开源的框架，也一定会选简单好用的，当年 jQuery，prototype，tangram 等 JS 库百家争鸣的时候，jQuery笑到了最后，为什么呢，很简单的一点，jQuery好用啊，一个 $(xxx) 搞定一切。相比 tangram 那种 Baidu.T.createDom() 的方式，高下立判。

我们在设计通用 JS 库的时候，一定要站在更高的角度去对需求做抽象。比如我在设计统一登录 SDK，首先要想的不是复杂的交互逻辑、如何去实现、有哪些技术难点，而是去想，别人怎么用这个库，怎么用起来爽。登录的需求就是用户触发一个登录动作，登录完成能拿到用户一些信息，所以我就设计一个login(callback)接口，那么使用方只需要简单调用这个方法，就可以完成登录需求，而不用去关心登录各种复杂的细节。

2.该做封装的地方要封装，对外暴露的接口越少越好。

封装很重要，举个通俗的例子，有一天我去洗手，发现水龙头的开关把手没了，把原始的开关暴露给我了，也能用，但是体验就会很不好。水龙头的开关把手就是对原始开关的封装。我在做 JSBridge 库 的时候，也是一样的道理，如果让用户直接调用 IOS 和 Andrid 提供的原生 bridge 接口的，也能 work，但是非常难用，需要判断 IOS 和 Android 接口的差异，还需要考虑 bridge ready 事件后才能执行方法等，这些都是我原本不需要关心的细节。所以我们的库就是帮助用户封装掉这些“脏活”，对外提供简单的 DDBridge.funcName(options,callback) 接口，优化使用体验。

为什么说对外暴露的接口越少越好，因为接口越多，则说明用户的学习成本越高，比如如火如荼的 Vue.js，1.x 版本很多接口的功能大同小异，所以在 2.0 版本的 Vue 就干掉了很多接口，减少了用户的学习成本。同样的，我们在做 JSBridge 分享接口相关的时候，也通过一个share接口封装了端提供的微信分享、支付宝分享、微博分享等接口。

3.先思考再动手，设计合理的代码组织方式。

我们在写代码之前，一定要先思考清楚，切忌上来就写代码，那样很容易写成一波流代码。合理的代码组织方式，有利于代码的扩展和维护，最基本的就是模块化。这里没有银弹，需要大量的实践和总结，学会抽象的看问题，看一些设计模式相关多书籍，多看优秀的开源的代码，可以先从模仿开始。

由于我们写的是通用服务，用户也可能会提出各种需求，当我们遇到这个问题的时候，不能上来就写代码去实现甚至hack，而是先思考这个需求是不是可以抽象成通用的需求，如果不能抽象，我们如何更优雅的实现，之前的设计是不是有问题。总之，要多想多思考，也可以和小伙伴讨论，争取做到是在设计代码而不是堆代码。

4.追求体验极致。

现在很多前端都在玩 node，玩构建工具，玩 mvvm 框架，玩 es6，好像感觉学会了这些就可以提高身价。其实，这些大部分都是工具、服务我们平时工作的，不要忘了我们的本行还是前端，还是需要写页面的。其实前端有些组件和效果如果想要追求体验极致的话，也不容易。如果能做到极致，身价也不会低。举个例子，我在写 mofang 移动端组件的时候，有个筛选器组件 picker，类似 IOS 原生 UIPickerView 的东东，我当时拿到需求的时候，也从 github 上搜索过，没有满意的，体验都很一般，于是我就对比 IOS 原生的 UIPickerView的体验，思考它的实现、一点点细节的调试，最终也撸出来体验几乎一致的移动端 h5 picker 组件。举这个例子其实想说明，我们在做通用服务的时候，要多花心思，如果能做出一些极致体验的东东，不仅对用户来说他们很乐意使用，对自己也是一种锻炼。

5.一定要写 wiki

要写 wiki！要写 wiki!要写 wiki！重要的事情说 3 遍。由于我们做通用服务，免不了和用户打交道，wiki 就尤为重要了。我们需要把通用服务的接口，使用方式，常见问题等都写清楚，。好的文档可以很好的指导用户如何使用我们的服务，这样可以大大的减少沟通成本，节约我们自身和用户的时间。

6.要学会销售。

有些人可能会觉得写通用服务似乎比做业务的同学更高大上，其实不然，本质上我们都是在为公司打工，都是在输出自己的价值，只是做事的重心不同。那么做公共的同学的价值在哪里，就是让自己写的通用服务被更多的人用，去提升他们的工作效率。所以，我们要学会销售自己的服务，而不是写完一个的服务摆出一副你爱用不用的态度。如果你写出来的东西没人用，就算它再牛逼，对公司的价值也是 0。另外，我们还要学会从业务中去沉淀服务，要去发现业务中的痛点，可以提升效率的地方，然后用技术的手段和工具去解决它。

7.一颗服务的心。

做公共的同学一定要有颗服务的心。我们售卖的是自己的服务，那么也一定要做好售后服务，除了 wiki，各种沟通钉钉微信沟通群也要积极响应，耐心的去帮助用户解决问题，其实很多时候，都是靠着用户去帮我们去发现 bug ，完善功能和优化体验的。

## 谈下我的个人成长
我入前端这行已经4年了，在学校的时候我是玩 .net 的，喜欢折腾。毕业后当然和大部分应届生一样，渴望进 BAT 这样的大公司，不过 BAT 几乎不招 .net 的岗位。由于我读研的时候做过一些网站方向的开发，所以就投了百度的一个相近的职位，web前端开发。这里我要特别感谢我百度的mentor张袁炜，他是一个对技术要求很高的人，受他的影响，我也成为一个对技术有追求的人。四年的工作经历，我写过页面，写过网页游戏、写过chrome插件、写过框架、写过组件、写过服务，由于一直在做不同的东西，每一年我都有所收获。

兴趣导向，有的时候我感觉写代码和玩游戏是一样爽的事情，我也很喜欢看优秀的开源作品，看看他们的代码设计、技术细节，会吸收一些不错的东西到自己平时的工作中。

前端这几年发展很快，新技术层出不穷，有的时候，我们要跳出自己的舒适圈，接纳一些新事物，新技术，去让自己不断学习，而不是满足于自己已掌握的那些技术。这里我不是去倡导滥用新技术，而是要保持一颗学习的心态，一颗包容的心态。
# 
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
 作者：[tank0317](https://github.com/tank0317)
> 
> 我们都很熟悉的，通过 `npm run script-name` 可以执行 package.json 中 `scripts` 对象配置的脚本。但是，你或许不知道下面这些知识。
> 
> > 下文中 _npm-scirpt_ 指 package.json `scripts` 中配置的脚本命令。_name-scirpt_ 指代某一个名字为 name 的脚本命令。
> 
> ### 生命周期脚本/自定义脚本
> 当我们使用命令 `npm start` 时，npm 会尝试执行 package.json `scripts` 中配置的 start 脚本命令。start-script 的默认配置为 `"start": "node server.js"`。所以如果项目根目录下有 server.js 文件，那么通过 `npm start` 会直接运行 server.js 中的代码。
> 
> 除了 start-script ，当使用 `npm start` 命令时，npm 同样会尝试在 package.json `scripts` 中查找是否配置了 prestart，poststart 脚本命令。如果都配置了，npm 会按照以下顺序执行脚本。
> 
> * npm run prestart
> * npm run start
> * npm run poststart
> 
> 类似的，`npm test`, `npm restart`, `npm stop` 都会按照以上的方式执行 scripts 中配置的对应脚本。同时 npm 会通过 **npm_lifecycle_event** 环境变量标识当前处于哪一阶段（所谓的生命周期）。比如，在 prestart-script 脚本执行阶段 npm_lifecycle_event 的值为 "prestart"，start-script 阶段，值为 "start"，即 package.json `scripts` 对象配置的脚本名字。
> 
> 以上是 npm 内置命令对应的脚本执行逻辑，对于我们平时最熟悉的**自定义脚本**，以上逻辑同样适用。比如我们配置了 `"build": "webpack --mode=production"`，同时配置了 **prebuild** 以及 **postbuild** 脚本，当使用 `npm run build` 时，同样会依次执行 prebuild-script、build-script、postbuild-script。
> 
> ### 任意脚本
> 我们配置的脚本命令，如 `"start": "node server.js"`，`node server.js` 会当做一行代码传递给系统的 SHELL 去解释执行。**实际使用的 SHELL 可能会根据系统平台而不同，类 UNIX 系统里，如 macOS 或 linux 中指代的是 /bin/sh， 在 windows 中使用的是 cmd.exe。**
> 
> 既然是交给 SHELL 去解释执行的，说明配置的脚本可以是任意能够在 SHELL 中运行的命令，而不仅仅是 node 脚本或者 js 程序。即如果你的系统里安装了 python（或者说系统变量 PATH 里能找到 python 命令），你也可以将 scripts 配置为 `"myscript": "python xxx.py"`
> 
> ### 环境变量
> 上面提到了在使用 `npm run script-name` 命令时，npm 会设置一个环境变量 npm_lifecycle_event。**实际上 npm 还会设置很多环境变量，通过内置命令 `npm run env` 可以查看 npm 为脚本运行时设置的所有环境变量。** 其中 package.json 中设置的所有字段，都会被设置为 **npm_package_** 开头的环境变量。如果你的 packge.json 设置如下
> 
> ```json
> {
>   "name": "npm-demo",
>   "version": "1.0.0",
>   "script": {
>     "build": "webpack --mode=production"
>   },
>   "files": ["src"]
> }
> ```
> 
> 则可以得到 npm_package_name、npm_package_version、npm_package_script_build、npm_package_files_0 等变量。注意上面 package.json 中对象和数组中每个字段都会有对应的环境变量。
> 
> 不止 package.json，npm 相关的所有配置也会有 **npm_config_** 开头的环境变量。
> 
> 另外，需要注意的是，即使在子目录下使用 npm run 命令，脚本也会在项目的根目录下运行。如果你想要区分在哪里使用的 npm run 命令，可以使用 INIT_CWD 环境变量，该变量保存了 npm run 命令运行时目录的绝对路径。
> 
> 如何使用这些环境变量？如果你的脚本是 shell 脚本，可以直接通过对应的环境变量名获取变量值，如果是 node 脚本，可以通过 nodejs 中的全局变量 `process.env` 获取，比如获取项目版本号可以使用 `process.env.npm_package_version`。
> 
> ### PATH
> 上面提到了 npm-script 执行前会设置一些环境变量，其中很重要的一个环境变量是 PATH。npm 会将项目 `node_modules/.bin` 的绝对路径添加到环境变量 PATH 中。因此我们可以在 npm-script 中使用项目本地安装的一些命令行工具。如上面设置的 build 脚本： `"build": "webpack --mode=production"`。
> 
> 只要我们本地安装了 webpack，就可以在项目的 `node_modules/.bin` 路径下看到 webpack 可执行文件。又因为 `node_modules/.bin` 路径已经添加到 PATH 中，所以脚本运行时能够在 PATH 中找到 webpack 命令，从而顺利执行。
> 
> 最后，为什么 webpack 安装后，能够在 `node_modules/.bin` 路径下找到对应的可执行文件？可以查看 https://docs.npmjs.com/files/package.json.html#bin
> 
> ### Reference
> https://docs.npmjs.com/cli/run-script.html
> 
> https://docs.npmjs.com/misc/scripts.html
> 
> https://docs.npmjs.com/files/package.json.html


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


