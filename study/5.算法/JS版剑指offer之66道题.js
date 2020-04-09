/**
 *在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 *
 * 思路:二分查找,为了方便从左下角开始查找,如果小于往上找,如果大于往右找
 * @param {*} arr
 * @param {*} target
 */
var arr = [
  [1, 2, 3],
  [2, 3, 4],
  [3, 4, 5]
];

function Find(arr, target) {
  //二维数组有几行几列
  const n = arr.length; //行
  const m = arr[0].length; //列
  //如果二维数组是空的那直接返回false
  if (n == 0 || m == 0) {
    return false;
  }
  let row = n - 1;
  let col = 0; //因为从左下角开始找,是第一列
  while (row >= 0 && col <= m - 1) {
    if (target > arr[row][col]) {
      col++;
    } else if (target < arr[row][col]) {
      row--;
    } else {
      return true;
    }
  }
  return false;
}
console.log(Find(arr, 5)); //true
console.log(Find(arr, 7)); //false
/**
 *请实现一个函数，将一个字符串中的空格替换成“%20”。
 *例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 * @param {*} str
 */
function replaceSpace(str) {
  return str.replace(/\s/g, "%20");
}
console.log(replaceSpace("We Are Happy")); //We%20Are%20Happy
/**
 *输入一个链表，从尾到头打印链表每个节点的值。
 *
 * @param {*} ListNode
 */
function printListFromTailToHead(ListNode) {
  var head = ListNode.head; //每个链表就一个head:{data:value,next:null}
  var result = [];
  while (next !== null) {
    result.unshift(head.data); //从尾到头
    head = head.next;
  }
  for (let i = 0; i < arr.length; i++) {
    console.log(result[i]);
  }
}

/**
 *用两个栈来实现一个队列，完成队列的Push和Pop操作。
 *
 * 当执行队列的push的时候,直接调用一个栈的push即可插入
 * 当执行队列的pop的时候,这个时候需要注意,先进先出,这个时候调用栈的pop方法把他们插入到第二个队列中,然后在调用栈的pop
 *
 */
class quen {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  push(item) {
    this.stack1.push(item);
  }
  //弹出一个,同时需要保持stack1和stack2是相同的
  pop() {
    if (!this.stack1.length && !this.stack2.length) {
      //此时两个栈都是空的了
      return "";
    }
    //如果stack2为空的时候,需要去stack1中把数据填充到stack2中
    if (!this.stack2.length) {
      while (this.stack1.length != 0) {
        this.stack2.push(this.stack1.pop());
      }
    } 
  }
}

/**
 *
 *把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。
 * NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 *
 */
//暴力解法
function minNumber(arr) {
  var min = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i];
    } else {
      return min;
    }
  }
  return min;
}
//二分查找,从中间开始找,不断的缩短距离

function minNumberGood(arr) {
  var left = 0;
  var right = arr.length - 1;

  while (right - left > 0) {
    var mid = Math.floor((left + right) / 2);
    //中间的值大于最右边,说明最小的在右边,移动left
    if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else if (arr[mid] < arr[right]) {
      //中间的值小于最右边,说明最小的在左边,移动right
      right = mid;
    } else {
      //如果两个值相等,right-1,来缩短范围
      right--;
    }
  }
  return arr[left] > arr[right] ? arr[left] : arr[right];
}

console.log(minNumberGood([1, 1, 1, 0, 1]));
console.log(minNumberGood([1, 1, 0, 1, 1, 1, 1]));

/**
 *大家都知道斐波那契数列，现在要求输入一个整数n，请你输出斐波那契数列的第n项。n<=39
 * @param {*} n
 */
function Fib(n) {
  var arr = [];
  if (n == 1 || n == 2) {
    return 1;
  } else {
    arr[1] = 1;
    arr[2] = 1;
    for (let i = 3; i <= n; i++) {
      arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr[n];
  }
}
console.log(Fib(5)); //5

// 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
// 这个问题也是斐波那契数列问题..动态规划实现
function jump(number) {
  var arr = [];
  if (number == 1) return 1;
  if (number == 2) return 2;
  arr[1] = 1;
  arr[2] = 2;
  for (let i = 3; i <= number; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[number];
}

console.log(jump(4)); // 5
/**
 *一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法。
 *a[n]=a[n-1]+a[n-2]+......+a[1];..........................①
 *a[n-1]=        a[n-2]+......+a[1];..........................②
 * a(n)=2a(n-1)
 * 这个问题也是斐波那契数列问题..动态规划实现
 * @param {*} number
 * @returns
 */
function jumpNew(number) {
  var arr = [];
  if (number == 1) return 1;
  if (number == 2) return 2;
  arr[1] = 1;
  arr[2] = 2;
  for (let i = 3; i <= number; i++) {
    arr[i] = 2 * arr[i - 1];
  }
  return arr[number];
}

console.log(jumpNew(4)); // 8

// /我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
//这个问题也是斐波那契数列问题..动态规划实现
// 2*1的大矩形 可以有1中方法
// 2*2的大矩形 可以用2中方法
// 2*3的大矩形 可以用3中方法
// 2*4的大矩形 可以用5中方法
function rectCover(number) {
  var arr = [];
  if (number == 1) return 1;
  if (number == 2) return 2;
  arr[1] = 1;
  arr[2] = 2;
  for (let i = 3; i <= number; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[number];
}
console.log(rectCover(4)); //5
