function sum(a) {
  let currentSum = a;

  function trueSum(b) {
    if(!b) return currentSum;
    currentSum += b;
    return trueSum;
  }

  trueSum.toString = function() {
    return currentSum;
  };

  return trueSum;
}
let test = {};
test.a = sum(undefined)() === undefined;
test.b = sum(1)() === 1;
test.c = sum(1)(2)(3)(4)()  === 10;
test.d = sum(0)(5)(3)(8)(-2)() === 14;
test.e = sum(1)(1)(1)(1)(1)(1)(1)() === 7;
test;