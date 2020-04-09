/**    
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 */
//方法一
var numWays = function(n) {
  var arr = [1, 1]
  for (var i = 3; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % (1e9 + 7)
  }
  return arr[n]
};
// 方法二
var numWays = function(n) {
  if (n == 0 || n == 1) return 1;
  var first = 1;
  var next = 1;
  var result = '';
  for (var i = 2; i <= n; i++) {
    result = (first + next) % (1e9 + 7);
    first = next;
    next = result;
  }
  return result
};