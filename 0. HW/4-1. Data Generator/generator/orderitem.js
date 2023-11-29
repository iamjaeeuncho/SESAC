import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { fileReaderForId } from '../function/fileReaderForId.js';
import { randomNum } from '../function/randomNum.js';

let csvOrderFilePath = '../csv/order.csv';
let csvItemFilePath = '../csv/item.csv';

let csvOrderFile = fileReaderForId(csvOrderFilePath);
let csvItemFile = fileReaderForId(csvItemFilePath);

let csvData = [['Num', 'Id', 'OrderId', 'ItemId']]; // Header

for (let i = 0; i <= 50000; i++) {
    let id = uuidv4();
    let orderId = randomNum(csvOrderFile);
    let itemId = randomNum(csvItemFile);

    csvData.push([i, id, orderId, itemId]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('../csv/orderitem.csv', csvContent, 'utf8');
    console.log('orderitem.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();

