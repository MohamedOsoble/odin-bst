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
const testTree = new BinarySearchTree(arr1);
console.log(testTree.root);
testTree.insert(41);
testTree.insert(7);

console.log(prettyPrint(testTree.root));
