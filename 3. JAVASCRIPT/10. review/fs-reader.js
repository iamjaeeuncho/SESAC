const fs = require('fs');

const filePath = 'sample.csv';

fs.readFile(filePath, 'utf8', (err, data) => {
    // 저 파일을 읽어서 화면에 출력
    if (err) {
        console.error('파일 읽는 중 오류 발생', err);
        return;
    }

    rows = data.split('\n');
    // console.log(data);

    // 1. for loop 방식
    // for (let i = 0; i < rows.length; i++) {
    //     // console.log(rows[i])
    //     const row = rows[i];
    //     const columns = row.split(',');
    //     console.log(`행 ${i+1}`, columns);
    // }

    // 2. forEach 방식
    // rows.forEach((row, i) => {
    //     const columns = row.split(',');
    //     console.log(`행 ${i+1}`, columns);
    // })

    // // map 방식
    rows.map((row, i) => {
        const columns = row.split(',');
        console.log(`행 ${i + 1}: `, columns);
    });
});