const express = require('express');
const path = require('path');

const userRouter = require('./routers/userRoute');
const userdetailRouter = require('./routers/userdetailRoute');
const searchRouter = require('./routers/searchRoute')
const orderRouter = require('./routers/orderRoute')
const orderdetailRouter = require('./routers/orderdetailRoute')
const orderitemRouter = require('./routers/orderitemRoute')
const itemRouter = require('./routers/itemRoute')
const itemdetailRouter = require('./routers/itemdetailRoute')
const storeRouter = require('./routers/storeRoute')
const storedetailRouter = require('./routers/storedetailRoute')
const storedailyRouter = require('./routers/storedailyRoute')

const app = express();
const port = 3000;

app.use((req, res, next) => {
  console.log(req.url);
  next();
})

// Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'utils')));

// Main Page
// app.get('/', (req, res) => {
//     res.redirect('/user');
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'user.html'));
});

// Router
app.use("/user", userRouter);
app.use("/api/user", userRouter);

app.use("/userdetail", userdetailRouter);
app.use("/api/userdetail", userdetailRouter);

app.use("/search", searchRouter)
app.use("/api/search", searchRouter)

app.use("/order", orderRouter)
app.use("/api/order", orderRouter)

app.use("/orderdetail", orderdetailRouter)
app.use("/api/orderdetail", orderdetailRouter)

app.use("/orderitem", orderitemRouter)
app.use("/api/orderitem", orderitemRouter)

app.use("/item", itemRouter)
app.use("/api/item", itemRouter)

app.use("/itemdetail", itemdetailRouter)
app.use("/api/itemdetail", itemdetailRouter)

app.use("/store", storeRouter)
app.use("/api/store", storeRouter)

app.use("/storedetail", storedetailRouter)
app.use("/api/storedetail", storedetailRouter)

app.use("/storedaily", storedailyRouter)
app.use("/api", storedailyRouter)

// Server Port
app.listen(port, () => {
  console.log(`서버가 ${port}에서 실행 중입니다`);
});