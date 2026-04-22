### 💻 CH05. SQL 기초

가장 대표적인 비절차적 데이터베이스 조작어입니다.

### 1. 기본 검색 및 조인 (SELECT)
```sql
-- 조건 검색: 컴퓨터 학과 학생을 학년 내림차순 정렬
SELECT 이름, 학년 FROM 학생 
WHERE 소속학과 = '컴퓨터' 
ORDER BY 학년 DESC;

-- 내부 조인 (INNER JOIN)
SELECT 학생.이름, 수강.기말성적
FROM 학생 JOIN 수강 ON 학생.학번 = 수강.학번;
```

### 2. 그룹화 및 부 질의문 (Sub Query)
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

### 3. 삽입/수정/삭제 (DML)
```sql
-- 데이터 삽입
INSERT INTO 학생(학년, 나이, 성별, 소속학과, 학번, 이름) 
VALUES (3, 30, '남', '정보통신', 'g003', '이승엽2');

-- 데이터 수정 (UPDATE)
UPDATE 학생 SET 학년 = 3 WHERE 이름 = '이은진';

-- 데이터 삭제 (DELETE)
DELETE FROM 학생 WHERE 소속학과 = '경영';
```