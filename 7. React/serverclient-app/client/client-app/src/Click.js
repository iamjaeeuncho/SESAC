function Click({ onButtonClick, onButtonReset }) {
    return (
        <div>
            <button onClick={onButtonClick}>Click me</button>
            <button onClick={onButtonReset}>Reset</button>
        </div>
    )
}

export default Click;