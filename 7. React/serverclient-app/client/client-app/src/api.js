import axios from 'axios';


const instance = axios.create({
    // 환경변수(.env)로부터도 읽어올 수 있음
    baseURL: process.env.REACT_APP_API_URL,   
    // 요청 이후 언제까지 기다릴건지
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instance;
