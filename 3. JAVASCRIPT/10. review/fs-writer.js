const fs = require('fs');

const filePath = 'sample.csv';
const dataToWrite =[
    ['Column1', 'Column2'],
    ['Value1', 'Value2'],
    ['Value3', 'Value4'],
];

// 데이터 변환 작업 필요
// const csvContent = dataToWrite.map((row) => row.join(',')).join('\n');
// console.log(csvContent);

let csvContent = '';

for (let i = 0; i < dataToWrite.length; i++) {
    // console.log(dataToWrite[i])
    csvContent += dataToWrite[i].join(',');
    if(i < dataToWrite.length - 1){
        csvContent += '\n';
    }
    console.log(csvContent);
}

fs.writeFile(filePath, csvContent, 'utf8', (err) => {
    if(err) {
        console.error('파일을 쓰는 도중 에러 발생', err);
        return;
    }
    console.log('csv 파일 작성 성공')
})