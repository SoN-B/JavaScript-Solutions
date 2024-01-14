package CodingTest;

import java.util.HashSet;
import java.util.Set;

// N = 행의 갯수
// S = 예약된 자리 정보 (Ex. S = "1A 2F 1C" -> 1행 A열, 2행 F열, 1행 C열이 예약되어있다는 의미)
// 비행기 좌석정보: ABC DEFG HJK (I는 없음)
// BCDE, DEFG, FGHJ 자리가 비어있으면 4인 가족이 앉을 수 있다.

// 답: 최대 몇 가족이 앉을 수 있는가?
// 참고: 한 행에 2가족이 앉을 수 없다.
public class CT_4인가족_예약가능_자리_체크 {
  public static void main(String[] args) {
    System.out.println(maxFamilyAllocation(2, "1A 2F 1C")); // 출력: 2
    System.out.println(maxFamilyAllocation(1, "")); // 출력: 2
  }

  public static int maxFamilyAllocation(int N, String S) {
    Set<String> reservedSeats = new HashSet<>();
    String[] reservedSeatsArray = S.split(" ");

    for (String seat : reservedSeatsArray) {
      reservedSeats.add(seat);
    }

    int maxFamilies = 0;

    for (int row = 1; row <= N; row++) {
      String[] seats = { "BCDE", "DEFG", "FGHJ" };

      for (int i = 0; i < seats.length; i++) {
        String familySeats = seats[i];
        boolean isFamilyAvailable = true;

        for (int j = 0; j < familySeats.length(); j++) {
          String currentSeat = row + Character.toString(familySeats.charAt(j));
          if (reservedSeats.contains(currentSeat)) {
            isFamilyAvailable = false;
            break;
          }
        }

        if (isFamilyAvailable) {
          maxFamilies++;
          for (int j = 0; j < familySeats.length(); j++) {
            String currentSeat = row + Character.toString(familySeats.charAt(j));
            reservedSeats.add(currentSeat); // 가족이 앉은 자리를 예약된 자리로 추가
          }
        }
      }
    }
    return maxFamilies;
  }
}
