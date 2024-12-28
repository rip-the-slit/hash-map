export default class HashMap {
  constructor(loadFactor = 0.8, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = this.createBuckets()
  }
  createBuckets(capacity = this.capacity) {
    const arr = [];
    while (capacity--) arr.push([]);
    return arr;
  }
}
