import { v4 as uuidv4 } from 'uuid';

// UUID 생성
let order_uuid = uuidv4();
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


// CSV 파일을 불러올 URL
var csvFileURL = 'store.csv';

// XMLHttpRequest 객체 생성
var xhr = new XMLHttpRequest();
xhr.open('GET', csvFileURL, true);

// CSV 파일 로드 완료 시 실행될 콜백 함수
xhr.onload = function () {
  if (xhr.status === 200) {
    var csvData = xhr.responseText; // CSV 파일 내용

    // CSV 데이터 파싱
    var lines = csvData.split('\n');
    var data = [];
    for (var i = 0; i < lines.length; i++) {
      var values = lines[i].split(',');
      data.push(values);
    }

    // 데이터 활용 또는 출력 예제
    console.log(data);

    // 이곳에서 데이터를 처리하거나 화면에 출력합니다.
  } else {
    console.error('CSV 파일을 불러오는 중 오류가 발생했습니다.');
  }
};

// 요청 보내기
xhr.send();
