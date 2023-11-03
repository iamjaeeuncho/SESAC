const fs = require('fs');
const path = require('path');

const directoryPath ="../";

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


function checkFile(filePath) {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
  
      if (stats.isFile()) {
        console.log('이것은 파일입니다');
      } else if (stats.isDirectory()){
        console.log('이것은 디렉토리입니다');
      } else {
        console.log('파일도 디렉토리도 아닙니다');
      }
    });
  }
  

let file = checkFileSync(directoryPath);
console.log(file);


function checkFileSync(filePath) {
    const stats = fs.stat(filePath);

    if (stats.isFile()) {
        console.log('이것은 파일입니다');
    } else if (stats.isDirectory()){
        console.log('이것은 디렉토리입니다');
    } else {
        console.log('파일도 디렉토리도 아닙니다');
    }
}