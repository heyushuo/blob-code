// new 的实现
function create(con) {
  let obj = {};
  // obj.__proto__ = con.prototype;
  Object.setPrototypeOf(obj, con.prototype);
  let args = [].slice.call(arguments, 1);
  // 绑定this
  let res = con.apply(obj, args);
  return typeof res == 'object' ? res : boj;
}

// 节流
// 立即执行
function throttle(fn, wait) {
  let resultTime = 0;
  return function () {
    let nowTime = +new Date();
    if (nowTime - resultTime > wait) {
      fn.apply(this, arguments);
      resultTime = nowTime;
    }
  };
}
// wait秒后执行

function throttle(fn, wati, immediate) {
  if (immediate) {
    let timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, arguments);
          timer = null;
        }, wati);
      }
    };
  } else {
    let resultTime = 0;
    return function () {
      let nowTime = +new Date();
      if (nowTime - resultTime > wait) {
        fn.apply(this, arguments);
        resultTime = nowTime;
      }
    };
  }
}

// 防抖
// wait秒后执行
function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, wait);
  };
}
// throttle
// 想要立即执行
function debounce(fn, wait, immediate) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    // timer存在并且是立即执行
    if (immediate && !timer) {
      fn.apply(this, arguments);
    }
    timer = setTimeout(() => {
      if (!immediate) {
        fn.apply(this, arguments);
      }
      timer = null;
    }, wait);
  };
}
// 函数柯里是把使用多个参数的函数,转换成一系列单一参数的函数
function add(a, b, c) {
  return a + b + c;
}

function curry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
curry(1)(2)(3);
// 递归实现函数柯里化

function curry(fn, length) {
  let length = length || fn.length;
  return function () {
    // 类数组转换成数组,Array.prototype.slice.call(arguments)
    let args = [...arguments];
    if (args.length > length) {
      return fn.apply(this, args);
    } else {
      return curry(fn.bind(this, ...args), fn.length - length);
    }
  };
}

// getBoundingClientRect()
// document.documentElement.scrollTop
// document.documentElement.clientHeight
// document.documentElement.scrollHeight

function creat(con) {
  var obj = {};
  obj.__proto__ = con.prototype;
  var args = Object.prototype.slice.call(arguments, 1);
  var res = con.apply(obj, args);
  return Object.prototype.toString(res) == '[Object object]' ? res : obj;
}

// 寄生组合式继承(构造函数继承+原型式继承)
function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

class Parent {
  // constructor相当于es5的构造函数
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.sayName);
  }
}

class child extends Parent {
  constructor(age) {
    this.age = age;
  }
  sayAge() {
    console.log(this.age);
  }
}
// 1.类中所有的另一的方法都在原型上
// 2.类内部定义的方法是不可枚举的
// 3,constructor相当于es5的构造函数,new 的时候会自动调用构造函数
// 4.class只能new的形式使用不能直接调用
// 5.static 静态方法,相当于自身上班的方法,不会被实例继承,直接通过类来调用,不能用实例调用
// 静态方法中的this指向的是类不是实例(不会被实例继承,但是可以被子类继承)
// 6.通过extends来实现继承
// 7.必须调用super()来产生子类的this,否则子类会报错,只有调用super后才能使用this

/**
 *
 *
 * 1.标记清除(最常用的一种方式)
 * 讲不再使用的对象标记为无法到达的对象,定时从根部定时扫描内存中的对象,
 * 凡是可以从根部到达的对象,保留,无法到达的,标记为不再使用,然后进行回收
 *
 */

// 隐式绑定 函数调用的时候有上下文对象,this指向这个函数调用的上下文对象
// 隐式丢失,函数传递,函数独立调用,
// new绑定,new 的时候形成的新对象会绑定到调用的this上
// 被忽略的this箭头函数,箭头函数的this根据外层作用域来决定的
// apply可以传数组和类数组
// call参数需要一个一个的传
Function.prototype.myCall = function (context) {
  // context如果不传会是默认绑定到window
  context = context || window;
  // 使用隐式绑定改变函数this指向
  context.fn = this;
  // 获取参数,第一个以后的参数
  const args = [...arguments].slice(1);
  // 执行函数
  const result = context.fn(...args);
  // 删除添加的属性
  delete context.fn;
  return result;
};
//多次调用call,最后的记过是 call.call(fn2,2)
// 执行call函数的时候call函数中的this是 fn2
// fn2.fn = call,其实就是实际上是 fn2.call(2)
// fn2.fn = call====>fn2.call
Function.prototype.apply = function (context) {
  context = context || window;
  context.fn = this;
  var args = [...arguments][1];
  var result;
  if (args) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
//
var arr1 = [1, 2, 3];
var arr2 = [2, 3, 4];
Array.prototype.push.apply(arr1, arr2);
arr1.concat(arr2);
Math.max.apply(Math, arr1);
Array.prototype.slice.call(arr1);
arr1.shift;
// [].shift.call(arr1)

Function.prototype.myBind = function (contxt) {
  const _this = this;
  const args = [...arguments].slice(1);
  return function () {
    const bindArgs = [...arguments];
    _this.apply(contxt, args.concat(bindArgs));
  };
};

// A.__proto__ ===== B.prototype

A instanceof B; //A 是否是 B的实例或者B是否存在A的原型链上原型链
function instace(A, B) {
  A = A.__proto__;
  B = B.prototype;
  while (true) {
    if (A == null) return false;
    if (A == B) {
      return true;
    }
    A = A.__proto__;
  }
}
// instanceof 无法区分普通对象{}

// Array.isArray 可以判断数组
// [[class]] [object Boolean]
// 强制类型转换
parseInt;
parseFloat;
Number;
String;
toString;
Boolean;
arr1.map((item, index, arr) => {
  return item * 2;
}, arr);
Array.prototype.myMap = function (fn, context) {
  const arr = this;
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    res.push(fn.call(context, item, i, arr));
  }
  return res;
};
arr1.filter((item, index, arr) => {
  return item.name;
}, arr);

Array.prototype.myFilter = function (fn, context) {
  const arr = this;
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    fn.call(context, item, i, arr) && res.push(item);
  }
  return res;
};

arr.reduce((init, next) => {
  return init + next;
}, initial);

Array.prototype.myReduce = function (fn, init, context) {
  const arr = this;
  let index = 0;
  let res = '';
  if (!init) {
    res = arr[0];
    index = 1;
  } else {
    res = init;
    index = 0;
  }
  for (let i = index; i < arr.length; i++) {
    const element = arr[i];
    res = fn.call(context, res, element);
  }
  return res;
};

let heyushuoArr = [1, 2, 3];
var num = heyushuoArr.myReduce((init, next) => {
  return init + next;
});
console.log(num);
arr.slice(0, 3);
Array.prototype.mySlice = function (start, end) {
  const arr = this;
  let res = [];
  // 如果是string变成number;
  // Number(start);
  // Number(end);
  if (start == undefined) start = 0;
  if (end == undefined) end = arr.length;
  start = start > 0 ? start : start + arr.length;
  end = end > 0 ? end : end + arr.length;

  if (start >= end) return [];
  while (start < end) {
    res.push(arr[start]);
    start++;
  }
  return res;
};
arr.splice(index, deleteNum, addItem);
arr.mysplice = function (index, deleteNum, ...addList) {
  const arr = this;
  //先判断star的值
  if (index < 0) {
    if (Math.abs(index) > this.lenght) {
      index = 0;
    } else {
      index = this.length + index;
    }
  }

  const deletArr = arr.slice(index, deleteNum); //删除的数组
  const rightArr = arr.slice(index + deleteNum); //删除后的右半部分数据
  addList.concat(rightArr).forEach(item => {
    arr[index] = item;
    index++;
  });
  this.length = index;
  return deletArr;
};