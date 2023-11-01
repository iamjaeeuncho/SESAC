// const today = new Date();
// console.log(today);

// 1. Date
// const today = new Date();
// console.log(today);

// 2. Math
// const max_number = Math.max(10, 20, 30, 5, 3, 1);
// console.log(max_number);


const numbers = [10, 20, 30, 5, 3, 1]

// numbers에서 가장 큰 숫자 찾기

function max_numbers(numbers) {
    let result = numbers[0]
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > result) {
            result = numbers[i]
        }
    }
    return result;
}

function min_numbers(numbers) {
    let result = numbers[0]
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < result) {
            result = numbers[i]
        }
    }
    return result;
}

function avg_numbers(numbers) {
    let result = numbers[0]
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] < result) {
            result += numbers[i]
        }
    }
    return result/numbers.length;
}

// ---------- 선생님 답 ----------
// function max_numbers(nums) {
//     let num = nums[0];
//     for (let i = 1; i < numbers.length; i++) {
//         // console.log(nums[i]);
//         if (nums[i] > num) {
//             num = nums[i];
//             console.log(num);
//         }
//     }
//     return num;
// }

let max_num = max_numbers(numbers);
console.log('MAX :', max_num);

let min_num = min_numbers(numbers);
console.log('MIN : ', min_num);

let avg_num = avg_numbers(numbers);
console.log('AVG : ', avg_num);




// 3. String
const text = 'Hello World';
console.log(text.length);
console.log(text.toUpperCase());
console.log(text.toLowerCase());

console.log(text.split(" "));
console.log(text.concat("!"));
console.log(text.includes('wow'));
