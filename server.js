const express = require('express');
const axios = require('axios');
const cors = require('cors');
const jwt = require('jsonwebtoken');
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

app.get("/auth/Kakao", async(req, res) => {
  let REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  let REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI_LOGIN;

  let code = req.query.code;
  console.log("인가 코드:", code);

  if (!code) {
    console.log("인가 코드가 없습니다.");
  }

  const access_Token = await axios.post("https://kauth.kakao.com/oauth/token", null, {
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
  const accessToken = access_Token.data.access_token;
  console.log("access_Token", access_Token)

  const UserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("사용자 정보", UserInfo.data);
  const { id, kakao_account } = UserInfo.data;
  const nickname = kakao_account.profile.nickname;

  const jwtSecret = process.env.JWTSECRETKEY;

  const jwtToken = jwt.sign({id, nickname}, jwtSecret, { expiresIn: "1h" })
  console.log("JWT Token:", jwtToken);
  res.json({token :jwtToken });
});





app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
