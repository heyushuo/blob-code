/**    
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。 输入一个非递减排序的数组的一个旋转，
 * 输出旋转数组的最小元素。 例如数组{3,4,5,1,2}为{1,2,3,4,5}的一个旋转，该数组的最小值为1。 
 * NOTE：给出的所有元素都大于0，若数组大小为0，请返回0。
 */
var minArray = function(numbers) {
  var len = numbers.length;
  if (len == 0) return 0;
  var left = 0;
  var right = len - 1;
  while (left < right) {
    var mid = Math.floor((left + right) / 2);
    if (numbers[mid] > numbers[right]) {
      // [3, 4, 5, 1, 2]，mid 以及 mid 的左边一定不是最小数字
      left = mid + 1;
    } else if (numbers[mid] == numbers[right]) {
      // 只能把right排除掉,下一轮搜索区间right-1 
      right = right - 1
    } else {
      // 如果此时小于说明mid右边的一定不是最小的,mid可能是
      right = mid;
    }
  }
  return numbers[left]
};
minArray([3, 4, 5, 0, 1, 2])
// 方法二
var minArray = function(numbers) {
  return Math.min(...numbers)
};
// 方法三
// 时间复杂度o(n2) for循环
var minArray = function(numbers) {
  var min = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (min > numbers[i]) {
      min = numbers[i]
    }
  }
  return min;
};