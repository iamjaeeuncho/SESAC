const axios = require("axios");

const base_url = "https://m.search.naver.com/p/csearch/content/qapirender.nhn";

const searchLyric = async (query) => {
  const response = await axios.get(base_url, {
    params: {
      where: "m",
      key: "LyricsSearchResult",
      pkid: "519",
      u1: 1,
      u2: 3,
      u3: "0",
      u4: "1",
      q: "가사검색" + query,
    },
  });
  console.log(response.data);
};

searchLyric("낮에는 따사로운");
