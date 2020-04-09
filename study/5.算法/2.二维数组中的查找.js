/**     
 * 
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 * 
 */
var arr = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
var findNumberIn2DArray = function(matrix, target) {
  //需要加上这段话不然Leetcode执行不通过
  if (matrix.length == 0) return false;
  var row = matrix.length - 1; //行的长度
  var col = matrix[0].length - 1; //列的长度
  var first = 0;
  while (row >= 0 && first <= col) {
    //左下角的值
    var mid = matrix[row][first];
    if (target > mid) {
      //如果大于mid,列增加1
      first++
    } else if (target < mid) {
      //如果小于mid.行减1
      row--
    } else {
      return true
    }
  }
  return false;
}
console.log(findNumberIn2DArray(arr, 5));
console.log(findNumberIn2DArray(arr, 20));
// 其他思路
// 把二维数组变成一维数组然后使用indexof