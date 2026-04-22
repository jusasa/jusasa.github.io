📝 Java 실습 시험 대비 30제 (Ch.11 ~ Ch.13)

본 실습 문제는 자바의 주요 개념을 코드로 직접 구현하며 이해도를 높이기 위해 제작되었습니다. 각 문제의 요구사항에 맞게 코드를 작성해 보세요.

🎯 [11장] java.lang 기본 클래스 (10문제)

문제 1. equals() 메서드 오버라이딩

요구사항: Student 클래스를 생성하고 studentId(학번, int), name(이름, String) 필드를 만드세요. 두 학생 객체의 studentId가 같다면 equals() 메서드가 true를 반환하도록 오버라이딩하세요.

문제 2. hashCode() 메서드 오버라이딩

요구사항: 문제 1에서 만든 Student 클래스에서 equals()가 true일 때, 두 객체가 동일한 해시코드 값을 반환하도록 hashCode() 메서드도 함께 오버라이딩하세요.

문제 3. toString() 메서드 오버라이딩

요구사항: Book 클래스를 생성하고 title, author 필드를 만드세요. 객체를 출력했을 때 주소값이 아닌 "책제목: [title], 저자: [author]" 형식의 문자열이 출력되도록 toString()을 오버라이딩하세요.

문제 4. String 객체의 불변성 확인

요구사항: "Hello" 문자열을 가진 String 변수 str을 생성하고, str.concat(" World")를 실행하세요. 그 후 str을 출력해보고 원본 데이터가 변했는지 확인하는 코드를 작성하세요.

문제 5. StringBuilder 활용

요구사항: StringBuilder를 사용하여 1부터 100까지의 숫자를 공백(" ")으로 구분하여 단일 문자열로 연결하는 반복문을 작성하고, 결과를 출력하세요. (String으로 결합하는 것보다 메모리 효율이 좋음을 상기할 것)

문제 6. Wrapper 클래스 (문자열 $\rightarrow$ 정수 변환)

요구사항: "12345"라는 문자열을 Integer 클래스의 정적 메서드를 사용하여 정수형(int)으로 변환한 뒤, 10을 곱한 결과를 출력하는 코드를 작성하세요.

문제 7. Wrapper 클래스와 오토박싱(AutoBoxing)

요구사항: Object 타입 매개변수를 받는 메서드 printObject(Object obj)를 만드세요. 이 메서드에 정수 100과 실수 3.14를 전달하여 자동으로 래퍼 클래스로 변환(AutoBoxing)되는지 확인하는 코드를 작성하세요.

문제 8. Class 클래스를 이용한 동적 로딩

요구사항: Class.forName() 메서드를 사용하여 "java.util.ArrayList" 클래스의 메타 정보를 로드하고, 로드된 클래스의 이름(getName)을 출력하는 코드를 작성하세요. (ClassNotFoundException 예외 처리가 필요합니다.)

문제 9. 객체 복제 clone() 구현

요구사항: Point 클래스(x, y 필드)를 만들고 Cloneable 인터페이스를 구현하세요. clone() 메서드를 재정의하여 인스턴스의 값을 복사한 새로운 Point 객체를 생성하는 코드를 작성하세요.

문제 10. String 주요 메서드 실습

요구사항: 문자열 "  Java Programming  "이 주어졌을 때, 양쪽 공백을 제거하고(trim 또는 strip), 모든 문자를 대문자로 변환(toUpperCase)하여 반환하는 코드를 한 줄로(메서드 체이닝) 작성하세요.

🎯 [12장] 제네릭과 컬렉션 프레임워크 (10문제)

문제 11. 제네릭 클래스 구현

요구사항: 어떤 타입의 객체든 담을 수 있는 제네릭 클래스 Box<T>를 생성하세요. 객체를 넣는 set(T item)과 빼내는 get() 메서드를 구현하고, String과 Integer를 담아 테스트하세요.

문제 12. 타입 제한 제네릭 (extends)

요구사항: Number 클래스를 상속받는 타입만 사용할 수 있는 제네릭 클래스 MathBox<T extends Number>를 생성하세요. 내부 필드의 값을 doubleValue()로 변환하여 출력하는 메서드를 구현하세요.

문제 13. ArrayList 기본 활용

요구사항: ArrayList<String>을 생성하고 "Apple", "Banana", "Cherry"를 추가하세요. for-each 문을 사용하여 모든 요소를 순차적으로 출력하는 코드를 작성하세요.

문제 14. HashSet을 이용한 중복 제거

요구사항: 정수형 배열 [1, 2, 2, 3, 4, 4, 5]가 있습니다. 이 배열의 요소들을 HashSet<Integer>에 담아 자동으로 중복을 제거한 뒤, 요소의 총 개수를 출력하세요.

문제 15. 사용자 정의 객체와 HashSet

요구사항: Member 클래스(id, name)를 만들고, HashSet<Member>에 동일한 id와 name을 가진 객체 2개를 넣었을 때 사이즈가 1이 되도록 equals()와 hashCode()를 재정의하세요.

문제 16. HashMap 자료구조 활용

요구사항: HashMap<String, String>을 생성하여 단어장(사전)을 만드세요. "apple"->"사과", "grape"->"포도"를 넣고, keySet()을 활용하여 등록된 모든 영단어와 한글 뜻을 출력하세요.

문제 17. Comparable 인터페이스 정렬

요구사항: Employee 클래스(사번, 이름)를 생성하고 Comparable<Employee>를 구현하세요. 사번을 기준으로 오름차순 정렬되도록 compareTo()를 재정의하고, TreeSet에 담아 정렬됨을 확인하세요.

문제 18. Comparator를 활용한 커스텀 정렬

요구사항: 문제 17의 Employee 클래스를 이번에는 '이름(문자열)'을 기준으로 내림차순 정렬하고 싶습니다. Comparator<Employee>를 구현하는 익명 객체를 만들어 TreeSet 생성자에 주입하세요.

문제 19. LinkedList와 큐(Queue) 동작

요구사항: LinkedList<String> 객체를 생성하고, 큐의 원리(FIFO)를 적용하여 메시지를 삽입(offer)하고 순차적으로 꺼내며 삭제(poll)하는 시뮬레이션 코드를 작성하세요.

문제 20. Iterator를 이용한 안전한 삭제

요구사항: ArrayList<Integer>에 1부터 5까지 담습니다. Iterator를 사용하여 리스트를 순회하면서, 짝수(2, 4)를 발견하면 iterator.remove()를 이용해 삭제한 뒤 남은 리스트를 출력하세요.

🎯 [13장] 내부 클래스, 람다식, 스트림, Optional (10문제)

문제 21. 인스턴스 내부 클래스 생성

요구사항: 외부 클래스 Computer 내부에 CPU라는 내부 클래스를 생성하세요. 메인 메서드에서 Computer 객체를 먼저 생성한 뒤, 이를 이용해 CPU 객체를 생성하고 동작시키는 코드를 작성하세요.

문제 22. 익명 내부 클래스 구현

요구사항: Runnable 인터페이스를 익명 내부 클래스로 즉석에서 구현하여, Thread 객체의 생성자에 넘기고 "스레드 실행"이라는 문구를 출력하게 하세요.

문제 23. 함수형 인터페이스와 람다식

요구사항: 두 정수를 매개변수로 받아 더 큰 값을 반환하는 추상 메서드를 가진 함수형 인터페이스 MaxNumber를 정의(@FunctionalInterface 사용)하고, 람다식 (x, y) -> ...으로 구현해 보세요.

문제 24. 스트림 API: 리스트 생성 및 순회

요구사항: Arrays.asList() 또는 List.of()를 사용하여 1부터 10까지 정수가 담긴 리스트를 만들고, 스트림(stream())과 forEach()를 사용하여 람다식으로 모든 요소를 한 줄씩 출력하세요.

문제 25. 스트림 API: filter

요구사항: 문자열 리스트 ["Java", "Python", "JavaScript", "C", "C++"]에서, "Java"라는 글자가 포함된(contains) 요소들만 스트림의 filter()를 이용해 추출하고 출력하세요.

문제 26. 스트림 API: map

요구사항: 정수 리스트 [1, 2, 3, 4, 5]의 모든 요소에 각각 10을 곱한 새로운 형태의 데이터로 변환하고 싶습니다. 스트림의 map()을 이용하여 변환한 뒤 리스트 형태로 출력하세요.

문제 27. 스트림 API: reduce

요구사항: 정수 리스트 [10, 20, 30, 40]이 주어졌습니다. 스트림의 reduce() 연산을 사용하여 모든 요소의 합(sum)을 구하는 누적 연산 코드를 작성하세요. (초기값 0 부여)

문제 28. 스트림 API: 객체 리스트 다루기

요구사항: Product 클래스(상품명, 가격) 리스트가 있습니다. 스트림을 사용하여 '가격이 5000원 이상인 상품들의 이름만' 문자열 리스트(List<String>)로 수집(collect(Collectors.toList()))하세요.

문제 29. Optional 클래스 기본 (null-safe)

요구사항: String 변수 name에 null이 들어갈 수 있습니다. 이 변수를 Optional.ofNullable()로 감싼 객체를 반환하고, 내부 값이 null일 경우 "Unknown"을 반환하도록 orElse()를 적용하세요.

문제 30. Optional과 ifPresent()

요구사항: Optional<String> 객체에 "Hello Java" 문자열이 들어있습니다. 값이 존재하는 경우에만 문자열의 길이(length)를 출력하도록 ifPresent()와 람다식을 활용한 코드를 작성하세요.

---

## 답

📝 Java 실습 시험 30선 정답 및 해설 (Ch.11 ~ Ch.13)

🎯 [11장] java.lang 기본 클래스 정답

문제 1 & 2. equals(), hashCode() 오버라이딩

```java
class Student {
    int studentId;
    String name;

    public Student(int studentId, String name) {
        this.studentId = studentId;
        this.name = name;
    }

    // 문제 1 정답: 학번이 같으면 같은 객체로 판별
    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Student) {
            Student std = (Student) obj;
            if (this.studentId == std.studentId) return true;
            else return false;
        }
        return false;
    }

    // 문제 2 정답: equals가 true면 동일한 해시코드 반환
    @Override
    public int hashCode() {
        return studentId;
    }
}
```

해설: 논리적 동등성을 위해 equals를 재정의했다면, 해시 기반 컬렉션(HashSet, HashMap 등)에서 정상 작동하도록 hashCode도 반드시 재정의해야 합니다.

문제3. toString() 오버라이딩

```java
class Book {
    String title;
    String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    @Override
    public String toString() {
        return "책제목: " + title + ", 저자: " + author;
    }
}
```
    
문제 4 ~ 10. String, StringBuilder, Wrapper, Class, Clone

```java
public class LangClassTest {
    public static void printObject(Object obj) {
        System.out.println("전달된 객체 타입: " + obj.getClass().getName());
        System.out.println("값: " + obj);
    }

    public static void main(String[] args) throws Exception {
        // 문제 4. String 불변성
        String str = "Hello";
        str.concat(" World");
        System.out.println("문제 4: " + str); // 출력: Hello (원본은 변하지 않음)

        // 문제 5. StringBuilder 활용
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 100; i++) {
            sb.append(i).append(" ");
        }
        System.out.println("문제 5: " + sb.toString().trim());

        // 문제 6. Wrapper 클래스 형변환
        String numStr = "12345";
        int num = Integer.parseInt(numStr);
        System.out.println("문제 6: " + (num * 10));

        // 문제 7. AutoBoxing
        System.out.println("문제 7:");
        printObject(100);   // int -> Integer 오토박싱
        printObject(3.14);  // double -> Double 오토박싱

        // 문제 8. Class 동적 로딩
        try {
            Class<?> c = Class.forName("java.util.ArrayList");
            System.out.println("문제 8 클래스명: " + c.getName());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }

        // 문제 10. String 메서드 체이닝
        String text = "  Java Programming  ";
        String result = text.trim().toUpperCase();
        System.out.println("문제 10: [" + result + "]");
    }
}

// 문제 9. 객체 복제 clone()
class Point implements Cloneable {
    int x, y;

    public Point(int x, int y) { this.x = x; this.y = y; }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
```

해설: String은 불변이므로 값을 변경하려면 str = str.concat(...) 처럼 다시 대입해야 합니다. 잦은 문자열 결합은 메모리 낭비가 심하므로 StringBuilder를 사용합니다.

🎯 [12장] 제네릭과 컬렉션 프레임워크 정답

문제 11 & 12. 제네릭 클래스

```java
// 문제 11. 제네릭 기본
class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

// 문제 12. 타입 제한 제네릭 (Number 하위 클래스만 가능)
class MathBox<T extends Number> {
    private T num;
    public MathBox(T num) { this.num = num; }
    public void printDouble() {
        System.out.println(num.doubleValue());
    }
}
```

문제 13 ~ 20. 컬렉션 프레임워크 (List, Set, Map, Queue)

```java
import java.util.*;

// 문제 15를 위한 Member 클래스
class Member {
    int id; String name;
    public Member(int id, String name) { this.id = id; this.name = name; }
    
    @Override
    public boolean equals(Object obj) {
        if(obj instanceof Member) {
            Member m = (Member)obj;
            return this.id == m.id && this.name.equals(m.name);
        }
        return false;
    }
    @Override
    public int hashCode() { return id; }
}

// 문제 17 & 18을 위한 Employee 클래스
class Employee implements Comparable<Employee> {
    int id; String name;
    public Employee(int id, String name) { this.id = id; this.name = name; }
    
    @Override
    public int compareTo(Employee o) {
        return this.id - o.id; // 사번 기준 오름차순
    }
    @Override
    public String toString() { return name + "(" + id + ")"; }
}

public class CollectionTest {
    public static void main(String[] args) {
        // 문제 13. ArrayList 기본
        ArrayList<String> list = new ArrayList<>(Arrays.asList("Apple", "Banana", "Cherry"));
        for (String s : list) System.out.println("문제 13: " + s);

        // 문제 14. HashSet 중복 제거
        Integer[] arr = {1, 2, 2, 3, 4, 4, 5};
        HashSet<Integer> set = new HashSet<>(Arrays.asList(arr));
        System.out.println("문제 14 사이즈: " + set.size()); // 5

        // 문제 15. 사용자 정의 객체 HashSet
        HashSet<Member> members = new HashSet<>();
        members.add(new Member(1, "홍길동"));
        members.add(new Member(1, "홍길동"));
        System.out.println("문제 15 사이즈: " + members.size()); // 1 (hashCode, equals 덕분)

        // 문제 16. HashMap 단어장
        HashMap<String, String> map = new HashMap<>();
        map.put("apple", "사과");
        map.put("grape", "포도");
        for (String key : map.keySet()) {
            System.out.println("문제 16: " + key + " -> " + map.get(key));
        }

        // 문제 17. Comparable (기본 정렬: 사번 오름차순)
        TreeSet<Employee> treeSet1 = new TreeSet<>();
        treeSet1.add(new Employee(200, "김철수"));
        treeSet1.add(new Employee(100, "이영희"));
        System.out.println("문제 17: " + treeSet1);

        // 문제 18. Comparator (커스텀 정렬: 이름 내림차순)
        TreeSet<Employee> treeSet2 = new TreeSet<>(new Comparator<Employee>() {
            @Override
            public int compare(Employee e1, Employee e2) {
                return e2.name.compareTo(e1.name); // 내림차순
            }
        });
        treeSet2.add(new Employee(200, "김철수"));
        treeSet2.add(new Employee(100, "이영희"));
        System.out.println("문제 18: " + treeSet2);

        // 문제 19. LinkedList 큐 동작
        LinkedList<String> queue = new LinkedList<>();
        queue.offer("A"); queue.offer("B"); queue.offer("C");
        System.out.println("문제 19 poll: " + queue.poll()); // A 출력 (FIFO)

        // 문제 20. Iterator 안전한 삭제
        ArrayList<Integer> numList = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));
        Iterator<Integer> iter = numList.iterator();
        while (iter.hasNext()) {
            int n = iter.next();
            if (n % 2 == 0) iter.remove(); // 2, 4 삭제
        }
        System.out.println("문제 20: " + numList); // [1, 3, 5]
    }
}
```

🎯 [13장] 내부 클래스, 람다식, 스트림, Optional 정답

문제 21 ~ 23. 내부 클래스 및 람다식

```java
// 문제 21. 인스턴스 내부 클래스
class Computer {
    class CPU {
        void run() { System.out.println("CPU 연산 중..."); }
    }
}

// 문제 23. 함수형 인터페이스
@FunctionalInterface
interface MaxNumber {
    int getMax(int x, int y);
}

public class LambdaTest {
    public static void main(String[] args) {
        // 문제 21 실행
        Computer pc = new Computer();
        Computer.CPU cpu = pc.new CPU(); // 외부 인스턴스를 통해 생성
        cpu.run();

        // 문제 22. 익명 내부 클래스 (Runnable)
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("문제 22: 스레드 실행");
            }
        });
        thread.start();

        // 문제 23 실행 (람다식)
        MaxNumber max = (x, y) -> (x >= y) ? x : y;
        System.out.println("문제 23 최대값: " + max.getMax(10, 20));
    }
}
```

문제 24 ~ 30. 스트림(Stream)과 Optional

```java
import java.util.*;
import java.util.stream.Collectors;

class Product {
    String name; int price;
    public Product(String name, int price) { this.name = name; this.price = price; }
}

public class StreamOptionalTest {
    public static void main(String[] args) {
        // 문제 24. 스트림 생성 및 forEach
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        System.out.print("문제 24: ");
        nums.stream().forEach(n -> System.out.print(n + " "));
        System.out.println();

        // 문제 25. filter
        List<String> langs = Arrays.asList("Java", "Python", "JavaScript", "C", "C++");
        System.out.print("문제 25: ");
        langs.stream()
             .filter(s -> s.contains("Java"))
             .forEach(s -> System.out.print(s + " "));
        System.out.println();

        // 문제 26. map
        List<Integer> smallNums = Arrays.asList(1, 2, 3, 4, 5);
        List<Integer> mapped = smallNums.stream()
                                        .map(n -> n * 10)
                                        .collect(Collectors.toList());
        System.out.println("문제 26: " + mapped);

        // 문제 27. reduce
        List<Integer> reduceNums = Arrays.asList(10, 20, 30, 40);
        int sum = reduceNums.stream()
                            .reduce(0, (a, b) -> a + b);
        System.out.println("문제 27 합계: " + sum);

        // 문제 28. 객체 스트림 다루기 (filter + map + collect)
        List<Product> products = Arrays.asList(
            new Product("볼펜", 1000), new Product("다이어리", 8000), new Product("텀블러", 15000)
        );
        List<String> expProducts = products.stream()
                                           .filter(p -> p.price >= 5000)
                                           .map(p -> p.name)
                                           .collect(Collectors.toList());
        System.out.println("문제 28 비싼 상품: " + expProducts);

        // 문제 29. Optional 기본 (null-safe)
        String name = null;
        String result = Optional.ofNullable(name).orElse("Unknown");
        System.out.println("문제 29: " + result);

        // 문제 30. Optional ifPresent
        Optional<String> optStr = Optional.of("Hello Java");
        System.out.print("문제 30 길이: ");
        optStr.ifPresent(s -> System.out.println(s.length()));
    }
}
```

해설: Stream은 filter로 조건을 걸러내고, map으로 데이터를 변형하며, collect나 reduce 등의 최종 연산으로 결과를 묶어냅니다. Optional은 null 참조로 인한 예외(NPE)를 방지하기 위해 사용되며, orElse로 기본값을 지정하거나 ifPresent로 값이 존재할 때만 안전하게 코드를 실행할 수 있습니다.
