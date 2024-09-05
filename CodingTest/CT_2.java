import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * @introduce
 *
 * 토너먼트 방식의 경기에서 각 플레이어가 마지막으로 참가한 라운드를 결정
 * N명의 플레이어가 있으며, 각 플레이어는 고유한 번호와 실력 수준을 가짐
 *
 * 1. 플레이어는 0번 인덱스부터 N - 1번 인덱스까지 있음
 * 2. 각 플레이어의 실력은 skills[K]로 표현
 * 3. 두 플레이어가 경기하면 더 높은 실력을 가진 플레이어가 승리
 * 4. 이 과정을 반복하여 마지막 승자가 결정될 때까지 진행
 *
 * 목표: 각 플레이어가 마지막으로 탈락한 라운드를 구하는 것
 */
class Solution {
    public int[] solution(int[] skills) {
        int n = skills.length;
        int rounds = (int) (Math.log(n) / Math.log(2));
        int[] results = new int[n];
        int[] currentRoundSkills = Arrays.copyOf(skills, n);

        // 대회 진행
        for (int round = 1; round <= rounds; round++) {
            for (int i = 0; i < n; i += 2) {
                if (currentRoundSkills[i] > currentRoundSkills[i + 1]) {
                    results[skillsToIndex(skills, currentRoundSkills[i + 1])] = round;
                    currentRoundSkills[i / 2] = currentRoundSkills[i];
                } else {
                    results[skillsToIndex(skills, currentRoundSkills[i])] = round;
                    currentRoundSkills[i / 2] = currentRoundSkills[i + 1];
                }
            }

            // 다음 라운드 선수 수 반으로 줄이기
            n /= 2;
        }


        // 결승에 간 선수도 라운드 수 채우기
        results[skillsToIndex(skills, currentRoundSkills[0])] = rounds;

        return results;
    }

    private int skillsToIndex(int[] skills, int target) {
        for (int i = 0; i < skills.length; i++) {
            if (skills[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
