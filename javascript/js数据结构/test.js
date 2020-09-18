class treeNode{
	constructor(val){
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

// 二叉树
/*

				2
	7					5
2		6					9
	5		11			4
 */
let root = new treeNode(2);

// 左子树
root.left = new treeNode(7);
root.left.left = new treeNode(2);
root.left.right = new treeNode(6);
root.left.right.left = new treeNode(5);
root.left.right.right = new treeNode(11);

// 右子树
root.right = new treeNode(5);
root.right.right = new treeNode(9);
root.right.right.left = new treeNode(4);

// 前序遍历
function preOrder(root){
	if(root != null){
		console.log(root.val);
		preOrder(root.left);
		preOrder(root.right);
	}
}

// 前序遍历结果：2 7 2 6 5 11 4 9 4
// preOrder(root);
// 

function inOrder(root){
    if(root!=null){
        inOrder(root.left);
        console.log(root.val);
        inOrder(root.right);
    }
}
// inOrder(root);
// 

function postOrder(root){
    if(root != null){
        postOrder(root.left);
        postOrder(root.right);
        console.log(root.val);
    }
}
// postOrder(root);
// 


let preorder = 'ABCDEFG';
let inorder = 'CDBAEGF';
function buildTree(preorder,inorder){
    if(preorder.length==0){
        return null;
    }
    if(preorder.length==1){
        let root = new treeNode(preorder[0]);
        return root;
    }
    let root = new treeNode(preorder[0]);
    let index = inorder.indexOf(root.val);
    root.left = buildTree(preorder.slice(1,index+1),inorder.slice(0,index));
    root.right = buildTree(preorder.slice(index+1,preorder.length),inorder.slice(index+1,inorder.length));
    return root;
}
// var root1 = buildTree(preorder,inorder);
// console.log();
// postOrder(root1);

let root1 = new treeNode(8);

// 左子树
root1.left = new treeNode(3);
root1.left.left = new treeNode(1);
root1.left.right = new treeNode(6);
root1.left.right.left = new treeNode(4);
root1.left.right.right = new treeNode(7);

// 右子树
root1.right = new treeNode(10);
root1.right.right = new treeNode(14);
root1.right.right.left = new treeNode(13);

var flag = false;
/*
    传入一个flag标记：因为一个二叉搜索树，需要嵌套执行很多次，最终只会返回第一次执行binarySearchTree的return,
    所以如果最内层的嵌套返回的是true,而最终只能返回false
*/
function binarySearchTree(root,target){
    if(root != null){
        if(root.val == target){
            console.log(11111);
            flag = true;
            return flag;
        }else if(root.val > target){
            console.log(22222)
            binarySearchTree(root.left,target);
        }else{
            console.log(33333);
            binarySearchTree(root.right,target);
        }
    }
    console.log(4444);
    return flag; 
}
// console.log(binarySearchTree(root1,13));

var s1 = {name:'baba'};
var s2 = s1;
// var s2 = {name:'baba'};
console.log(s1 === s2);