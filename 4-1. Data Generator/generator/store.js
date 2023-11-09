import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { storegen } from '../function/storeName.js';
import { addressgen } from '../function/storeAddress.js';


let csvData = [['Num', 'Id', 'Type', 'Address']]; // 헤더행

for (let i = 0; i <= 100; i++) {
  let userId = uuidv4();
  let storeName = storegen();
  let storeAddress = addressgen();

  csvData.push([i, userId, storeName, storeAddress]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('../csv/store.csv', csvContent, 'utf8');
    console.log('store.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();