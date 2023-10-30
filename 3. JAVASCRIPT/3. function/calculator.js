// 더하기 함수
function add(a, b) {
    let sum = a + b;
    console.log(sum);
}

// 빼기 함수
function minus(a, b) {
    let sum = a - b;
    console.log(sum);
}

// 곱하기 함수
function multiply(a, b) {
    let sum = a * b;
    console.log(sum);
}

// 나누기 함수
function divide(a, b) {
    if (a === 0 || b === 0) {
        console.log('0으로 나눌 수 없습니다');
    } else {
        let sum = a / b;
        console.log(sum);
    }
}

// 유닛테스트 : 내가 짠 유닛(함수)에 대한 테스팅
add(4, 0);
minus(202, '2');
multiply(1);
multiply(3,3,4);
divide(4, 0);
divide(0, 0);

// 부동소숫점 오류
multiply(9999999999, 9999999999);         // 기대값 9.999999998e+19
multiply(BigInt(9999999999), BigInt(9999999999));
