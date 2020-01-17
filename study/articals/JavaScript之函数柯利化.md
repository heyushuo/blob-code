## 什么是函数柯里化

函数柯里化是一种将使用多个参数的函数转换成一系列使一个参数的函数
使用如下例子介绍一下函数柯里化

```javascript
function add(a, b, c) {
  return a + b + c;
}
// 正常函数
add(1, 2, 3); //6

//函数柯里化后
function curry(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curry(1)(2)(3); // 6
```

但是如果参数多了呢?不可能一直在内部 return,接下来咱们来实现一个可以使其他函数柯里化的函数

## 函数柯里化的实现

**需要实现的点**

1. 可以支持无数个参数
2. 在调用的时候希望可以一次传一个或者多个都兼容的 (`add(1,2,3) add(1,2)(3) add(1)(2)(3) add(1)(1,2)...`)

```javascript
function currying(fn, length) {
  //第一次调用获取函数 fn 参数的长度
  var length = length || fn.length;
  return function() {
    var args = Arrary.prototype.slice.call(arguments); //把类数组转换为数组,方便后边调用函数的时候传参数
    if (args.length >= length) {
      //说明参数调用完了,该执行函数了,
      return fn.apply(this, args);
    } else {
      //这个时候fn不能执行,所以使用bind返回一个新的函数并把这次的参数传进去,剩余参数的长度现在变为length-args.length
      return currying(fn.bind(this, ...args), length - args.length);
    }
  };
}
```

这里难理解的地方是 `return currying(fn.bind(this, ...args), length - args.length);`
这里如果大家了解`bind`是如何实现的这边就好理解了,如下是 bind 如何实现的代码

```javascript
Function.prototype.mybind = function(context) {
  var fn = this; //获取绑定的函数
  var args = Arrary.prototype.slice.call(arguments, 1); //把第一个参数后的参数取出来,并变成数组
  return function() {
    var bingargs = Arrary.prtotype.slice.call(arguments); //获取执行函数时传的参数
    // 执行函数
    return fn.apply(context, args.concat(bingargs));
  };
};
```

这里在理解一下`return currying(fn.bind(this, ...args), length - args.length);`这段代码其实这个时候我们是不需要执行 fn 函数的,但是又需要把此时的参数传递进去,所以这里使用 bind 函数正常又返回一个函数同时也把参数传递进去了至此,咱们就把**柯里化函数 currying 实现了**

```javascript
add(1, 2, 3); //6

var curry = currying(add);
curry(1, 2, 3); // 6
curry(1, 2)(3); // 6
curry(1)(2)(3); // 6
curry(1)(2, 3); // 6
```

## 函数柯里化的用途

1. 可以使用柯里化把一些需要判断的东西（差异化的东西）提前做，最后返回一个纯净的函数。达到解耦的目的。

```javascript
// 这里在Vue源码中就有体现,Vue在渲染的时候有两个平台一个是weex一个是web
// 其中有这样一段代码,这里就使用了柯里化的技巧,createPatchFunction是一个方法,他返回了一个纯净的函数,传的参数其实是对不同平台DOM的操作
//这个createPatchFunction函数可以在web平台和weex两个平台去调用但是需要传不同平台需要的操作
export const patch: Function = createPatchFunction({ nodeOps, modules });
```

2. 可以达到延迟计算的目的

```javascript
add(1, 2, 3); //6
var curry = currying(add);

var next = curry(1); //未真正求值
var next1 = next(2); //未真正求值
next1(3); //求值了
```

3. 参数复用的效果,提高了适用性.

用一个具体代码展示一下参数复用

```javascript
// 没有柯里化之前会这样调用
function eat(name, goods) {
  console.log(name + "想吃" + goods);
}
eat("heyushuo", "鸭子");
eat("heyushuo", "橘子");
eat("heyushuo", "香蕉");
//函数柯里化后
var curryEat = currying(eat);
var eatGoods = curryEat("heyushuo");
eatGoods("鸭子");
eatGoods("橘子");
eatGoods("香蕉");
```
