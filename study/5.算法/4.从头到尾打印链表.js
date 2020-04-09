/**    
 * 
 * 输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。
 * 
 */
// 思路使用队列先入栈,在出栈
var reversePrint = function(head) {
  var stack = [];
  var result = [];
  while (head) {
    stack.push(head.val);
    head = head.next;
  }
  while (stack.length) {
    result.push(stack.pop())
  }
  return result;
};
// 方法二
var reversePrint = function(head) {
  var stack = [];
  while (head) {
    stack.push(head.val);
    head = head.next;
  }
  //使用数组的api
  return stack.reverse();
};