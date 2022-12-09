//! 주어진 블록으로 만들 수 있는 2 * n의 가짓수
// 2×n 타일링 - 01 (https://www.acmicpc.net/problem/11726)
let d = [];
for(let x = 0; x < 100; x++) d.push(0);

function dp(x) {
    if(x === 1) return 1;
    if(x === 2) return 2;
    if(d[x] !== 0) return d[x]; // 계산된 적이 있다면 해당값 리턴
    return d[x] = dp(x - 1) + dp(x - 2); // 전에 계산한 적이 없다면 해당값 저장
}

console.log(dp(50));

// 2×n 타일링 - 02 (https://www.acmicpc.net/problem/11727)
// 풀이참고 - (https://maramarathon.tistory.com/42)
let p = [];
for(let x = 0; x < 100; x++) p.push(0);

function dp(x) {
    if(x === 1) return 1;
    if(x === 2) return 3;
    if(p[x] !== 0) return p[x]; // 계산된 적이 있다면 해당값 리턴
    return p[x] = dp(x - 1) + 2 * dp(x - 2); // 전에 계산한 적이 없다면 해당값 저장
}

console.log(dp(50));