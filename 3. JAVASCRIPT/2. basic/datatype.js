// 숫자(Integer, Float)
// 문자(String)
// 불리언(Boolean) = true, false
// 객체(Object) = { key : value }
// 스페셜 : null, undefined

let variable
console.log(variable);

variable = null;
console.log(variable);

variable = 1;
console.log(variable);

variable = null;
console.log(variable);

variable = undefined;             // 굳이 UNDEFINED 할당 NONO
console.log(variable);

variable = "1";
variable = 1;
console.log(variable);


console.log(typeof(variable));

variable = '1';
console.log(variable);
console.log(typeof(variable));