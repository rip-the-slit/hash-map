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
    const found = bucket.find(key);
    if (found) found.value.value = value;
    else bucket.append({ key, value });
  }
  get(key) {
    const bucket = this.buckets[this.hash(key)];
    return bucket.find(key).value.value;
  }
}
