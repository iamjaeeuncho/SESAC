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

    // 한 줄씩 처리하도록 setTimeout을 통해 한줄 한줄 쓸때마다 지연 처리

    let currentIndex = 0;

    function writeLine() {
        if (currentIndex < dataToWrite.length) {
            const line = dataToWrite[currentIndex].join(',');

            fs.appendFile(filePath, line + '\n', 'utf8', (err) => {
                if (err) {
                    console.error('파일쓰기오류', err);
                    return callback(err);
                }

                currentIndex++;
                setTimeout(writeLine, 100); // 한줄씩 100ms 딜레이
            });
        } else {
            callback(null)
        }
    }
}

module.exports = { readCSV, writeCSV };
