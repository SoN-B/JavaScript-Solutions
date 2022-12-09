/**
 * 배열을 입력받아, 중앙값을 찾는 문제 (배열은 항상 홀수개의 요소로 들어온다.)
 */

"use strict";

function findMedian(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });

    return arr[parseInt(arr.length / 2)];
    // parseInt() -> 만약 실수를 담고 있던 데이터를 전달해주면 소수점 아래는 날려버리고 정수만 남겨준다.
    // 추가 -> 문자형 데이터 내에 숫자 말고 다른 것을 같이 갖고 있을 때는 숫자만 빼온다.
    // 예시) parseInt("170cm") -> 170

    // parseFloat() ->  실수형 데이터로 변환
}
