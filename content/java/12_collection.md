### 📦 12장. 제네릭과 컬렉션

데이터를 효율적으로 저장하고 관리하기 위한 자료구조 클래스 모음입니다. **제네릭(Generics)**을 사용하여 컴파일 타임에 타입 안정성을 보장합니다.

#### 📌 핵심 특징

- 제네릭 `<T>`: 다양한 타입을 하나로 일반화. 강제 형변환 방지

- `List (ArrayList)`: 순서 보장, 중복 허용. 배열 기반의 빠른 조회

- `Set (HashSet)`: 순서 없음, 중복 불가. 집합 연산에 특화

- `Map (HashMap)`: Key-Value 쌍 구조. Key는 중복 불가로 빠른 검색

#### 💼 실무 활용 예시

- List: 쇼핑몰의 상품 목록, 게시판의 게시글 목록 조회

- Set: 오늘의 방문자 수 집계 (IP 주소 중복 제거), 로또 번호 생성

- Map: 회원 ID를 Key로 사용하는 세션(Session) 캐시 관리

- Comparable: 상품 가격순, 리뷰 별점순 커스텀 정렬 구현

#### 💻 코드 예시 (CollectionTest.java)
```java
import java.util.*;

public class CollectionTest {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("Apple"); list.add("Apple");
        System.out.println("List 출력: " + list);
        
        Set<Integer> set = new HashSet<>(Arrays.asList(1, 2, 2, 3, 4));
        System.out.println("Set (중복제거): " + set);
        
        Map<String, String> map = new HashMap<>();
        map.put("admin", "관리자");
        System.out.println("Map 검색: " + map.get("admin"));
    }
}
```