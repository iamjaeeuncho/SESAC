const express = require('express');
const router = express.Router();

// 사용자 기본 정보
router.get('/profile', (req, res) => {
    res.send('사용자 프로필')
})

// 사용자 프로필 조회
router.put('/profile', (req, res) => {
    res.send('사용자 프로필 생성')
})

router.post('/profile', (req, res) => {
    res.send('사용자 프로필 수정')
})

router.delete('/profile', (req, res) => {
    res.send('사용자 프로필 삭제')
})

router.get('/settings', (req, res) => {
    res.send('레디')
})

module.exports = router;