class LazyManClass {
  constructor(name) {
    this.taskList = [];
    this.name = name;
    console.log(`Hi I am ${this.name}`);
    //通过settimeout的方法，将执行函数放入下一个事件队列中，从而达到先注册事件，后执行的目的
    setTimeout(() => {
      this.next();
    }, 0);
  }
  eat(name) {
    var that = this;
    //这里为什么使用闭包呢??????
    //为了保持对变量的引用,如果是直接函数,在执行next的时候拿不到变量了
    var fn = (function(n) {
      return function() {
        console.log(`I am eating ${n}`)
        that.next();
      }
    })(name);
    this.taskList.push(fn);
    return this;
  }
  sleepFirst(time) {
    var that = this;
    var fn = (function(t) {
      return function() {
        setTimeout(() => {
          console.log(`等待了${t}秒...`)
          that.next();
        }, t * 1000);
      }
    })(time);
    this.taskList.unshift(fn);
    return this;
  }
  sleep(time) {
    var that = this
    var fn = (function(t) {
      return function() {
        setTimeout(() => {
          console.log(`等待了${t}秒...`)
          that.next();
        }, t * 1000);
      }
    })(time);
    this.taskList.push(fn);
    return this;
  }
  next() {
    var fn = this.taskList.shift();
    fn && fn();
  }
}

function LazyMan(name) {
  return new LazyManClass(name);
}
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');