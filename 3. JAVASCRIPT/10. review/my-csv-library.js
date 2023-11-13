const fs = require('fs');

function readCSV(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('파일 읽는 중 오류 발생', err);
            return callback(err, null);
        }
    
        const rows = data.split('\n');
        const result = rows.map((row) => row.split(','));
        callback (null, result);
    });
}



function writeCSV(filePath, dataToWrite, callback) {
    const csvContent = dataToWrite.map((row) => row.join(',')).join('\n');

    fs.writeFile(filePath, csvContent, 'utf8', (err) => {
        if(err) {
            console.error('파일을 쓰는 도중 에러 발생', err);
            return callback(err);
        }
        callback(null);
    })
}

module.exports = { readCSV, writeCSV };
