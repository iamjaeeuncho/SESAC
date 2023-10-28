function number (value) {
    document.getElementById('status').value += value;
}

function plus(){
    document.getElementById('status').value += '+';
}

function minus(){
    document.getElementById('status').value += '-';
}

function multiply(){
    document.getElementById('status').value += '*';
}

function divide(){
    document.getElementById('status').value += '/';
}

function total(){
    let result = document.getElementById('status').value;    // 전체값 가져옴
    document.getElementById('status').value = eval(result);  // eval 함수로 계산
    
}
function remove(){
    document.getElementById('status').value = "";
}