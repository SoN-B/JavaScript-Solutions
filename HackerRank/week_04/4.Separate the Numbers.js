/**
 * 숫자로 이루어진 string을 입력받아, 각 숫자가 연속되는지 판별하는 문제
 * 
 * Ex) 91011 -> 9 10 11 YES
 */
'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/**
 * 프로세스) 
 * 자릿수를 1 ~ 32까지 늘려가며 첫요소를 지정하고, 현재숫자 + 1 == 다음숫자가 성립하는지
 * 판별후, flag가 false가 아닐때, YES 반환
 * 
 * @param {*} s 91011, 1234, ...
 * @returns 
 */
function separateNumbers(s) {
    const arr = [...s];
    let first_digit, flag = true;
    
    for(let i = 1; i <= arr.length / 2; i++) { // 자릿수를 위해 문제 범위와 같은 1 ~ 32 (즉, s 길이의 반을 넘을 수 없다.)
        first_digit = arr.slice(0,i); // 첫 요소 자릿수에 맞춰 지정
        if(first_digit[0] == 0) flag = false; // 01, 02 방지를 위해 첫 요소가 0인 수 제거
        let now = BigInt(first_digit.join("")); // 실제 숫자로 합치기 ['1', '2'] = 12

        for(let j = i; j < arr.length ; j++){
            let numDigit = (now + 1n).toString().length; // 99 -> 100 처럼 자리수가 바뀔때의 자리수 판별
            if(now + 1n !== BigInt(arr.slice(j,j + numDigit).join(""))) flag = false; // (현재숫자 + 1 === 다음숫자) 판별
            now = BigInt(arr.slice(j,j + numDigit).join("")); // 현재숫자 = 다음숫자
            j = j + numDigit; // 현재숫자 idx = 다음숫자 idx
            j--; // 다음 for문의 j++방지
        }

        if(flag) {
            console.log(`YES ${first_digit.join("")}`);
            return;
        }
        flag = true;
    }
    
    console.log("NO");
    return;
}

// if) 91011 - 다른풀이인데, 본인처럼 자리수대로 나눠 각숫자를 비교하지 않고, 더해가고 그 끝에서 같은지 판별하는게 충격적
// public class SeparatetheNumbers {
//     static void separateNumbers(String s) {
//     String subStr = "";
//     boolean isVaild = false;

//     for (int i = 1; i <= s.length() / 2; i++) {
//         subStr = s.substring(0, i); // 9(문자)
//         Long num = Long.parseLong(subStr); // 9(현재숫자)

//         String vaildStr = subStr; // 문자들을 더해나갈 판별str
//         while (vaildStr.length() < s.length()) { // 길이가 같거나 판별이 커질때 break
//             vaildStr += Long.toString(++num); // 현재숫자에 1씩 더해가며, 문자열 파싱후 판별문자열에 삽입
//             // validStr = 910
//             // validStr = 91011 
//         }

//         if (s.equals(vaildStr)) {
//             isVaild = true;
//             break;
//         }
//     }
//     System.out.println(isVaild ? "YES " + subStr : "NO");
// }

function main() {
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        separateNumbers(s);
    }
}