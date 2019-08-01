function copy(obj) {
  if (Object.prototype.toString.call(obj) != "[object Object]" && Object.prototype.toString.call(obj) != "[object Array]") {
    console.log('需要一个对象或者数组');
    return;
  }
  var result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (object.hasOwnProperty(key)) {
      if (Object.prototype.toString.call(obj[key]) == "[object Object]" || Object.prototype.toString.call(obj[i]) == "[object Array]") {
        result[i] = deepCopy(obj[i])
      } else {
        result[key] = obj[key]
      }
    }
    return result;
  }
}
// var arr = [
//   [1, 2, 2],
//   [3, 4, 5, 5],
//   [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10
// ];
// [...new Set(arr.flat(Infinity))].sort((a, b) => a - b)
function newObj() {
  var obj = {};
  var fn = [].shift.call(arguments);
  obj.__proto__ = fn.prototype;
  var result = fn.apply(obj, arguments);
  return Object.prototype.toString.call(result) == "[object Object]" ? result : obj
}
const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']
var result = [];
for (let i = 0; i < arr1.length; i++) {
  console.log(i % 2);
  if (i % 2 == 0 && i != 0) {
    result.push(arr2.shift())
  }
  result.push(arr1[i])
  if (i == 7) {
    result.push(arr2.shift())
  }
}
console.log(result);
for (var i = 0; i < 10; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);
    }, 1000)
  })(i)
}
for (var i = 0; i < 10; i++) {
  setTimeout((function(j) {
    return () => {
      console.log(j);
    }
  })(i), 1000)
}
//flat(infinity)
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

function flatten(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (Array.isArray(element)) {
      //concat返回的是一个新数组,需要重新对result复制
      result = result.concat(flatten(element));
    } else {
      result.push(element)
    }
  }
  return result
}
console.log(flatten(arr));
// function flatten() {
//   return arr.reduce((init, next) => {
//     return init.concat(Array.isArray(next) ? flatten(next) : next)
//   }, [])
// }
//冒泡排序
var array = [3, 2, 1, 5, 6, 8, 0]
for (let i = 0; i < array.length - 1; i++) {
  for (let j = 0; j < array.length - i - 1; j++) {
    if (array[j] > array[j + 1]) {
      var temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp
    }
  }
}
console.log(array); //时间复杂度是O(n2)
//冒泡排序优化
//冒泡排序
var array = [3, 2, 1, 5, 6, 8, 0]
for (let i = 0; i < array.length - 1; i++) {
  var exchange = false;
  for (let j = 0; j < array.length - i - 1; j++) {
    if (array[j] > array[j + 1]) {
      var temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;
      if (!exchange) exchange = true
    }
  }
  //如果上一轮没有发生交换数据，证明已经是有序的了，结束排序
  if (!exchange) break;
}
console.log(array); //时间复杂度是O(n2)
//选择排序
function selection(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp
      }
    }
  }
  return array;
}
//函数柯里化
function currying(fn, length) {
  length = length || fn.length;
  return function() {
    var args = [...arguments];
    return args.length >= length ? fn.apply(this, args) : currying(fn.bind(this, ...args), length - args.length)
  }
}
var add = currying(function(a, b, c) {
  return a + b + c
});
add(1)(2)(3)
// 我们看一个常见的面试题， 用 JS 实现一个无限累加的函数 add， 示例如下：
// add(1); // 1
// add(1)(2); // 3
// add(1)(2)(3)； // 6
// add(1)(2)(3)(4)； // 10 
function add(a) {
  function sum(b) {
    a = a + b;
    return sum;
  }
  sum.toString = function(params) {
    return a
  }
  return sum
}

function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    }
  }
}
console.log(add(1)(2)(3)); // 6
console.log("----------------------------------------------------");
//实现promise.all
Promise.prototype.all = function(promiseAll) {
  return new Promise((resolve, reject) => {
    var count = 0;
    var result = [];
    for (let i = 0; i < promiseAll.length; i++) {
      const element = promiseAll[i];
      Promise.resolve(element).then((res) => {
        console.log("我是" + i);
        count++;
        result[i] = res
        if (count == promiseAll.length) {
          resolve(result)
        }
      }).catch((err) => {
        reject(err)
      })
    }
  })
}
Promise.all(['heysuhuo', '23', 234234])
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
function heyu() {
  var nums = [2, 7, 11, 15]
  var target = 9;
  var result = []
  for (let i = 0; i < nums.length; i++) {
    const el = target - nums[i];
    if (nums.indexOf(el) > -1) {
      result = [nums[i], nums[nums.indexOf(el)]]
    }
  }
  return result
}
console.log(heyu());
// 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。如：输入整型 1234，返回字符串“4321”。
// 要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。
function test(str) {
  if (str.length > 1) {
    var newStr = str.substring(str.length - 1);
    var olbStr = str.substring(0, str.length - 1);
    return newStr + test(olbStr)
  } else {
    return str
  }
}
console.log(test('12345'));
var arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
var arr2 = [{ id: 1 }, { id: 2 }, { id: 3 }]
var newArr = arr2.map((item) => item.id)
var result = arr1.filter((item, index) => {
  var { id } = item;
  return !newArr.includes(id)
})
console.log(result);
/**   
 *   实现一个通用的事件类,注册事件,触发事件,解绑事件
 */
