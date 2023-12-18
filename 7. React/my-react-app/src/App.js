import './App.css';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';

function App() {
  let name = 'Jen';

  const style = {
    h2: {
      color: 'red'
    },
    my_text: {
      color: 'green'
    }
  }

  return (
    // 하나의 컴포넌트는 하나의 최상위의 컴포넌트만
    <div className="App">
      <MyHeader/> {/* <MyHeader></MyHeader> */}
        <header className='App-header'>
          <h1>HELLOW~</h1>
        </header>
          <h2 style={style.h2}>{name}</h2>
          <p style={style.my_text}>Welcome to React World!</p>
      <MyFooter/>
    </div>
  );
}

export default App;
