// 이전 파일 내용 불러오기
// import { add, sub, mul, div } from "./calculator";
import Calculator from "./calculator";
import EngineeringCal from "./engineeringcal";
import ProgrammingCal from "./programmingcal";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function performOperation(operator, num1, num2) {
    switch (operator) {
      case '1':
        return num1 + num2;
      case '2':
        return num1 - num2;
      case '3':
        return num1 * num2;
      default:
        return '올바르지 않은 연산자';
    }
  }

console.log('Select Calculator Mode:');
console.log('1. Engineering Calculator');
console.log('2. Standard Calculator');
console.log('3. Programming Calculator');

rl.question('Enter the mode (1/2/3): ', (mode) => {
    if (['1', '2', '3'].includes(mode)) {
        rl.question('Enter first number: ', (num1) => {
          rl.question('Enter operator (+, -, *): ', (operator) => {
            rl.question('Enter second number: ', (num2) => {
              num1 = parseFloat(num1);
              num2 = parseFloat(num2);
    
              const result = performOperation(operator, num1, num2);
              console.log(`Result: ${result}`);
   
              rl.close();
            });
        });
      });
    } else {
      console.log('올바른 모드를 선택하세요.');
      rl.close();
    }
    });

    
// let sum = Calculator.add(5, 3);
// console.log('덧셈결과', sum);