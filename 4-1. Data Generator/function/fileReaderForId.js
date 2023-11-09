import fs from 'fs';

export function fileReaderForId(csvFilePath) {
  let csvData = fs.readFileSync(csvFilePath, 'utf-8', (err, data) => {
      if (err) {
          console.error('파일을 읽는 동안 오류 발생:', err);
          return;
      }      
  });
  // CSV 데이터를 처리
  let lineData = csvData.split('\n').map(row => row.split(','));
  return lineData;
}