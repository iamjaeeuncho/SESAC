let array1 = [1, 2, 3];
const array2 = [4, 5, 6];

console.log(array1[0]);
console.log(array2[0]);

array1.push(7);
console.log(array1);

array1.pop();
console.log(array1);

let new_array1 = array1.slice(1,3); // 0부터 시작하므로 1=2번째 요소, 3=4번째 요소
console.log(new_array1);
console.log(array1);

// slice vs splice
array1.splice(1,2);           // 1~2번째 요소부터 갯수(2)
console.log(array1);

const array3 = array1.concat(array2);
console.log(array3);

// Spread 문법 (Spread 연산자)
const array4 = [...array1, ...array2];
console.log(array4);


array1 = [1, 2, 3];

console.log(array1);
console.log(array2);

array1.splice(1, 0, ...array2);
console.log(array1);

