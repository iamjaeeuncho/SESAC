const express = require('express');
const router = express.Router();

// 라우터 체인
router.route('/')
    .get((req, res) => {
        res.send('장바구니 조회')
    })
    .post((req, res) => {
        res.send('장바구니 담기')
    })
    .put((req, res) => {
        res.send('장바구니 수정')
    })
    .delete((req, res) => {
        res.send('장바구니 삭제')
    });

module.exports = router;