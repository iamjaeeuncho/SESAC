import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

// UUID 생성
let store_uuid = uuidv4();
// console.log(store_uuid);


// 스토어 이름 생성
let brands = ['스타벅스', '투썸플레이스', '커피빈', '이디야', '빽다방', "메가커피"];
let branches = ['강남', '방배', '청담', '신림', '건대', '명동', '홍대', '신촌', '종로', '대학로', '노원', '동대문'];

function storegen() {
    let brand = brands[Math.floor(Math.random() * brands.length)];
    let branch = branches[Math.floor(Math.random() * branches.length)];
    let num = Math.floor(Math.random() * 10);
    return `${brand} ${branch} ${num}호점`;
}

// console.log(storegen());


// 주소
let cities = ['서울시', '인천시', '부산시', '대전시', '세종시', '광주시', '대구시', '울산시']
let regions = ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구']

function addressgen() {
    let city = cities[Math.floor(Math.random() * cities.length)];
    let region = regions[Math.floor(Math.random() * regions.length)];
    let street = Math.floor(Math.random() * 100) + 1;
    let postcode = Math.floor(Math.random() * 10000) + 1;

    return `${postcode} ${city} ${region} ${street}길 `;
}

// console.log(addressgen());


let csvData = [['Num', 'Id', 'Type', 'Address']]; // 헤더행

for (let i = 0; i <= 100; i++) {
    csvData.push([i, uuidv4(), storegen(), addressgen()]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('store.csv', csvContent, 'utf8');
    console.log('store.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();