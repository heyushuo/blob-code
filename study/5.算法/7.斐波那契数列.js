/**    
 * 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：
 * 
 * F(0) = 0,   F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 * 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 */
// 方法一
var fib = function(n) {
  var arr = [0, 1];
  if (n == 0 || n == 1) return n;
  for (var i = 2; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % (1e9 + 7)
  }
  return arr[n]
};
//方法二
var fib = function(n) {
  if (n == 0 || n == 1) return n;
  var first = 0;
  var next = 1;
  var result = '';
  for (var i = 2; i <= n; i++) {
    result = (first + next) % (1e9 + 7);
    first = next;
    next = result;
  }
  return result;
};