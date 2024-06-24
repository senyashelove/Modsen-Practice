//вариант 2
'use strict';

function cont(arr, value) {
  return arr.includes(value);
}
const array = [1, 2, 3, 4, 5];
console.log(cont(array, 5));
console.log(cont(array, 6)); 