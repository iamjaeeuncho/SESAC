import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';
import { orderdate } from '../function/orderDate.js';
import { fileReaderForId } from '../function/fileReaderForId.js';
import { randomNum } from '../function/randomNum.js';

let csvStoreFilePath = '../csv/store.csv';
let csvUserFilePath = '../csv/user.csv';

let csvOrderFile = fileReaderForId(csvStoreFilePath);
let csvItemFile = fileReaderForId(csvUserFilePath);

let csvData = [['Num', 'Id', 'OrderAt', 'StoreId', 'UserId']]; // 헤더행

for (let i = 0; i <= 10000; i++) {
  let orderId = uuidv4();
  let orderDate = orderdate();
  let orderStoreId = randomNum(csvOrderFile);
  let orderUserId = randomNum(csvItemFile);

  csvData.push([i, orderId, orderDate, orderStoreId, orderUserId]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('../csv/order.csv', csvContent, 'utf8');
    console.log('order.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();

