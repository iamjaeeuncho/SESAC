const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
    path: 'example.csv',
    header: [
        {id: 'column1', title: 'Column1'},
        {id: 'column2', title: 'Column2'},
        // 추가 필요한 헤더
    ],
});

const data = [
    { column1: '값1', column2: '값2' },
    { column1: '값3', column2: '값4' },
    // 원하는 추가 데이터
];

csvWriter.writeRecords(data)
    .then(() => console.log('CSV 파일이 성공적으로 기록되었습니다.'));