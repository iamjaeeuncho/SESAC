import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import readline from 'readline';

const csvOrderFilePath = 'order.csv';
const csvItemFilePath = 'item.csv';

const csvOutputPath = 'orderitem.csv';

async function fileReaderForId(csvFilePath) {
  return new Promise((resolve, reject) => {
    const lineReader = readline.createInterface({
      input: fs.createReadStream(csvFilePath),
      output: process.stdout,
      terminal: false,
    });

    let lineCount = 0;
    let selectedValue = null;

    lineReader.on('line', (line) => {
      if (lineCount === 0) {
        // Skip the header row (assuming it's present)
      } else {
        const row = line.split(',');
        const value = row[1];
        if (Math.random() < 1 / (lineCount + 1)) {
          selectedValue = value;
        }
      }

      lineCount++;
    });

    lineReader.on('close', () => {
      if (selectedValue) {
        resolve(selectedValue);
      } else {
        reject(new Error('선택된 값이 없습니다.'));
      }
    });
  });
}

async function createCSVFile() {
  const csvData = [['Num', 'Id', 'OrderId', 'ItemId']]; // 헤더행

  for (let i = 0; i <= 50000; i++) {
    const id = uuidv4();
    const orderId = await fileReaderForId(csvOrderFilePath);
    const itemId = await fileReaderForId(csvItemFilePath);

    csvData.push([i, id, orderId, itemId]);
  }

  const csvContent = csvData.map((row) => row.join(',')).join('\n');

  try {
    const writeStream = fs.createWriteStream(csvOutputPath, 'utf8');
    writeStream.write(csvContent);
    writeStream.end();
    console.log('orderitem.csv 파일이 성공적으로 생성되었습니다.');
  } catch (err) {
    console.error('파일을 생성하는 동안 오류가 발생했습니다.', err);
  }
}

createCSVFile();
