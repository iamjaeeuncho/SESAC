import './App.css';
import Container from './Container';
import Counter from './Counter';

function App() {
  const number = 5;

  const couterProps = {
    a: 1,
    b: 2,
    c: 3,
    num: number,
  }

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <h1>안녕 리액트</h1>
          <Counter {...couterProps}/>
        </Container>
        <Container>
          <h1>안녕 리액트</h1>
          <Counter {...couterProps}/>
        </Container>
        <Container>
          <h1>안녕 리액트</h1>
          <Counter {...couterProps}/>
        </Container>
      </header>
    </div>
  );
}

export default App;
