const CounterResult = ({ num }) => {
    let result ;
    
    if (num % 2 === 0) {
        result = "짝수"
    } else {
        result = "홀수"
    }

    return (
        <div>
            {result}
            {/* { num % 2 === 0 ? "짝수" : "홀수" } */}
        </div>
    )  
}

export default CounterResult;