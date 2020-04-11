* 给一个5*5数组，是由0和1随机组成，找出行、列或者对角中相连的三个相同元素
* 给一个二叉树，给定一个数值n，是否有一条路径之和等于n
* 编码题--幼儿园分饼干
* 反转链表
* 以k个为一组进行反转链表（在面试官的提示下完成，可继续优化）
* 实现函数（深度优先遍历）
```javascript
const chapterTree = {
  name: '总章节',
  children: [
    { name: '章节一', children: [{ name: '第一节', children: [{ name: '第一小节' }, { name: '第二小节' }] }, { name: '第二节' }] },
    { name: '章节二', children: [{ name: '第三节' }, { name: '第四节' }] }]
};
function serialize(tree) {
  // TODO
}
// 测试
const result = serialize(chapterTree);
console.log(result);
// ["总章节", "章节一", "第一节", "第一小节", "第二小节", "第二节", "章节二", "第三节", "第四节"]

function serialize(tree) {
    let arr = [];
    arr.push(tree.name);
    if (tree.children == null) return arr;
    for (let item of tree.children) {
        arr = arr.concat(serialize(item));
    }
    return arr;
}
```
改进上面的程序，输出章节号同时输出对应的序号
```javascript
// ["总章节", "(1)章节一", "(1.1)第一节", "(1.1.1)第一小节", "(1.1.2)第二小节", "(1.2)第二节", "(2)章节二", "(2.1)第三节", "(2.2)第四节"]

function serialize(tree, locate = []) {
    let arr = [];
    let before = locate.length ? `(${locate.join('.')})` : "";
    arr.push(before+tree.name);
    if (tree.children == null) return arr;
    tree.children.forEach((item, index) => {
        let copyLocal = locate.slice();
        copyLocal.push(index + 1);
        arr.push(...serialize(item, copyLocal));
    });
    return arr;
}
```
11.实现字符串模板，写代码, 输入
```javascript 
// 'I am ${name}, ${age} years old', {name: 'xiaoming', age: 2}
function parseString(str, obj) {
  Object.keys(obj).forEach(key => {
    str = str.replace(new RegExp(`{{${key}}}`,'g'), obj[key]);
  });
  return str;
}
```
* 判断链表中是否有环
* 快速排序思路和算法思想时间复杂度等等..
* 请用算法实现，从给定的无序、不重复的数组data中，取出n个数，使其相加和为sum。并给出算法的时间/空间复杂度 。(不需要找到所有的解，找到一个解即可)模式匹配，
* 1234567890 ->1,234,567,890（不是简单的JS函数，是使用正则做的，这边踩坑了）
 * 算法 找数组里总和大于等于目标值的连续数字合和
* 算法 找二叉树从根节点到叶节点所有路径的总连续和
