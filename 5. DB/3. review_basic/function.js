function greet(name) {
    return `안녕 ${name}님`;
}

function greet2(name) {
    return `안녕22 ${name}님`;
}

function greet3(name) {
    return `안녕33 ${name}님`;
}


const result = greet('jen');
console.log(result);

// ----------------------------

const myFunction = greet;
const myFunction2 = greet2;
const myFunction3 = greet3;

const result1 = myFunction('jaeeun');
const result2 = myFunction2('jaeeun');
const result3 = myFunction3('jaeeun');

console.log(result1);
console.log(result2);
console.log(result3);