const exp = require('constants');
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// req.body에 저 내용을 파싱해서 채워준다

app.use(session({
    secret: 'abcd1234',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(path.join(__dirname, 'public')))

const products = [
    { id: 1, name: 'Product 1', price: 2000 },
    { id: 2, name: 'Product 2', price: 3000 },
    { id: 3, name: 'Product 3', price: 1500 },
];

app.get('/products', (req, res) => {
    // console.log('상품정보요청')
    res.json(products);
    console.log('Session Info: ', req.session);
})

app.get('/cart', (req, res) => {
    // console.log(req.session)
    const cart = req.session.cart || [];
    console.log('Session Info: ', req.sessionStore.sessions);
    res.json(cart)
})

app.post('/add-to-cart/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);

    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: '상품을 찾을 수 없습니다' })
    }

    const cart = req.session.cart || [];
    // 선택한 상품을 카트에 담기
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price
    })

    console.log(cart);
    req.session.cart = cart;
    res.json({ message: '상품이 장바구니에 추가되었습니다.', cart })
})


app.listen(port, () => {
    console.log(`서버 ${port} is ready.`)
})
