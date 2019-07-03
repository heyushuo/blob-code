/* eslint-disable */
// 题目：求斐波那契数列（兔子数列） 1,1,2,3,5,8,13,21,34,55,89...中的第 n 项
// fn(n) = fn(n-1)+f(n-2)
function fn(n) {
  if (n == 1 || n == 2) {
    return 1
  }
  return fn(n - 1) + fn(n - 2)
}
// n==5
// fn(4) + fn(3)
console.log(fn(5))
// -------------
// -------------
// -------------
// -------------
// -------------
// 二分查找
// 二分查找法主要是解决「 在一堆有序的数中找出指定的数」 这类问题， 不管这些数是一维数组还是多维数组， 只要有序， 就可以用二分查找来优化。
// 二分查找是一种「分治」思想的算法，大概流程如下：
// 1.  数组中排在中间的数字 A，与要找的数字比较大小
// 2.  因为数组是有序的，所以： a) A 较大则说明要查找的数字应该从前半部分查找 b) A 较小则说明应该从查找数字的后半部分查找
// 3.  这样不断查找缩小数量级（扔掉一半数据），直到找完数组为止
// ----------------------------------------------------------
// 题目：在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
// 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
function find(target, arr) {
  var i = 0
  var j = arr[i].length - 1
  while (i < arr.length && j >= 0) {
    //数组中的最后一个元素
    if (arr[i][j] < target) {
      i++ //进行下一轮比较
    } else if (arr[i][j] > target) {
      j-- //进行当前前轮比较
    } else {
      return true
    }
  }
  return false
}
//测试用例
console.log(find(50, [
  [1, 2, 3, 4],
  [5, 9, 10, 11],
  [13, 20, 21, 23]
]));

function search(arr, data) {
  var max = arr.length - 1, //最大值
    min = 0; //最小值
  while (min <= max) {
    var mid = Math.floor((max + min) / 2); //中间值
    if (arr[mid] < data) {
      min = mid + 1;
    } else if (arr[mid] > data) {
      max = mid - 1;
    } else {
      return mid;
    }
  }
  return -1; //没找到返回-1
}
console.log(search([2, 3, 4, 5], 2));