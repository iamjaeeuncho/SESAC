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



async function fileReaderForId(csvFilePath) {
  try {
    let data = await readFile(csvFilePath, 'utf-8');
    let csvData = data.split('\n').map(row => row.split(','));
    let num = Math.floor(Math.random() * csvData.length) + 1;

    return csvData[num][1];

  } catch (err) {
    console.error('파일을 읽는 동안 오류 발생:', err);
    return null;
  }
}

let csvStoreFilePath = 'store.csv';
let csvUserFilePath = 'user.csv';

// fileReaderForId(csvStoreFilePath)
// fileReaderForId(csvUserFilePath)



async function generateData() {
  let csvData = [['Num', 'Id', 'OrderAt', 'StoreId', 'UserId']]; // 헤더행

  for (let i = 0; i <= 10; i++) {
    let orderId = uuidv4();
    let orderDate = orderdate();
    let storeId = await fileReaderForId(csvStoreFilePath);
    let userId = await fileReaderForId(csvUserFilePath);

    csvData.push([i, orderId, orderDate, storeId, userId]);
  }
  return csvData;
}

// generateData();



// CSV 형식의 문자열 생성

// CSV 파일 생성
async function createCSVFile() {
  try {
    let csvData = await generateData();
    let csvContent = csvData.map(row => row.join(",")).join("\n");
    
    await writeFile('order.csv', csvContent, 'utf8');
    console.log('order.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();

