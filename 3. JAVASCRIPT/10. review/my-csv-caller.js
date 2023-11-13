const { readCSV, writeCSV } = require('./my-csv-library2');

const sampleData = [
    ['이름', '생년월일', '성별'],
    ['이병헌', '19620103', '남'],
    ['송혜교', '19830208', '여'],
    ['현빈', '19871111', '남'],
];

const filePath = 'user.csv';

console.log('쓰기 시작')
writeCSV(filePath, sampleData, (err) => {
    if (err) {
        console.error('CSV 파일 쓰기 실패');
        return;
    }
    console.log('성공적으로 csv 파일 쓰기 완료')
})
console.log('쓰기 종료');

console.log('읽기 시작');
readCSV(filePath, (err, data) => {
    if (err) {
        console.error('CSV 파일 쓰기 실패')
        return;
    }
    console.log('CSV 파일 내용: ', data);
})
console.log('읽기 종료');