import BinarySearchTree from "./tree.mjs";

// Test function to visualize tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const arr1 = Array.from({length: 40}, () => Math.floor(Math.random() * 40));
arr1.push(12);
const testTree = new BinarySearchTree(arr1);
// //console.log(testTree.root);
// // testTree.insert(41);
// testTree.insert(122)
// testTree.insert(132)
// testTree.insert(124)
// testTree.insert(101)
// testTree.insert(75);
// testTree.insert(337)
// testTree.insert(72)
// testTree.insert(75)
// testTree.insert(175)
// testTree.insert(375)
// testTree.insert(721)
// // console.log(testTree.delete(12));

// console.log(prettyPrint(testTree.root));
// // console.log(testTree.inOrder(console.log));
// // console.log(testTree.preOrder(console.log));
// // console.log(testTree.postOrder(console.log));
// // console.log(testTree.height(testTree.root))
// console.log(testTree.isBalanced());
// console.log(testTree.rebalance());
// console.log(prettyPrint(testTree.root));
// console.log(testTree.isBalanced());
