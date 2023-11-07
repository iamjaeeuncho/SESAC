
import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

// UUID 생성
// let user_uuid = uuidv4();
// console.log(user_uuid);


// 이름 생성
let names = ['수', '찬', '민', '도', '하', '지', '주', '준', '시', '건', '예', '선', '연', '유', '현', '지', '은', '갑', '효', '리', '진', '승', '환', '준', '윤', '우', '호', '원', '후', '서', '현', '혁', '진', '환', '훈', '재', '민']
let familynames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한']

function namegen() {
    let firstname = names[Math.floor(Math.random() * names.length)];
    let middlename = names[Math.floor(Math.random() * names.length)];
    let lastname = familynames[Math.floor(Math.random() * familynames.length)];

    return `${lastname}${firstname}${middlename}`;
}

// console.log(namegen());


// 생년월일, 나이
function birthdaygen() {
    let currentyear = new Date().getFullYear();
    let year = Math.floor(Math.random() * 30) + 1980;
    let month = Math.floor(Math.random() * 12) + 1;
    let age = currentyear - year

    if (month === 2) {
        let day = Math.floor(Math.random() * 28) + 1;
        return [`${year}-${month}-${day}`, `${age}`];
    } else if ([1,3,5,7,8,10,12].includes(month)) {
        let day = Math.floor(Math.random() * 31) + 1;
        return [`${year}-${month}-${day}`, `${age}`];
    } else if ([4,6,9,11].includes(month)) {
        let day = Math.floor(Math.random() * 30) + 1;
        return [`${year}-${month}-${day}`, `${age}`];
    }
}

// console.log(birthdaygen());


// 성별
function gendergen() {
    let gender = Math.floor(Math.random() * 2);
    return gender < 0.5 ? "남자" : "여자";
}

// console.log(gendergen());


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


let csvData = [['Num', 'Id', 'Name', 'Gender', 'Birthday', 'Age', 'Address']]; // 헤더행

for (let i = 0; i <= 1000; i++) {
    csvData.push([i, uuidv4(), namegen(), gendergen(), birthdaygen()[0], birthdaygen()[1], addressgen()]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('user.csv', csvContent, 'utf8');
    console.log('user.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();