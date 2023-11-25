const express = require('express');
const nunjucks = require('nunjucks');
const fs = require('fs');
// const csv = require('csv-parser');
const csv = require('fast-csv');
const app = express();

// 눈적스 초기화
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'html')

const data = []
const fieldnames = [];

async function loadDataInToMemoty() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('data.csv', {encoding: 'utf8'})
      .pipe(csv.parse( { headers: true, trim: true }))
      .on('headers', (headers) => {
        fieldnames.push(...headers);
        // console.log(fieldnames);
      })
      .on('data', (row) => {
        // console.log(row)
        data.push(row);
      })
      .on('end', () => {
        console.log('파일 다 읽었음');
        resolve();
      })
      .on('error', (error) => {
        console.log('파일 읽기 오류', error)
        reject(error);
      })
  })
}

// 우리 서버 시작 코드
async function startServer() {
  await loadDataInToMemoty()

  app.get('/detail/:id', (req, res) => {
    const id = req.params.id;
      // console.log(data)
      // res.send(`도착한 ID: ${id}`);

      res.render('detail', {
        headers: fieldnames,
        row: data.find(person => person.Id === id),
      })
    });

  app.get('/search', (req, res) => {
    const searchName = req.query.name;
    const foundPeople = data.filter(people => people.Name.match(searchName));    
    
    const itemsPerPage = 10;
    let searchPage = req.query.page || 1;
    let searchStartIndex = (searchPage - 1) * itemsPerPage;
    let searchEndIndex = searchStartIndex + itemsPerPage;

    // 전체 페이지수 계산
    const searchTotalPages = Math.ceil(foundPeople.length / itemsPerPage);
    
    // 읽은 데이터 앞에 10개만 주기
    const searchCurrPageRows = foundPeople.slice(searchStartIndex, searchEndIndex);

    res.render('search', {
      headers: fieldnames,
      searchName: searchName,
      foundPeople: foundPeople,
      data: searchCurrPageRows,
      total_pages: searchTotalPages,
      page: parseInt(searchPage),
    });
  });

  app.get('/', (req, res) => {
    const itemsPerPage = 10;
    let startIndex;
    let endIndex;
    
    // 원하는 페이지로 이동
    // console.log(`index 요청 GET 파라미터: ${req.query.page}`)
    page = req.query.page || 1;
    startIndex = (page - 1) * itemsPerPage;
    endIndex = startIndex + itemsPerPage;

    // 전체 페이지수 계산
    const totalPages = Math.ceil(data.length / itemsPerPage);
    // console.log(`전체 데이터 개수는 ${data.length}이며, 
    //              페이지당 개수는 ${itemsPerPage}이고,
    //              전체 페이지 수는 ${totalPages}입니다`)

    // 읽은 데이터 앞에 10개만 주기
    const currPageRows = data.slice(startIndex, endIndex);

    res.render('index', {
      headers: fieldnames,
      data: currPageRows,
      total_pages: totalPages,
      page: parseInt(page),
    })

});
  
  // 서버 생성
  const port = 3000;
  app.listen(port, () => {
      console.log(`서버에 ${port}가 열려 있습니다.`)
  })
}

startServer()