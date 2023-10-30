console.log('hello');

// weak-typed 언어
const greeting = "hello, world"
console.log(greeting);

const a = 10;
const b = 20;
console.log('Number: ', a, b);
console.log('Number: a=' + a + 'b=' + b);

// template literal
console.log('Number: ${a} ${b}');
console.log(`Number: ${a} ${b}`);

// 객체 형태로 출력
console.log({a, b})

// 웹사이트 콘솔창에서 스타일 적용
console.log('%c 스타일 적용', 'color: blue; font-weight: bold');

// ASCII, Unicode
console.log('\u2713', '\u2717');


const username = "alice";
const age = 20;

console.log(`Name: ${username}, Age: ${age}`);
console.log('Hello, World');


// 불가능한 변수명들
// let 1hello = 50;                   // 숫자로 시작 불가능
// let hello-world = "hello world";   // 하이픈 불가능
// let %hello = 50;                   // 특수문자로 시작 불가능
// let var = 50                       // 이미 정해진 키워드는 사용 불가능ㄴ
let _hello = 50;                      // 특수문자 중에서 언더라인은 가능
