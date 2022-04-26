const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.r = null;
  }

  root() {
    return this.r;
  }

  add(data) {
    if (this.r === null) {
      this.r = new Node(data);
      return;
    }
    function insert(node, data) {
      if (data < node.data) {
        if (node.left === null) {
          node.left = new Node(data);
        } else {
          insert(node.left, data);
        }
      } else {
        if (node.right === null) {
          node.right = new Node(data);
        } else {
          insert(node.right, data);
        }
      }
    }
    insert(this.r, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    function search(node, data) {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        return node;
      }
      if (data > node.data) {
        return search(node.right, data);
      } else {
        return search(node.left, data);
      }
    }
    return search(this.r, data);
  }

  remove(data) {
    function del(node, data) {
      if (node === null) {
        return;
      }
      if (data < node.data) {
        node.left = del(node.left, data);
        return node;
      }
      if (data > node.data) {
        node.right = del(node.right, data);
        return node;
      }
      if (node.right === null && node.left === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      const t = getNewData(node.right);
      node.data = t.data;
      del(node.right, t.data);
      return node;
    }

    function getNewData(n) {
      while (n.left !== null) {
        n = n.left;
      }
      return n;
    }

    this.r = del(this.r, data);
  }

  min() {
    if (this.r === null) {
      return null;
    }
    let n = this.r;
    while (n.left !== null) {
      n = n.left;
    }
    return n.data;
  }

  max() {
    if (this.r === null) {
      return null;
    }
    let n = this.r;
    while (n.right !== null) {
      n = n.right;
    }
    return n.data;
  }
}

module.exports = {
  BinarySearchTree
};
