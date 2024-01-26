const axios = require("axios");

// 네이버 환율 정보 API
const base_url =
  "https://m.search.naver.com/p/csearch/content/qapirender.nhn?key=calculator&pkid=141&q=환율&where=m";

const usd_url1 =
  base_url + "&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=1";
const usd_url2 =
  base_url + "&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=10";
const usd_url3 =
  base_url + "&u1=keb&u6=standardUnit&u7=0&u3=USD&u4=KRW&u8=down&u2=100";

const jpy_url =
  base_url + "&u1=shb&u6=standardUnit&u7=0&u3=JPY&u4=KRW&u8=down&u2=100";

axios.get(jpy_url).then((response) => {
  console.log(response.data);
  console.log(response.data.country[1].value);
});
