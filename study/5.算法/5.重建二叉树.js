/**    
 *   
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回
 * 
 */
/**     
 * 
本题主要考察了二叉树的遍历，先复习下
前序遍历（VLR）： 
    1.访问根节点 
    2.前序遍历左子树 
    3.前序遍历右子树 
中序遍历（LVR）： 
    1.中序遍历左子树 
    2.访问根节点 
    3.中序遍历右子树 
后序遍历（LRV）： (先把子节点遍历完)
    1.后序遍历左子树 
    2.后序遍历右子树 
    3.访问根节点
 * 
 */
// if (!preorder.length || !inorder.length) return null
//   let root = preorder[0]; // 前序遍历的第一个元素为根节点
//   let node = new TreeNode(root); // 确定根节点
//   let i = inorder.indexOf(root); // 获取根节点在中序遍历中的位置(用于分割左右子树)
//   // 递归
//   node.left = buildTree(preorder.slice(1, i + 1), inorder.slice(0, i));
//   node.right = buildTree(preorder.slice(i + 1), inorder.slice(i + 1));
//   return node
var buildTree = function(preorder, inorder) {
  if (!preorder.length || !inorder.length) return null;
  var root = preorder[0]; //找到根节点
  var node = new TreeNode(root);
  //从中序遍历的数组中找到左右节点分割位置
  var index = inorder.indexOf(root);
  //拿到左节点的中序数组和前序数组,然后进行递归
  node.left = buildTree(preorder.slice(1,index+1),inorder.slice(0,index))
  node.right = buildTree(preorder.slice(index+1),inorder.slice(index+1))
  return node;
};