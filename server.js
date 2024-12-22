const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/search', (req, res) => {
    const { query } = req.query;
    const KAKAO_API_KEY = '6116026697d7c84da46212493aef754b';
    const MAX_PAGE = 40;
    const itemsPerPage = 15;
    const allResults = [];

    let page = 1;
    function fetchData() {
        axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`
            },
            params: {
                query,
                category_group_code: 'FD6',
                size: itemsPerPage,
                page: page,
            }
        })
        .then(response => {
            const results = response.data.documents.map(restaurant => ({
                ...restaurant,
                page: page,
            }));
            allResults.push(...results);
            if (results.length < itemsPerPage || page >= MAX_PAGE) {
                res.json(allResults);
            } else {
                page++;
                fetchData();  // 다음 페이지로 재귀 호출
            }
        })
    }

    fetchData();  // 초기 데이터 요청
});

app.get("/auth/Kakao", (req, res) => {
  let REST_API_KEY = "6116026697d7c84da46212493aef754b";
  let REDIRECT_URI = "http://localhost:3000/Login";

  let code = req.query.code;
  console.log("인가 코드:", code);

  if (!code) {
    console.log("인가 코드가 없습니다.");
  }

  axios.post("https://kauth.kakao.com/oauth/token", null, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    },
  })
  .then(response => {
    console.log("카카오 API 응답 데이터:", response.data);
    res.status(200).json(response.data);
  })

});












app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
