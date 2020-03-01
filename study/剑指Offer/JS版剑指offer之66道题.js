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
]

function Find(arr, target) {
  //二维数组有几行几列
  const n = arr.length; //行
  const m = arr[0].length; //列
  //如果二维数组是空的那直接返回false
  if (n == 0 || m == 0) {
    return false
  }
  let row = n - 1;
  let col = 0; //因为从左下角开始找,是第一列
  while (row >= 0 && col <= m - 1) {
    if (target > arr[row][col]) {
      col++;
    } else if (target < arr[row][col]) {
      row--
    } else {
      return true
    }
  }
  return false
}
console.log(Find(arr, 5)) //true
console.log(Find(arr, 7)) //false
/**
 *请实现一个函数，将一个字符串中的空格替换成“%20”。
 *例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。
 * @param {*} str
 */
function replaceSpace(str) {
  return str.replace(/\s/g, "%20")
}
console.log(replaceSpace("We Are Happy")) //We%20Are%20Happy
/**
 *输入一个链表，从尾到头打印链表每个节点的值。
 *
 * @param {*} ListNode
 */
function printListFromTailToHead(ListNode) {
  var head = ListNode.head; //每个链表就一个head:{data:value,next:null}
  var result = [];
  while (next !== null) {
    result.unshift(head.data) //从尾到头 
    head = head.next;
  }
  for (let i = 0; i < arr.length; i++) {
    console.log(result[i])
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
    this.stack1.push(item)
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
        this.stack2.push(this.stack1.pop())
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
      min = arr[i]
    } else {
      return min
    }
  }
  return min
}
//二分查找,从中间开始找

function minNumberGood(arr){
  var left = 0;
  var right = arr.length-1;

  while(){
    var mid = arr[]
  }

}