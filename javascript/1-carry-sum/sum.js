function sum(a) {
  let currentSum = a;

  function trueSum(b) {
    if(typeof b !== 'number') return currentSum;
    currentSum += b;
    return trueSum;
  }

  return trueSum;
}

console.assert( sum(undefined)() === undefined , "sum(undefined)() === undefined");
console.assert( sum(1)() === 1 , "sum(1)() === 1");
console.assert( sum(1)(2)(3)(4)()  === 10 , "sum(1)(2)(3)(4)()  === 10");
console.assert( sum(0)(5)(3)(8)(-2)() === 14 , "sum(0)(5)(3)(8)(-2)() === 14");
console.assert( sum(1)(1)(1)(1)(1)(1)(1)() === 7 , "sum(1)(1)(1)(1)(1)(1)(1)() === 7");