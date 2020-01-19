class Queue {
  constructor(items) {
    this.items = items || []
  }
  enqueue(element) {
    this.items.push(element) //从队尾添加一个元素
  }
  dequeue() {
    return this.items.shift() //从队首删除一个元素
  }
  head() {
    return this.items[0] //返回队首的元素
  }
  tail() {
    return this.items[this.items.length - 1] //返回队尾的元素
  }
  clear() {
    this.items = []
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return !this.items.length
  }
}

var queue = new Queue();
//从队尾添加一个元素
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
// 返回队尾的元素
console.log(queue.head()); //队首1
console.log(queue.tail()); // 队尾3
//从队列首删除元素
queue.dequeue()
console.log(queue.head()); //队首2
console.log(queue.tail()); // 队尾3