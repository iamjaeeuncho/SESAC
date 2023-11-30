// const db = require('./final_database');
const Database = require('./final_database2');

async function main() {
    // db = new Database('mydb4.db')
    db = new Database(':memory:')
    
    try {
        await db.createTable();
    
        const newUserA = { username: 'iamjaeeuncho', email: 'iamjaeeuncho@sesac.com'};
        const newUserB = { username: 'iamjaeeuncho2', email: 'iamjaeeuncho2@sesac.com'};
        await db.insertUser(newUserA);
        await db.insertUser(newUserB);
    
        const changeUser = { id: 2, username: 'iamjaeeuncho222', email: 'iamjaeeuncho222@sesac.com' }
        await db.updateUser(changeUser);
    
        await db.readUser();
    
        const delUser = { id: 2 };
        await db.deleteUser(delUser);
    
        const delUser2 = { id: 6 };
        await db.deleteUser(delUser2);
    } catch (error) {
        console.error('에러발생: ', error);
    } finally {
        // 데이터베이스 연결 종료
        db.close();
    }
}

main();
