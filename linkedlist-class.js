export default class LinkedList {
  #head = null;
  get head() {
    return this.#head;
  }
  tail() {
    let node = this.#head;
    while (node && node.next) node = node.next;
    return node;
  }
  append(value) {
    if (!this.#head) this.#head = new Node(value);
    else this.tail().next = new Node(value);
  }
  prepend(value) {
    const prev = this.#head;
    this.#head = new Node(value, prev);
  }
  size() {
    let size = 0;
    let node = this.#head;
    while (node) {
      size++;
      node = node.next;
    }
    return size;
  }
  at(index) {
    let currentIndex = -1;
    let node = this.#head;
    while (node && ++currentIndex !== index) node = node.next;
    return node;
  }
  pop() {
    const prevNext = this.#head.next;
    this.#head = prevNext;
  }
  contains(value) {
    let node = this.#head;
    while (node) {
      if (node.value == value) return true;
      node = node.next;
    }
    return false;
  }
  find(key) {
    let index = -1;
    let node = this.#head;
    while (node) {
      index++;
      if (node.value.key == key) return index;
      node = node.next;
    }
    return -1;
  }
  toString() {
    let string = "";
    let node = this.#head;
    while (node) {
      string += `( ${node.value} ) => `;
      node = node.next;
    }
    string += "null";
    return string;
  }
  insertAt(value, index) {
    if (index == 0) this.prepend(value);
    const prevNode = this.at(index - 1);
    const prevNext = prevNode.next;
    if (prevNode) prevNode.next = new Node(value, prevNext);
  }
  removeAt(index) {
    if (index == 0) {
      this.pop()
      return
    }
    const prevNode = this.at(index - 1);
    const nextNext = prevNode.next.next;
    if (prevNode) prevNode.next = nextNext ? nextNext : null;
  }
}

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}