const express = require('express');
const router = express.Router();

// 상품 기본 정보
router.get('/', (req, res) => {
    res.send('제품 기본 정보')
})

// 제품 상세 정보
router.get('/detail', (req, res) => {
    res.send('제품 상세 정보')
})

// 제품 리스트 조회
router.get('/list', (req, res) => {
    res.send('제품 리스트')
})

module.exports = router;