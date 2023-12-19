import './App.css';
import { useState, useEffect } from 'react';
import api from './api';
import Click from './Click'
import Hello from './Hello';

function App() {

  // useState는 동적으로 관리되는 데이터 처리
  const [ data, setData ] = useState([]);
  const [ count, setCount ] = useState(0);

  // useEffect는 데이터 가져오기위해 사용
  useEffect(() => {
    // Express로부터 데이터 가져오기
    // fetch('http://localhost:5000/api/data')
    //   .then((response) => response.json())
    //   .then((data) => setData(data.message))
    //   .catch((error) => console.error('Error fetching data:', error))

    api.get('/api/data')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('에러:', error)
      })
  }, []) // 의존성 변수: 해당 값이 변경될때 자동으로 요청해서 화면에 렌더링하기 위해서

  const handleButtonClick = () => {
    setCount(count + 1)
  }

  const handleResetClick = () => {
    setCount(0)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Hello/>
        <h1>React + Express 통합 앱</h1>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        <Click onButtonClick={handleButtonClick} onButtonReset={handleResetClick}/>
        <p>마우스 클릭 횟수는 {count}입니다</p>
      </header>
    </div>
  );
}

export default App;
