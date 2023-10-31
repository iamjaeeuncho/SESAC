const array = [1,2,3];

// for ... of : 배열, 문자열, Map, Set
for (const element of array) {
    console.log(element);
};


const obj = {a: 1, b: 2, c: 3}

console.log(obj.a);
console.log(obj.b);

// for ... in : 객체
for (const key in obj) {
    console.log(key, obj[key]);
}

const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
    console.log(fruit);
}