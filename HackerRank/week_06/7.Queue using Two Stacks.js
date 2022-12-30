/**
 * 입력으로 받는 쿼리들은 숫자별로 종류가 있다.
 * 1 - enqueue 뒤에삽입
 * 2 - dequeue 앞에제거
 * 3 - print
 * 
 * 그 과정속 3번 종류일때, 출력했을때, 결과물이 맞아야함
 */

var lines;

// 스택 1개 - 큐 구현
function processData(input) {
    lines = input.split("\n");
    // shift();
    // push();
    
    let arr = [], string;
    for(let i = 1; i < lines.length; i++) {
        if(lines[i][0] === '1') {
            string = lines[i].split(' ');
            arr.push(string[1]);
        } else if(lines[i][0] === '2') {
            arr.shift();
        } else {
            console.log(arr[0]);
        }
    }
} 

// 스택 2개 - 큐 구현
// dequeue 시점 예비 스택에, 처음 들어온 값이 마지막에 들어가도록 모든 값을 다른 스택으로 옮긴 뒤 pop해줍니다. 
function processData(input) {
    lines = input.split("\n");
    // shift();
    // push();
    
    // arr2 - 입력받는 용도
    // arr1 - arr2의 값이 pop되어, 큐가 구현되는 용도
    let arr1 = [], arr2 = [], string;
    for(let i = 1; i < lines.length; i++) {
        if(lines[i][0] === '1') {
            string = lines[i].split(' ');
            arr2.push(string[1]);
        } else if(lines[i][0] === '2') {
            if(arr1.length === 0) while(arr2.length !== 0) arr1.push(arr2.pop());
            arr1.pop();
        } else {
            if(arr1.length === 0) console.log(arr2[0]);
            else console.log(arr1[arr1.length - 1]);
        }
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});

// 참고: https://velog.io/@wonhee010/Stack-2%EA%B0%9C%EB%A1%9C-Queue-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0 - 2개의 스택으로 큐를 구현하는 방법
// 참고: https://ryu-e.tistory.com/96 - 2개의 큐로 스택을 구현하는 방법