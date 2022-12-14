// 일반적인 거스름돈 문제
//! 주어진 동전의 종류들로 만들 수 있는 모든 가짓수

let change = [1000, 500, 100, 50, 10, 5, 1] // 거스름돈 종류
let count = []; // 거스름돈 종류에 따른 개수

let money = 6759; // 손님이 지불한 돈

for(let x of change) {
    count.push(parseInt(money / x));
    money = money % x;
}

console.log(count);

// DP 문제
// 거스러줘야할 돈의 금액과, 거스름돈의 종류가 주어지며, 그안에서
// 종류를 얼만큼 선택하던 상관없이 거스러 줄 수 있는 모든 경우의 수를 구하는 문제

// EX)
// n = 4, c = [1, 2, 3]
// {1, 1, 1, 1}
// {1, 1, 2}
// {2, 2}
// {1, 3} - 총 4가지

function getWays(n, c) {
    let dp = Array(n + 1).fill(0);
    dp[0] = 1; // 1, 0, 0, 0, 0
    // 인덱스 0 은 항상 1 - 새로운 화폐가 등장할때마다 얘를 이용해서 해당 숫자를 카운팅함
    c.forEach((data) => {
        for(let i = data; i < n + 1; i++) {
            dp[i] += dp[i - data]; 
            // 점화식 - dp[i에 대해 거슬러 줄 수 있는 경우의 수] += dp[// - 지금 화폐의 종류]
            // dp[1] += dp[1 - 1] - 새로운 화폐가 등장했으니 인덱스0을 가져와 +1
            // dp[2] += dp[1] - 새로운 dp에 1만큼 앞에있던수를 더함 = 앞에서 카운트한 가짓수를 가져오는것
            // dp[3] += dp[2]
            // dp[4] += dp[3]
            // dp[5] += dp[4]

            // dp[2] += dp[2 - 2] - 새로운 화폐가 등장했으니 인덱스0을 가져와 +1
            // dp[3] += dp[1]
            // dp[4] += dp[2]
            
            // dp[3] += dp[3 - 3] - 새로운 화폐가 등장했으니 인덱스0을 가져와 +1
            // dp[4] += dp[1]
        }
    });
    return dp[n];
}

// 1,0,0,0,0

// 1을 이용해 나올 수 있는 가지수 - dp[i] += dp[i - 1]
// 0.1.2.3.4 - 줘야할 거스름돈
// 1,1,1,1,1 - dp[i]

// 1
// 1,1 - 1 + 1
// 1,1,1 - 1,1 + 1
// 1,1,1,1 - 1,1,1 + 1

// 1, 2을 이용해 나올 수 있는 가지수 - dp[i] += dp[i - 2]
// 0.1.2.3.4 - 줘야할 거스름돈
// 1,1,2,2,3 - dp[i]

// (1,1), (원래있던거에)2를 붙임 = (1,1) (2)
// (1,1,1) (원래있던거에)2를 붙임 = (1,1,1) (1,2)
// (1,1,1,1) (원래있던거에)2를 붙임 = (1,1,1,1) (1,1,2) (2,2)

// 1, 2, 3을 이용해 나올 수 있는 가지수 dp[i] += dp[i - 3]
// 0.1.2.3.4 - 줘야할 거스름돈
// 1,1,2,3,4 - dp[i]

// ~ (원래있던거에)3를 붙임 = (1,1,1) (1,2) (3)
// ~ (원래있던거에)3를 붙임 = (1,1,1,1) (1,1,2) (2,2) (1,3)
// ~

// 참고 - https://taesung1993.tistory.com/74