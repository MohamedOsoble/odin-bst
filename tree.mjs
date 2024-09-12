import Node from "./node.mjs";

export default class BinarySearchTree{
    constructor(inputArray){
        this.root = this.buildTree(inputArray);
    };

    buildTree(inputArray){

        // Sort the array in order
        const sortedArray = this.sortArray(inputArray);
        return this.buildNodes(sortedArray, 0, sortedArray.length - 1);

    };

    buildNodes(inputArray, start, end){
        if(start > end){
            return null;
        };
        const mid = Math.floor((start + end) / 2);
        const node = new Node(inputArray[mid])
        node.left = this.buildNodes(inputArray, start, mid - 1);
        node.right = this.buildNodes(inputArray, mid + 1, end);
        return node;
    };

    // Helper function to sort array in sortArray
    compareNumbers(a, b) {
        return a - b;
    };

    sortArray(array){
        return [... new Set(array.sort(this.compareNumbers))];
    };

    insert(value, node = this.root){
        if(node === null){
            return new Node(value);
        }
        if(value === node.value){
            return node;
        }
        if(value < node.value){
            node.left = this.insert(value, node.left);
        }
        else if(value > node.value){
            node.right = this.insert(value, node.right);
        }
        return node;
    };

    delete(value, node = this.root){
        // find the node
        let foundNode = this.findNode(value, node);
        if(!foundNode){
            return "Value not found in tree"
        };
        // check node has no children, if so, set the value to null
        if(foundNode.left === null && foundNode.right === null){
            foundNode.value = null
            return foundNode;
        }
        // If the node has one child, child replaces node.
        if(foundNode.left === null && foundNode.right != null){
            foundNode = foundNode.right;
            return foundNode;
        }
        else if(foundNode.right === null && foundNode.left != null){
            foundNode = foundNode.left
            return foundNode;
        }
        else{
        // if the node has two children, send right node to find successor function
            let successor = this.findSuccessor(foundNode.right);
            foundNode.value = successor.value;
            successor.value = null;
            return foundNode;
        };

    };

    findNode(value, node = this.root){
        if(node.value === value){
            return node;
        }
        if(value > node.value && node.right != null){
            return this.findNode(value, node.right)
        }
        else if(value < node.value && node.left != null){
            return this.findNode(value, node.left);
        };
        return null;
    };

    findSuccessor(node){
        if(node.left === null){
            return node;
        };
        return this.findSuccessor(node.left);
    };
};
