import { v4 as uuidv4 } from 'uuid';
import { writeFile } from 'fs/promises';

// UUID 생성
let item_uuid = uuidv4();
console.log(item_uuid);



// 아이템 이름, 타입 생성
let items = {
    'Americano Coffee' : 3000,
    'Espresso Coffee' : 4000,
    'Vanilla Coffee' : 5000,
    'Mocha Coffee' : 6000,
    'Watermelon Juice' : 7000,
    'Strawberry Juice' : 7000,
    'Grape Juice' : 7000,
    'Apple Juice' : 7000,
    'Carrot Cake' : 6000,
    'Red Velvet Cake' : 6500,
    'Butter Cake' : 5000,
    'Cheese Cake' : 5500
}

let itemKey = Object.keys(items);
let itemValue = Object.values(items);
// console.log(itemKey, itemValue)

function itemgen() {
    let item = itemKey[Math.floor(Math.random() * itemKey.length)];
    let type = item.split(" ");
    let price = items[item];
    return ` ${item}, ${type[1]}, ${price}`; 
}

// console.log(itemgen());



let csvData = [['Num', 'Id', 'Name', 'Type', 'UnitPrice']]; // 헤더행

for (let i = 0; i <= 20; i++) {
    csvData.push([i, uuidv4(), itemgen()]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('item.csv', csvContent, 'utf8');
    console.log('item.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();
