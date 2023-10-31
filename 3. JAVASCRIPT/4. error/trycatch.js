function divide(a, b) {
    try {
        if (typeof b != 'number') {
            throw new TypeError('숫자를 입력하세요');
        }

        if (b === 0) {
            throw new Error('0으로 나눌 수 없습니다');
        }

        if (a.toString().length > 10 || b.toString().length > 10) {
            throw new Error('숫자 10자리가 넘습니다')
        }
        return a/b;
    } catch (error) {
        if (error instanceof TypeError) {
            console.log('타입 오류가 발생했습니다', error.message);
        } else {
            console.log('기타 오류가 발생했습니다', error.message);
        }
    }
}

console.log(divide(10, 2));
console.log(divide(10, 0));
console.log(divide(10, '문자열'));
console.log(divide(12345, 5));
console.log(divide(1234567890000, 5));
