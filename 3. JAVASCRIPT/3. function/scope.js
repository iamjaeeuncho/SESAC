var result = 10;            // global scope

console.log("result:", result);

// global과 block 범위를 동일하게 만드는 변수 선언은 쉐도잉 효과를 일으키고 좋지 않음
function add(a, b) {
    result = a + b;        // block scope
    console.log("result:", result);
    return result;
}

result = add(2, 5);
console.log(result);

// console.log("res:", res);       // undefined var 오류 발생
console.log("result:", result);