# 2026년도 Java 기말고사 Stream API 대비 가이드

기존 `quiz2026` 패키지에 구현된 퀴즈들의 출제 경향을 분석하여, **기말시험에 출제될 확률이 매우 높은 핵심 유형 4가지**와 이 유형을 조합한 **신규 예상 문제 4문항(예시 답안 포함)**을 정리했습니다.

---

## 1. 기말고사 빈출 핵심 유형 분석

기출 문제들의 패턴을 분석했을 때, 단일 메서드(`filter`나 `map` 등)만 사용하는 단순한 문제는 출제 확률이 낮습니다. 기말고사에서는 **2개 이상의 중간 연산과 최종 연산이 복합적으로 연계된 형태**가 주로 출제됩니다.

### 유형 A: 다중 조건 정렬 & 제한 (Multi-key Sorting & Limit)
*   **출제 핵심:** `Comparator.comparing(...).thenComparing(...)`의 조합 및 정순/역순(`reversed()`) 제어 능력 평가
*   **자주 쓰이는 조합:** `filter() -> sorted(Comparator) -> limit() -> collect()`

### 유형 B: 복합 그룹화 및 집계 (Advanced GroupingBy)
*   **출제 핵심:** 단순 그룹화가 아니라, 그룹화 후 각 그룹 내에서 최댓값/합계/평균을 구하거나 커스텀 객체로 매핑하는 능력 평가
*   **자주 쓰이는 조합:** `collect(Collectors.groupingBy(Key, Collectors.collectingAndThen(...)))` 혹은 `Collectors.groupingBy(Key, Collectors.maxBy(...))`

### 유형 C: 중첩 구조 해제 및 가공 (flatMap & distinct)
*   **출제 핵심:** 1:N 관계를 가진 객체 그래프(예: 주문 객체 내부의 상품 리스트)에서 특정 조건의 하위 객체들을 단일 스트림으로 평탄화하는 능력 평가
*   **자주 쓰이는 조합:** `flatMap(Collection::stream) -> filter() -> distinct() -> collect()`

### 유형 D: 커스텀 리덕션 & 조건부 수집 (Custom reduce & Partitioning)
*   **출제 핵심:** `reduce` 메서드의 초깃값(identity), 누적기(accumulator), 결합기(combiner) 이해 여부 또는 `partitioningBy`를 통한 양분화 분석
*   **자주 쓰이는 조합:** `reduce(init, (a, b) -> ...)` 혹은 `collect(Collectors.partitioningBy(Predicate, Collector))`

---

## 2. 기말고사 예상 신규 문제 & 예시 답안

> [!IMPORTANT]
> 아래 문제들은 기존 퀴즈 자료의 데이터를 변형 및 결합하여 새롭게 출제 가능한 형태로 재구성한 문제입니다.

---

### [예상 문제 1] 다중 조건 정렬 및 상위 N개 추출 (난이도: 중상)

**[문제 설명]**  
학생(`Student`) 클래스가 수학 점수(`mathScore`)와 영어 점수(`englishScore`)를 가지고 있습니다.  
수학 점수가 70점 이상인 학생들을 대상으로, **수학 점수 내림차순(높은 순)**으로 정렬하되, **수학 점수가 같으면 영어 점수 오름차순(낮은 순)**으로 정렬하여 **상위 3명**의 이름만 리스트로 반환하세요.

#### 데이터 구조 및 제공 코드
```java
public class Student {
    private String name;
    private int mathScore;
    private int englishScore;

    public Student(String name, int mathScore, int englishScore) {
        this.name = name;
        this.mathScore = mathScore;
        this.englishScore = englishScore;
    }

    public String getName() { return name; }
    public int getMathScore() { return mathScore; }
    public int getEnglishScore() { return englishScore; }
}

// 초기 데이터
List<Student> students = Arrays.asList(
    new Student("Kim", 85, 90),
    new Student("Lee", 65, 80),
    new Student("Park", 85, 75),
    new Student("Choi", 70, 85),
    new Student("Jung", 95, 70),
    new Student("Kang", 85, 80)
);
```

#### 예시 답안 코드
```java
List<String> result = students.stream()
    .filter(s -> s.getMathScore() >= 70)
    .sorted(Comparator
        .comparing(Student::getMathScore).reversed() // 수학 점수 내림차순
        .thenComparing(Student::getEnglishScore))   // 수학 점수 같으면 영어 점수 오름차순
    .limit(3)
    .map(Student::getName)
    .collect(Collectors.toList());

System.out.println(result); // 출력 결과: [Jung, Park, Kang]
```

---

### [예상 문제 2] 부서별 최고 연봉자 추출 (난이도: 상)

**[문제 설명]**  
사원(`Employee`) 리스트에서 **부서(Department)별로 가장 높은 급여(Salary)를 받는 사원의 이름**을 출력하는 코드를 작성하세요. (단, 결과는 `Map<String, String>` 형태로 반환되어야 하며, Key는 부서명, Value는 사원 이름이어야 합니다.)

#### 데이터 구조 및 제공 코드
```java
public class Employee {
    private String name;
    private String department;
    private int salary;

    public Employee(String name, String department, int salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    public String getName() { return name; }
    public String getDepartment() { return department; }
    public int getSalary() { return salary; }
}

// 초기 데이터
List<Employee> employees = Arrays.asList(
    new Employee("Alice", "개발", 5000),
    new Employee("Bob", "개발", 6000),
    new Employee("Charlie", "디자인", 4500),
    new Employee("David", "디자인", 5500),
    new Employee("Eve", "마케팅", 4800)
);
```

#### 예시 답안 코드
```java
Map<String, String> result = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.collectingAndThen(
            Collectors.maxBy(Comparator.comparingInt(Employee::getSalary)),
            optEmp -> optEmp.map(Employee::getName).orElse("없음")
        )
    ));

System.out.println(result); // 출력 결과: {개발=Bob, 디자인=David, 마케팅=Eve}
```

---

### [예상 문제 3] 다중 주문 내역에서 고가 상품 명단 추출 (난이도: 중상)

**[문제 설명]**  
주문(`Order`) 리스트에는 각 주문별로 구매한 상품(`Item`) 리스트가 들어있습니다.  
모든 주문 전체를 통틀어 **가격이 15,000원 이상인 고가 상품들의 이름을 중복 없이 추출**하고, 이를 **알파벳 순(오름차순)으로 정렬**하여 쉼표(`, `)로 구분된 하나의 문자열로 만드세요.

#### 데이터 구조 및 제공 코드
```java
public class Item {
    private String name;
    private int price;

    public Item(String name, int price) {
        this.name = name;
        this.price = price;
    }
    public String getName() { return name; }
    public int getPrice() { return price; }
}

public class Order {
    private int orderId;
    private List<Item> items;

    public Order(int orderId, List<Item> items) {
        this.orderId = orderId;
        this.items = items;
    }
    public List<Item> getItems() { return items; }
}

// 초기 데이터
List<Order> orders = Arrays.asList(
    new Order(1, Arrays.asList(new Item("Laptop", 1200000), new Item("Mouse", 25000))),
    new Order(2, Arrays.asList(new Item("Mouse", 25000), new Item("Pad", 8000))),
    new Order(3, Arrays.asList(new Item("Keyboard", 45000), new Item("Pad", 8000)))
);
```

#### 예시 답안 코드
```java
String result = orders.stream()
    .flatMap(order -> order.getItems().stream()) // 일차원 스트림으로 평탄화
    .filter(item -> item.getPrice() >= 15000)    // 15,000원 이상만 필터링
    .map(Item::getName)                          // 상품명 추출
    .distinct()                                  // 중복 제거
    .sorted()                                    // 알파벳 오름차순 정렬
    .collect(Collectors.joining(", "));          // 쉼표로 연결

System.out.println(result); // 출력 결과: Keyboard, Laptop, Mouse
```

---

### [예상 문제 4] 도서 목록의 조건부 통계 및 합산 (난이도: 상)

**[문제 설명]**  
도서(`Book`) 리스트가 있습니다. 출판년도(`publishYear`)가 **2020년 이후(2020년 포함)**인 도서들을 대상으로, **가격(`price`)이 20,000원 이상이면 책 가격의 10%를 할인하고, 20,000원 미만이면 가격을 그대로 유지**합니다.  
이렇게 조정된 도서들의 **총 금액 합계**를 `reduce` 연산을 사용하여 계산하세요.

#### 데이터 구조 및 제공 코드
```java
public class Book {
    private String title;
    private int publishYear;
    private int price;

    public Book(String title, int publishYear, int price) {
        this.title = title;
        this.publishYear = publishYear;
        this.price = price;
    }
    public String getTitle() { return title; }
    public int getPublishYear() { return publishYear; }
    public int getPrice() { return price; }
}

// 초기 데이터
List<Book> books = Arrays.asList(
    new Book("Java Stream 완성", 2021, 30000), // 할인 대상 (30000 -> 27000)
    new Book("JPA 프로그래밍", 2019, 40000),  // 2020년 이전이라 제외
    new Book("Spring Boot 기초", 2022, 15000), // 유지 대상 (15000)
    new Book("자료구조 입문", 2020, 25000)     // 할인 대상 (25000 -> 22500)
);
```

#### 예시 답안 코드
```java
double totalAdjustedPrice = books.stream()
    .filter(b -> b.getPublishYear() >= 2020)
    .mapToDouble(b -> {
        if (b.getPrice() >= 20000) {
            return b.getPrice() * 0.9; // 10% 할인
        } else {
            return b.getPrice();
        }
    })
    .reduce(0.0, Double::sum); // double binary operator를 사용한 합산

System.out.println("총합: " + totalAdjustedPrice); // 출력 결과: 총합: 64500.0
```
