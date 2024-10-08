const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { BiRestaurant } = require('react-icons/bi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/search', async (req, res) => {
    const { query } = req.query;
    const KAKAO_API_KEY = process.env.KAKAO_API_KEY;
    const MAX_PAGE = 7;
    const itemsPerPage = 15;
    const allResults = [];

    try {
        for (let page = 1; page <= MAX_PAGE; page++) {
            const response = await axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_API_KEY}`
                },
                params: {
                    query,
                    category_group_code: 'FD6',
                    size: itemsPerPage,
                    page: page,
                }
            });

            const results = response.data.documents.map(restaurant => ({
                ...restaurant,
                page: page,
            }));
            allResults.push(...results); 
            if (results.length < itemsPerPage) {
                break;
            }
        }

        console.log('API 응답 데이터:', allResults);
        res.json(allResults);
    } catch (error) {
        console.error('API 호출 실패:', error.message);
        res.status(500).send('API 호출 실패');
    }
});

app.listen(PORT, () => {
    console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
