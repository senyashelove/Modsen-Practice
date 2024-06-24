function sumhalf(arr) {
    const hlength = Math.floor(arr.length / 2);
    let sum = 0;
  
    for (let i = 0; i < hlength; i++) {
      sum += arr[i];
    }
  
    return sum;
  }

const numbers = [1, 2, 3, 4, 5, 6,];
const result = sumhalf(numbers);
console.log(result);