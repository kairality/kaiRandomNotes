class Queue {

    constructor() {
      this.itemQueue = {};
      this.headIndex = 0;
      this.tailIndex = 0;
      this.length = 0;
    }


    enqueue(node) {
      this.itemQueue[this.tailIndex] = node;
      this.tailIndex += 1;
      this.length++;
    }

    dequeue() {
      const toReturn = this.itemQueue[this.headIndex];
      delete this.itemQueue[this.headIndex];
      this.headIndex += 1;
      this.length--;
      return toReturn;
    }

  }

  module.exports = Queue;
