// 배열(리스트) [mem1, mem2, mem3, ...]
// 1. 배열 생성
const numbers = [1, 2, 3, 4, 5]; // Good
const numbers2 = [1,2,3,4,5];    // Not good
const fruits = ["Apple", "Banana", "Orange"];
const mixed = [1, "1", "hello", true, false, null, {key: 'value'}];

console.log(numbers);
console.log(fruits);
console.log(mixed);

// 2. 배열 접근
console.log(numbers[0]);  // 0부터 시작
console.log(numbers[1]);
console.log(numbers[4]);
console.log(numbers[5]);  // 인덱스 범위 벗어남

// 배열안에 있는 멤버를 반복 접근 = 이터레이터(iterator)
for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i])
}

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i])
}

// object.forEach(개별멤버별로 수행할 기능을 함수로 정의)
// 익명함수 = 함수명이 없는 함수
fruits.forEach((fruit) => {
    console.log(fruit);
});

fruits.forEach(function(fruit) {
    console.log(fruit);
});

// 3. 배열 수정
console.log(fruits);
fruits[1] = 'Grapes';
console.log(fruits);

fruits.push('Tomato');
console.log(fruits);

new_fruits = fruits.pop();
console.log(new_fruits);
console.log(fruits);

// slice(start index, end index): 시작 포함, 마지막 미포험
const new_numbers = numbers.slice(1, 3); 
console.log(new_numbers);