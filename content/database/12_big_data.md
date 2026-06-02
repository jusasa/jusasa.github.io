# 빅 데이터

유비쿼터스 시대가 오면서 IoT를 아용하기 시작 -> 데이터가 어마무시하게 생기기 시작 -> 이걸 저장해야함(Hadoop)


Volume(양) 큼, Velocity 빠르게 쏟아짐, Variety(다양성) **섞임**, 

- 정형데이터(structured data) : 틀이 정해진 데이터, RDB에 저장 가능한 데이터
- 반정형데이터(semi-structured data) : 틀이 있긴 한데 틀 구성이 자유로움, html, xml, json
    - 초기에 반정형 데이터를 정형데이터로 바꿔서 작업 하려 함. ORDBMS
    - 4~5년후 "이거 안돼!" -> 반정형 데이터 그대로 사용. -> NoSQL 등장
- 비정형데이터(non-structured data) : 틀이 없음, 이미지, 영상, 소리

-> 3V BIG Data/  + 데이터 가치평가 Value, 정확성 Veracity -> 5V BigData
$\Rightarrow$ Smart Factory

AI라는 영혼의 단짝을 만남

## 주요 기술

1. 데이터 수집
    * 웹 크롤링등
$\Downarrow$
2. 데이터 처리
    * 분산 병렬 실시간
    * 인 메모지 처리 방식
$\Downarrow$
3. 데이터 저장
    * SQL DB
    * NoSQL
    * 하둡등
$\Downarrow$
4. 데이터 분석(활용)
    * 통계분석
    * 데이터 마이닝등
$\Downarrow$
5. 데이터 시각화
    * 시각화 기법등
$\Downarrow$
.... 1....

수집시 4기준 고려
    - 충분성
    - 완정성
    - 일관성
    - 정확성

ETL
Extract : 추출
Transform : 변환
Load : 적재

## NoSQL DB

데이터를 분산저장, 운영하는데 최적화

장점
- 유연성
- 확장성
- 경제성
- 가용성

키-값 DB : 키와 값의 단순한 형태로 저장. key : value
- 가장 기본적이고 구현이 단순.
- key를 통해 value를 찾음.

문서 DB: 
- Key/Value DB의 확장. 
- Key와 연관된 값을 **문서(Document)** 형태로 저장.
- 문서는 JSON, XML 등과 같이 유연한 구조를 가짐.
- 문서 내의 데이터를 **Query**로 검색할 수 있음.
- 예시: MongoDB, Couchbase

컬럼 패밀리 DB:
- Column Family(열족)의 형태로 데이터를 저장.
- Row key와 Column Family key, Column key, Value로 구성.
- 예시: HBase, Cassandra

그래프 데이터베이스:
- 노드와 엣지(간선)를 이용하여 데이터를 저장.
- 노드와 엣지에 속성을 부여하여 관계를 표현.
- 예시: Neo4j, ArangoDB