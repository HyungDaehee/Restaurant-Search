const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./src/db/User.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

app.get('/api/search', (req, res) => {
  const { query } = req.query;
  const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
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
      },
      timeout: 5000
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
          fetchData();
        }
      })
  }

  fetchData();
});

app.get("/auth/Kakao", async (req, res) => {
  let REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  let REDIRECT_URI = process.env.REACT_APP_KAKAO_LOGIN_REDIRECT_URI;


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

  // 토큰으로 사용자 정보 가져오기
  const accessToken = access_Token.data.access_token;
  console.log("access_Token", access_Token)

  const UserInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log("사용자 정보", UserInfo.data);
  const { id, kakao_account } = UserInfo.data;
  const nickname = kakao_account.profile.nickname || "No nickname";

  await mongoose
    .connect("mongodb+srv://gudeogml:3909@cluster0.dwgul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      { useNewUrlParser: true, useUnifiedTopology: true });

  const user = await User.findOneAndUpdate(
    { id: String(id) },
    { name: nickname, createdAt: new Date() },
    { upsert: true, new: true }
  );

  console.log("MongoDB에 유저 정보 저장됨:", user);
  res.json({ token: accessToken });
});










app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
