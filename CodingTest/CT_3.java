import java.util.HashSet;
import java.util.Set;

/**
 * @introduce
 *
 * 문자열로 주어진 숫자에서 하나의 숫자만 변경하여 3으로 나누어 떨어질 수 있는 경우의 수
 *
 * 접근방식: 각 자리의 숫자를 0부터 9까지 바꿔가며 3으로 나누어 떨어지는지 확인
 */
class Solution {
    public int solution(String S) {
        Set<Integer> result = new HashSet<>();

        // 원래 숫자가 3의 배수인지 확인
        int originalNum = Integer.parseInt(S);
        if (originalNum % 3 == 0) {
            result.add(originalNum);
        }

        // 각 자리 숫자를 0부터 9까지로 변경하여 검사
        for (int i = 0; i < S.length(); i++) {
            char originalChar = S.charAt(i);
            for (char c = '0'; c <= '9'; c++) {
                if (c != originalChar) {
                    String newNumber = S.substring(0, i) + c + S.substring(i + 1);
                    int num = Integer.parseInt(newNumber);
                    if (num % 3 == 0) {
                        result.add(num);
                    }
                }
            }
        }

        return result.size();
    }
}