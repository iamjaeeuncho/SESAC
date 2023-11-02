// 랜덤으로 100개 숫자
const array = Array.from({length: 100}, () => Math.floor(Math.random() * 100));
console.log(array);

// 랜덤으로 100개 숫자 겹치지 않게
 const uniqueRandomNumbers = new Set();
 console.log(uniqueRandomNumbers.size);

 while (uniqueRandomNumbers.size < 100) {
    uniqueRandomNumbers.add(Math.floor(Math.random() * 100));
 }
console.log(uniqueRandomNumbers);

const array2 = Array.from(uniqueRandomNumbers);
console.log(array2);

// 이걸 내가 직접 구현하면
let uniqueRandomNumbers2 = [];

while (uniqueRandomNumbers2.length < 100){
    let randumNumber = Math.floor(Math.random() * 100);
    for (let i = 0; i < uniqueRandomNumbers2.length; i++) {
        if (randomNumber === uniqueRandomNumbers[i]) {
            uniqueRandomNumbers2.push(randomNumber);
        }
    }
}