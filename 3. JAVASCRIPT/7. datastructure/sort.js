// 소팅함수 구현 - 오름차순
// 1. 앞에 2개 숫자를 비교한다
// 2. 2개 중에 큰 숫자를 뒤로 가게 한다

let numbers = [4, 2, 7, 1, 9, 5];

function sort_numbers(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        console.log(i, numbers[i], numbers[i+1]);
        for (let j = 0; j < numbers.length; j++) {
            // console.log(j, numbers[j], numbers[j+1]);
            if (numbers[j] > numbers[j+1]) {
                [numbers[j], numbers[j+1]] = [numbers[j+1], numbers[j]];
            } else if (numbers[j] < numbers[j+1]) {
                [numbers[j], numbers[j+1]] = [numbers[j], numbers[j+1]];
            }
            console.log(numbers);
        } 
    }
}


let result = sort_numbers(numbers);
console.log(result);