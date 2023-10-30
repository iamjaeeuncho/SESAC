// for (시작값; 조건만족하는동안실행; 시작값의증감조건) {}

// for (i = 0; i < 5; i++) {
//     console.log(i)
//     // console.log('HELLO');
// }

// for (j = 0; j < 5; j++) {
//     console.log(j);
// }

// for (i = 0; i < 5; i++) {
//     console.log("i :" + i);
//     for (j = 0; j < 5; j++) {
//         console.log("   j :" + j);
//     }
//         for (k = 0; k < 5; k++) {
//             console.log("       k :" + k);
//         }
// }

// // 구구단
// for (let i = 1; i < 10; i++) {
//     console.log(i, '단')
//     for (let j = 1; j < 10; j++) {
//         console.log(i, '*', j, '=', i*j)
//     }
// }


// while (조건문이 True면 계속 반복) {}

let n = 0;

while (n < 10) {
    n = n + 1;
    console.log(n);
}

n = 0;

while (true) {
    n = n + 1;
    if (n == 10) {
        n = n + 1;
        continue;
    } else if (n == 20) {
        break;
    }
    console.log(n);
}


// do {}           // 무조건 한 번 실행
// while ()

n = 0;

do {
    console.log(n);
    n = n + 1;
} while (n < 3);