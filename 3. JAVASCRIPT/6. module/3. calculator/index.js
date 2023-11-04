// 이전 파일 내용 불러오기
// import { add, sub, mul, div } from "./calculator";
import Calculator from "./calculator.js";
import EngineeringCal from "./engineeringcal.js";
import ProgrammingCal from "./programmingcal.js";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('Select Calculator Mode:');
console.log('1. Standard Calculator');
console.log('2. Engineering Calculator');
console.log('3. Programming Calculator');

rl.question("Enter the mode (1/2/3): ", (selectedMode) => {
  if (selectedMode === '1') {
    rl.question("Enter first number: ", (num1) => {
      rl.question("Enter operator (+, -, *, /): ", (operator) => {
        rl.question("Enter second number: ", (num2) => {
          num1 = parseInt(num1);
          num2 = parseInt(num2);
          const result = new Calculator();

          if (operator === "+") {
            console.log(result.add(num1, num2));
          } else if (operator === "-") {
            console.log(result.sub(num1, num2));
          } else if (operator === "*") {
            console.log(result.mul(num1, num2));
          } else if (operator === "/") {
            console.log(result.div(num1, num2));
          } else {
            console.log('올바른 숫자와 연산자를 입력하세요');
          }
          rl.close();
        });
      });
    });
  } else if (selectedMode === '2') {
    const result2 = new EngineeringCal();
    console.log(result2.logarithm());
    rl.close();
  } else if (selectedMode === '3') {
    const result3 = new ProgrammingCal();
    console.log(result3.show());
    rl.close();
  } else {
    console.log("Wrong Mode. The end.");
    rl.close();
  }
});

    
// let sum = Calculator.add(5, 3);
// console.log('덧셈결과', sum);