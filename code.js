// new 的实现
function create(con) {
  let obj = {};
  // obj.__proto__ = con.prototype;
  Object.setPrototypeOf(obj,con.prototype)
  let args = [].slice.call(arguments, 1)
  // 绑定this
  let res = con.apply(obj, args)
  return typeof res == 'object' ? res : boj
}

// 