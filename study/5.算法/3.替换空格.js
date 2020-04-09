/**    
 * 请实现一个函数，把字符串 s 中的每个空格替换成"%20"。
 */
//方法一
var replaceSpace = function(s) {
  return s.replace(/\s/g, '%20')
};

// 方法二
var replace = function(s){
  return s.split(' ').join('%20')
}
console.log(replace('We are happy.'));
