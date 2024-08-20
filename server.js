
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/search', async (req, res) => {
  const { query, page = 1 } = req.query;
  const CLIENT_ID = process.env.CLIENT_ID; 
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  
  try {
    const display = 50;
    const start = (page - 1) * display + 1;
    const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
      headers: {
        'X-Naver-Client-Id': CLIENT_ID,
        'X-Naver-Client-Secret': CLIENT_SECRET,

      },
      params: { query, display,start },
    });
    console.log('API 응답 데이터:', response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error('API 호출 실패:', error.message);
    console.error('에러 상세:', error); // 에러 객체를 출력
    res.status(500).send('API 호출 실패');
  }
});

app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
