### 💻 CH05. SQL 기초

가장 대표적인 비절차적 데이터베이스 조작어입니다.

### 1. SQL 개요 및 분류

SQL은 관계형 데이터베이스의 표준 언어로, 기능에 따라 세 가지로 분류됩니다:

- 데이터 정의어 (DDL): 테이블, 뷰, 인덱스 등 DB 구조를 정의하거나 수정·삭제합니다.
    - `CREATE`, `DROP`등, 자동 반영 -> 롤백 불가

- 데이터 조작어 (DML): 데이터를 입력, 수정, 삭제, 검색합니다.
    - 영구 반영 하려면 `+commit`,취소하려면 `rollback`(`UPDATE`, `INSERT`, `DELETE`).

- 데이터 제어어 (DCL): 보안을 위한 권한 부여 및 관리, 백업/복원 등을 담당합니다.
    - `CREATE USER`, `GRANT`, `REVOKE`, `commit`, `rollback`.

### 2. 기본 검색 및 조인 (SELECT)
```sql
-- 조건 검색: 컴퓨터 학과 학생을 학년 내림차순 정렬
SELECT 이름, 학년 FROM 학생 
WHERE 소속학과 = '컴퓨터' 
ORDER BY 학년 DESC;

-- 내부 조인 (INNER JOIN)
SELECT 학생.이름, 수강.기말성적
FROM 학생 JOIN 수강 ON 학생.학번 = 수강.학번;
```

### 3. 그룹화 및 부 질의문 (Sub Query)
```sql
-- GROUP BY와 HAVING: 2명 이상인 학과만 조회
SELECT 소속학과, COUNT(*) as 학생수
FROM 학생 
GROUP BY 소속학과 
HAVING COUNT(*) >= 2;

-- 부 질의문: 수강 기록 중 A를 맞은 학생의 이름만 검색
SELECT 이름 FROM 학생 
WHERE 학번 IN (SELECT 학번 FROM 수강 WHERE 평가학점 = 'A');
```

### 4. 삽입/수정/삭제 (DML)

> `commit`은 서버 셧다운시에도 **자동 실행됨** 

#### INSERT

- 기본 `INSERT INTO 테이블뷰, 컬럼명1, 컬럼명2, ... VALUES (값1, 값2, ...)`
- 변형1 `INSERT INTO 테이블뷰 VALUES (값1, 값2, ...)`
- 변형2 `INSERT INTO 테이블뷰, 컬럼명1, 컬럼명3, 컬럼명5 VALUES (값1, 값3, 값5)` 없는 컬럼에는 `NULL`이나 `default`값이 들어감.
- 고난도 변형 `INSERT INTO 테이블명 VALUES(sub quary)` 다른 테이블의 검색결과나 `sub quary`를 가지고 삽입할 수 있음.

#### Update

- 기본 `UPDATE 테이블 SET 컬럼1 = 값1, 컬럼2 = 값2 , ... WHERE 조건(생략 가능);`
- 고난도 변형 `UPDATE 테이블 SET 컬럼1 = (sub quary), ... WHERE 컬럼1 IN (sub quary);`

#### Delete

- 기본 `DELETE FROM 테이블 WHERE 조건(생략 가능);`
- 고난도 변형 `DELETE FROM 테이블 WHERE 컬럼1 IN (sub quary);`

```sql
-- 데이터 삽입
INSERT INTO 학생(학년, 나이, 성별, 소속학과, 학번, 이름) 
VALUES (3, 30, '남', '정보통신', 'g003', '이승엽2');

-- 데이터 수정 (UPDATE)
UPDATE 학생 SET 학년 = 3 WHERE 이름 = '이은진';

-- 데이터 삭제 (DELETE)
DELETE FROM 학생 WHERE 소속학과 = '경영';
-- 수강생이 2명 미만인 과목 삭제
DELETE FROM 과목 WHERE 과목번호 IN (
    SELECT 과목번호
    FROM 수강
    GROUP BY 과목번호
    HAVING COUNT(*) < 2
)
```