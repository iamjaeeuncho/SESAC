-- 사용자 테이블 생성
CREATE TABLE IF NOT EXISTS users (
    userid INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
);

-- 초기 사용자 추가
INSERT INTO users (id, username, password) VALUES 
    (1, 'user1', 'password1'),
    (2, 'user2', 'password2');


-- 상품 테이블 추가
CREATE TABLE IF NOT EXISTS products (
    productid INTEGER PRIMARY KEY,
    name TEXT,
    price INTEGER
)

-- 초기 상품 추가
INSERT INTO products (id, name, price) VALUES
    (1, 'Product 1', 2000),
    (2, 'Product 2', 3000),
    (3, 'Product 3', 1500);


-- 도서 테이블 추가
CREATE TABLE IF NOT EXISTS books (
    bookid INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT,
    genre TEXT
);

-- 초기 도서 목록 추가
INSERT INTO books (id, title, author, genre) VALUES
    (1, 'Book 1', 'Author 1', 'Fiction'),
    (2, 'Book 2', 'Author 2', 'Non-Fiction'),
    (3, 'Book 3', 'Author 3', 'Mystery');