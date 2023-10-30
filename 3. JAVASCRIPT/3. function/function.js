// 함수 정의 및 선언(declare)
function greet() {
    console.log("안녕")
    // console.log("오류")
}

// 함수 호출 = 실행
greet();

// 매개변수(Parameter)
// function은 키워드, greetbyname은 함수명, name은 파라미터(인자값)
function greetByName(name) {
    // console.log("안녕하세요", name);
    // console.log("안녕하세요", name, "님");
    console.log(`안녕하세요 ${name} 님`);
}

greetByName("조재은");
greetByName("이재긍");
greetByName("김재박");


// 익명함수
// function 함수명(파라1, 파라2, 파라3, ...)
let result = function (x, y) { return x * y };
console.log(result(2,5));

let result2 = function (x, y) {
    return x * y
};
console.log(result(2,5));

// 화살표함수(Arrow Function)
let result3 = (x, y) => { return x * y };
console.log(result3(3,5));