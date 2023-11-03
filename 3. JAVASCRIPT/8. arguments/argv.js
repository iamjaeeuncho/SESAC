// argc는 argument count의 약자고, argv는 argument values의 약자
// Node.js에서 process.argv는 프로세스에 전달된 인수를 저장하는 배열

// argv[0]은 node 프로세스 위치
// argv[1]은 나 자신, 즉 내 실행 파일을 의미함
// argv[2]은 실제로 입력받은 인자

// console.log(process.argv);

let numRecords = process.argv[2];
let displayFormat = process.argv[3];
// console.log(numRecords);

if (process.argv.length < 3) {
    numRecords = 10;
    displayFormat = 'csv'
}

for (let i = 0; i < numRecords; i++) {
    console.log(i)
}

if (displayFormat == 'csv') {
    console.log('Printing result to csv');
} else if (displayFormat == 'html') {
    console.log('Printing result to <HTML>')
} else {
    console.log('Printing to screen');
}