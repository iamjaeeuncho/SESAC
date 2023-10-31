// 예외처리를 할 수 있는 exception 기능
// 모던 언어에서는 TRY CATCH || TRY EXCEPT
// BAD : syntax, logic 에러에서는 TRY CATCH 쓰기 좋지 않다
// GOOD : 입출력, 네트워크

function divide(a, b) {
    try {
        // 오류 발생할 가능성 있는 구문
        if (b === 0) {
            throw "0으로 나눌 수 없습니다"
        }
        result = a / b;
    } catch(error) {
        // 오류 핸들링하기 위한 표현
        console.log("오류 발생: ", error);
    }
    return result
}

console.log(divide(10, 2));
console.log(divide(10, 0));

try {
    const result = myvariable * 2;
} catch (error) {
    console.log("오류 발생")
}