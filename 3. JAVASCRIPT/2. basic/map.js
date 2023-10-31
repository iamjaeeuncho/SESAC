const numbers = [1,2,3,4,5];

// 화살표 함수 (arrow function)
// const sqrNumbers = numbers.map((num) => num * num);
const sqrNumbers = numbers.map(square);

console.log(numbers);
console.log(sqrNumbers);

function square(num) {
    return num * num;
}