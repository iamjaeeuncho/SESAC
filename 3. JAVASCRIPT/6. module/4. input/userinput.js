import readline from "readline";      // NEW - ES6 (type: module로 되어 있어야함)
// const readline = require('readline');    // OLD

const rl = readline.createInterface({
    input: process.stdin,                    // 입력 인터페이스
    output: process.stdout,                  // 출력 인터페이스
});

rl.question('구구단의 단을 입력하세요: ', (input) => {
    const num = parseInt(input);

    if (!isNaN(num) && num > 0 && num < 10) {
        console.log(`${num} 단 구구단을 출력합니다`);
        // 구구단
        for (let i = 1; i < 10; i++) {
            console.log(`${num} * ${i} = ${num*i}`);
        }
    } else {
        console.log('1 ~ 9 까지 숫자를 입력하세요');
    }
    rl.close();
});