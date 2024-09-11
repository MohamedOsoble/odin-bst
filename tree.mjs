import Node from "./node.mjs";

export default class BinarySearchTree{
    constructor(inputArray){
        this.root = this.buildTree(inputArray);
        // this.prettyPrint(this.root);
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
};
