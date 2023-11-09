import { writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { namegen } from '../function/username.js';
import { gendergen } from '../function/userGender.js';
import { birthdaygen } from '../function/userBirthday.js';
import { addressgen } from '../function/userAddress.js';


let csvData = [['Num', 'Id', 'Name', 'Gender', 'Birthday', 'Age', 'Address']]; // Header

for (let i = 0; i <= 1000; i++) {
  let userId = uuidv4();
  let userName = namegen();
  let userGender = gendergen();
  let userBirthday = birthdaygen()[0];
  let userAge = birthdaygen()[1];
  let userAddress = addressgen();

  csvData.push([i, userId, userName, userGender, userBirthday, userAge, userAddress]);
}

// CSV 형식의 문자열 생성
const csvContent = csvData.map(row => row.join(",")).join("\n");

// CSV 파일 생성
async function createCSVFile() {
  try {
    await writeFile('../csv/user.csv', csvContent, 'utf8');
    console.log('user.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();