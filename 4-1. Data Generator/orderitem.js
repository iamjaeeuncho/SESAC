import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { writeFile } from 'fs/promises';


// UUID 생성
// let orderitem_uuid = uuidv4();
// console.log(orderitem_uuid);



function fileReaderForId(csvFilePath) {
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

function randomNum(originData) {
    let num = Math.floor(Math.random() * originData.length);
  
    if (num === 0) {
        return originData[num + 1][1];
    } else {
        return originData[num][1];
    }
}


let csvOrderFilePath = 'order.csv';
let csvItemFilePath = 'item.csv';

let csvOrderFile = fileReaderForId(csvOrderFilePath);
let csvItemFile = fileReaderForId(csvOrderFilePath);



let csvData = [['Num', 'Id', 'OrderId', 'ItemId']]; // 헤더행

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
    await writeFile('orderitem.csv', csvContent, 'utf8');
    console.log('orderitem.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();

