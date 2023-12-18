// import React from 'react' // React 17 이후부터 불필요
import { useState } from 'react';
import CounterResult from './CounterResult';

const Counter = (props) => {
    // console.log('Counter 호출, props:', props);

    const [ count, setCount ] = useState(props.a); // 초기값 0

    const onIncrease = () => {
        setCount(count + 1);
    }

    const onDecrease = () => {
        setCount(count - 1);
    }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={onIncrease}>+</button>
            <button onClick={onDecrease}>-</button>

            {/* 미션. 홀짝수를 출력하는 컴포넌트 CounterResult */}
            <CounterResult num={count}/>
        </div>
    )
}

export default Counter;