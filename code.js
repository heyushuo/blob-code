// new 的实现
function create(con) {
  let obj = {};
  // obj.__proto__ = con.prototype;
  Object.setPrototypeOf(obj, con.prototype);
  let args = [].slice.call(arguments, 1);
  // 绑定this
  let res = con.apply(obj, args);
  return typeof res == "object" ? res : boj;
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

