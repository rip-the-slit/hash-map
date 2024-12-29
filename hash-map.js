import LinkedList from "./linkedlist-class.js";

export default class HashMap {
  constructor(loadFactor = 0.8, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = this.createBuckets();
  }
  createBuckets(capacity = this.capacity) {
    const arr = [];
    while (capacity--) arr.push(new LinkedList());
    return arr;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }
  set(key, value) {
    const bucket = this.buckets[this.hash(key)];
    const index = bucket.find(key);
    if (index > -1) bucket.at(index).value.value = value;
    else bucket.append({ key, value });
  }
  get(key) {
    const bucket = this.buckets[this.hash(key)];
    const index = bucket.find(key);
    return index > -1 ? bucket.at(index).value.value : index;
  }
  has(key) {
    return this.get(key) > -1 ? true : false;
  }
  remove(key) {
    const bucket = this.buckets[this.hash(key)];
    const index = bucket.find(key);
    if (index > -1) {
      bucket.removeAt(index);
      return true;
    }
    return false;
  }
  length() {
    let count = 0;
    this.buckets.forEach((bucket) => (count += bucket.size()));
    return count;
  }
  clear() {
    this.buckets.forEach((bucket) => {
      while (bucket.head) bucket.pop();
    });
  }
  keys() {
    return this.entries().reduce((arr, entry) => arr.concat(entry[0]), []);
  }
  values() {
    return this.entries().reduce((arr, entry) => arr.concat(entry[1]), []);
  }
  entries() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      let node = bucket.head;
      while (node) {
        arr.push([node.value.key, node.value.value]);
        node = node.next;
      }
    });
    return arr;
  }
}
