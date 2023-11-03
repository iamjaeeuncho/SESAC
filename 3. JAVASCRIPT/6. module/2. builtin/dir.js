// 미션. 선생님 답
const fs = require('fs');
const path = require('path');
// const directoryPath ="../";
const directoryPath = process.cwd();

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.log('읽기 오류', err);
        return;
    }
    // console.log(files);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        console.log('파일:', filePath);
    });
})


// 미션. 현재 디렉토리에 있는 파일 출력

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('디렉토리 내 파일을 나열하는 중 에러가 발생했습니다:', err);
        return;
    }

    console.log('현재 디렉토리 내 파일 목록:');
    const stats = fs.statSync(directoryPath);

    files.forEach((file) => {
        console.log(file);
    });
});


// 미션. 디렉토리 구조를 트리 형식으로

function displayDirectoryStructure(directoryPath, indent = 0) {
    const files = fs.readdirSync(directoryPath);
  
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
  
      // 들여쓰기를 사용하여 폴더와 파일을 구분하여 출력
      const prefix = ' '.repeat(indent * 2);
      if (stats.isDirectory()) {
        console.log(`${prefix} └─ ${file}`);
        displayDirectoryStructure(filePath, indent + 1); // 재귀적으로 호출하여 하위 폴더 검사
      } else {
        console.log(`${prefix} └─ ${file}`);
      }
    });
  }
  
  // 디렉토리 구조 표시 함수 호출
  console.log(`디렉토리 구조 (${directoryPath}):`);
  displayDirectoryStructure(directoryPath);