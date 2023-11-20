const express = require('express');
const app = express();

const userRouter = require('./src/userRouter');
const productRouter = require('./src/productRouter');
const cartRouter = require('./src/cartRouter');

// 각종 라우터 추가
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Main')
});

const port = 3000;
app.listen(port, () => {
    console.log(`${port} 준비 완료`)
})