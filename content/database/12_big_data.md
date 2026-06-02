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