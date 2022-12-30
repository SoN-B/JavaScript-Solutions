/**
 * 입력으로 받는 쿼리들은 숫자별로 종류가 있다.
 * 1 - enqueue
 * 2 - dequeue
 * 3 - print
 * 
 * 그 과정속 3번 종류일때, 출력했을때, 결과물이 맞아야함
 */

var lines;

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

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
