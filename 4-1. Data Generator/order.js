import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';

// UUID 생성
// let order_uuid = uuidv4();
// console.log(order_uuid);



function orderdate() {
    let year = Math.floor(Math.random() * 1) + 2023;
    let month = Math.floor(Math.random() * 12) + 1;
    let hour = Math.floor(Math.random() * 24);
    let minute = Math.floor(Math.random() * 60);
    let second = Math.floor(Math.random() * 60);

    if (month === 2) {
        let day = Math.floor(Math.random() * 28) + 1;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if ([1,3,5,7,8,10,12].includes(month)) {
        let day = Math.floor(Math.random() * 31) + 1;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if ([4,6,9,11].includes(month)) {
        let day = Math.floor(Math.random() * 30) + 1;
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}

// console.log(orderdate());



function fileReaderForId(csvFilePath) {
  let csvData = fs.readFileSync(csvFilePath, 'utf-8', (err, data) => {
      if (err) {
          console.error('파일을 읽는 동안 오류 발생:', err);
          return;
      }      
  });
    // CSV 데이터를 처리
    let lineData = csvData.split('\n').map(row => row.split(','));
    let num = Math.floor(Math.random() * lineData.length);

    if (num === 0) {
      return lineData[num + 1][1];
    } else {
      return lineData[num][1];
    }
}

let csvStoreFilePath = 'store.csv';
let csvUserFilePath = 'user.csv';

// console.log(fileReaderForId(csvStoreFilePath));
// console.log(fileReaderForId(csvUserFilePath));



let csvData = [['Num', 'Id', 'OrderAt', 'StoreId', 'UserId']]; // 헤더행

for (let i = 0; i <= 10000; i++) {
    csvData.push([i, uuidv4(), orderdate(), fileReaderForId(csvStoreFilePath), fileReaderForId(csvUserFilePath)]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('order.csv', csvContent, 'utf8');
    console.log('order.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();

