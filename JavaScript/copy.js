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