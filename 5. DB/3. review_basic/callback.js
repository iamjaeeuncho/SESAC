const greet = function(name) {
    return `안녕 ${name}님`;
}

function myFunction(callback, person) {
    const message = callback(person);
    return message;
}

console.log(myFunction(greet, 'jen'));

// -------------

// const aaa = new Promise(resolve, reject) {
//     if (연산) {
//         resilve();
//     } else if {
//         reject()
//     }
// }

// aaa().then(() => {
//     // 프로미스가 성공했을 때
// }).catch(() => {
//     // 프로미스가 실패했을 때
// })

// Promise
// class Promise {
//     let state = 'Pending'

//     function resolve(result) {
//         state = 'Fulfilled';
//         return result
//     }

//     function reject(reason) {
//         state = 'Rejected';
//         throw new Error('reason');
//     }
// }