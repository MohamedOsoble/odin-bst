import Node from "./node.mjs";

export default class BinarySearchTree{
    constructor(inputArray){
        this.root = this.buildTree(inputArray);
    };

    buildTree(inputArray, sorted=false){

        // If array is not sorted, sort the array
        let treeArray = []
        if(!sorted){
            treeArray = this.sortArray(inputArray);
        }
        else{
            treeArray = inputArray;
        };

        return this.buildNodes(treeArray, 0, treeArray.length - 1);

    };

    buildNodes(inputArray, start, end){
        if(start > end){
            return null;
        };
        const mid = Math.floor((start + end) / 2);
        const node = new Node(inputArray[mid])

        // Build left nodes from beginning to middle of array, right nodes from middle to end
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
        // Base case of no child, insert here
        if(node === null){
            return new Node(value);
        }

        // If value already exist, don't insert, return node
        if(value === node.value){
            return node;
        }

        // Recursively traverse the tree until empty node
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

        // Base case, return node if value matches
        if(node.value === value){
            return node;
        }

        // Go right if value is greater than current node and right is not null
        if(value > node.value && node.right != null){
            return this.findNode(value, node.right)
        }

        // Go left is value is less than current node and left is not null
        else if(value < node.value && node.left != null){
            return this.findNode(value, node.left);
        };

        // Return null if not found
        return null;
    };

    // Helper function to keep going left until no leafs left
    findSuccessor(node){
        if(node.left === null){
            return node;
        };
        return this.findSuccessor(node.left);
    };

    levelOrder(callback){

        if(!callback){
            console.log("No callback function was passed")
            return;
        };

        // Init queue and add current node
        const queue = []
        let node = this.root;
        queue.push(node);

        while(queue.length !== 0){
            node = queue.shift();
            callback(node.value);

            // Add left side to the queue
            if(node.left != null){
                queue.push(node.left);
            }

            // Add right side to the queue
            if(node.right != null){
                queue.push(node.right);
            }
        };
    };

    // Node traversal methods
    inOrder(callback, node=this.root){
        if(node == null){
            return;
        }
        this.inOrder(callback, node.left);
        callback(node.value);
        this.inOrder(callback, node.right);
    };

    preOrder(callback, node=this.root){
        if(node === null){
            return;
        }
        callback(node.value);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    };

    postOrder(callback, node=this.root){
        if(node === null){
            return;
        }
        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node.value);
    };

    // Check depth from input value
    depth(value, node = this.root, i = 0){
        i++
        if(node.value === value){
            return i;
        }
        if(value > node.value && node.right != null){
            return this.depth(value, node.right, i)
        }
        else if(value < node.value && node.left != null){
            return this.depth(value, node.left, i);
        };
        return null;
    };

    height(node, height = 0){
        // Check if it has any children, if not, return current height;
        if(node.left == null && node.right == null){
            return height;
        }
        height ++
        let leftHeight = 0;
        let rightHeight = 0;
        // Check left tree for children recursively
        if(node.left != null){
            leftHeight = this.height(node.left, height);
        }
        // Check right tree for children recursively
        if(node.right != null){
            rightHeight = this.height(node.right, height);
        };
        return Math.max(leftHeight, rightHeight);

        // Compare right and left for longest path

        // Return longest path
    };

    isBalanced(root = this.root){

        // Base case if root is null
        if(root == null){
            return true;
        }

        // Compare left and right tree length
        let lh = this.height(root.left);
        let rh = this.height(root.right);

        // If difference is less than 1, return true
        if(lh - rh <= 1 && lh - rh >= -1){
            return true;
        };

        // Any other case would be unbalanced and return false
        return false;
    };

    // Helper function to return array with ordered items
    inOrderTraversal(node, nodes) {
        if (node === null) {
          return;
        }

        this.inOrderTraversal(node.left, nodes);
        nodes.push(node.value);
        this.inOrderTraversal(node.right, nodes);
      }

    rebalance(){
        // If tree is balanced, do nothing
        if(this.isBalanced()){
            return;
        }
        const treeArray = []
        this.inOrderTraversal(this.root, treeArray);
        this.root = this.buildTree(treeArray, true);
        return this.root;
    };

};
