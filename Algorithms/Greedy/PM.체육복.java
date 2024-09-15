import java.util.Arrays;

class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        // 정렬
        Arrays.sort(lost);
        Arrays.sort(reserve);

        // -1 값은 해당 학생이 체육복을 빌려줄 수 없거나 이미 체육복을 빌린 상태임을 나타내기 위해 사용됩니다.

        // 여벌 체육복을 가져온 학생이 도난당한 경우, 여벌 체육복이 하나만 남게 되어 다른 학생에게 체육복을 빌려줄 수 없습니다.
        for (int i = 0; i < lost.length; i++) {
            for (int j = 0; j < reserve.length; j++) {
                if (lost[i] == reserve[j]) {
                    lost[i] = -1;
                    reserve[j] = -1;
                    break;
                }
            }
        }

        // 체육복을 빌려줄 수 있는 경우 처리
        // lost 배열의 학생이 체육복을 빌릴 수 있는지 확인하고, 빌릴 수 있다면 해당 학생과 체육복을 빌려준 학생을 표시합니다.
        for (int i = 0; i < lost.length; i++) {
            if (lost[i] == -1) continue;
            for (int j = 0; j < reserve.length; j++) {
                if (reserve[j] == -1) continue;
                if (reserve[j] == lost[i] - 1 || reserve[j] == lost[i] + 1) {
                    reserve[j] = -1;
                    lost[i] = -1;
                    break;
                }
            }
        }

        // 체육수업을 들을 수 있는 학생 수 계산
        int answer = n;
        for (int i : lost) {
            if (i != -1) answer--;
        }

        return answer;
    }
}