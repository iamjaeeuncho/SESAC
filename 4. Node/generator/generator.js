const firstname = ["John", "Jane", "Michael", "Emily", "William", "Olivia"];
const lastNames = [];

function generateName() {
  return firstname[Math.floor(Math.random() * firstname.length)];
}

console.log(generateName());

// 년월일의 랜덤값 0630-03-17처럼 포매팅
// 년 : 1980 ~ 2010
// 월 : 0월은 없고 12월까지
// 일 : 1 ~ 31일까지, 31일이 없는 날도 있음
function generateBirthdate() {
  const year = Math.floor(Math.random() * 30) + 1980;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 31) + 1;
  return `${year}-${month}-${day}`;
}

console.log(generateBirthdate());

function generateGender() {
  const gender = Math.floor(Math.random() * 2);
  // if (gender === 0) {
  //     return '여성'
  // } else if (gender === 1) {
  //     return '남성'
  // } else {
  //     return gender
  // }

  // if (Math.random() < 0.3) {
  //     return 'Male';
  // } else {
  //     return 'Female';
  // }

  return Math.random() < 0.5 ? "Male" : "Female";
}

console.log(generateGender());

const cities = [
  "서울시",
  "인천시",
  "부산시",
  "대전시",
  "세종시",
  "광주시",
  "대구시",
  "울산시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주도",
];

function generateAddress() {
  // return cities[Math.floor(Math.random() * cities.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const street = Math.floor(Math.random() * 100) + 1;

  return `${street} ${city}`;
}

console.log(generateAddress());
