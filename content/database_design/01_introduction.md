# 관계형 DB 돌아보기 (복습?)

파일 시스템의 문제
- 종속성
- 무결성 침해
- 중복성
- ...

기존 운영체제 위에 DBMS를 올려 사용

## 뷰

3-tire 아키텍쳐에서 외부 문제를 해결하기 위해

가상 테이블임

read는 굿 write는 흠밍밍...

조직마다 필요 정보만 취사선택 해서 볼려고(접근 가능하게) 만듬

```SQL
CREATE VIEW VIEW_NAME
    AS SELECT [ATTRIBUTE1, ATTRIBUTE2, ...]
    FROM TABLE_NAME
    WHERE CONDITION;
```

뷰의 질의는 정의된 기본 테이블로 변환되어서 실행 $\rightarrow$ 업뎃 될때도 있고 아닐때도 있고 $\rightarrow$ 가상테이블이라 그럼 믕항항

## LANGUAGE

- DDL
    - `CREATE`
    - `ALTER`
    - `DROP`
    - `TRUNCATE`
- DML
    - `SELECT` ( DQL )
        - `FROM`
        - `WHERE`
        - `GROUP BY`
        - `HAVING`
        - `ORDER BY`
    - `INSERT`
    - `UPDATE`
    - `DELETE`
- DCL
    - `COMMIT`
    - `ROLLBACK`
    - `GRANT`
    - `REVOKE`

drop은 스키마를, delete, truncate는 데이터를 제거한다.

위는 표준, 벤더들마다 추가되는 명령어들이 있음