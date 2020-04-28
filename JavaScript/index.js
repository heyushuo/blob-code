var b = {
  'valueOf': function() {
    var i = 1;
    return function() {
      return i++
    }
  }()
}
// console.log(b.valueOf());

console.log(b == 1);
console.log(b == 2);
console.log(b == 3);