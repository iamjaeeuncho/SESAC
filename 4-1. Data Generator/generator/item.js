import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { itemgen } from '../function/itemName.js';

let csvData = [['Num', 'Id', 'Name', 'Type', 'UnitPrice']]; // Header

for (let i = 0; i <= 20; i++) {
  let itemId = uuidv4();
  let itemName = itemgen();

  csvData.push([i, uuidv4(), itemgen()]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('../csv/item.csv', csvContent, 'utf8');
    console.log('item.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();
