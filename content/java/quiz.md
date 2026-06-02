# 2026년도 Java Stream Quiz 정리

이 문서는 `inhatc.cse.java.quiz2026` 패키지 아래에 포함된 모든 Java Stream API 관련 퀴즈와 실습 문제들을 정리한 문서입니다. 각 문제별 상세 요구사항 및 소스 코드로 바로 이동할 수 있습니다.

> [!TIP]
> **기말고사 대비용 예상 출제 문제 및 핵심 요약 가이드**를 보시려면 [기말고사 Stream API 대비 가이드 (exam_prep_guide.md)](exam_prep_guide.md) 파일을 확인하세요!

## 퀴즈 목록 요약


| 번호 | 주제 / 문제 설명 | 난이도 | 링크 (문제) | 링크 (코드) |
| :--- | :--- | :---: | :---: | :---: |
| 05 | **Stream 기본 filter**<br>정수 리스트에서 10 이상인 숫자만 필터링하여 출력하세요. | 🟢 하 | [문제](ex05/ex05_basic_filter.md) | [코드](ex05/Ex05BasicFilter.java) |
| 06 | **Stream map**<br>문자열 리스트의 각 문자열 길이를 구하여 출력하세요. | 🟢 하 | [문제](ex06/ex06_basic_map.md) | [코드](ex06/Ex06BasicMap.java) |
| 07 | **filter와 map 조합**<br>정수 리스트에서 10 이상인 숫자만 필터링한 후, 각 숫자를 2배로 변환하여 출력하세요. | 🟢 하 | [문제](ex07/ex07_filter_map_combine.md) | [코드](ex07/Ex07FilterMapCombine.java) |
| 08 | **Stream sum with collect**<br>정수 리스트의 합계를 구하세요. | 🟢 하 | [문제](ex08/ex08_stream_sum.md) | [코드](ex08/Ex08StreamSum.java) |
| 09 | **Stream toList로 새 리스트 생성**<br>정수 리스트에서 3의 배수만 필터링하여 새 리스트를 만들고 출력하세요. | 🟢 하 | [문제](ex09/ex09_stream_tolist.md) | [코드](ex09/Ex09StreamToList.java) |
| 10 | **forEach vs collect**<br>짝수들의 제곱값을 구하여 출력하세요. | 🟢 하 | [문제](ex10/ex10_foreach_vs_collect.md) | [코드](ex10/Ex10ForeachVsCollect.java) |
| 11 | **Stream empty 체크 (anyMatch)**<br>리스트에 100 이상인 숫자가 존재하는지 확인하세요. | 🟢 하 | [문제](ex11/ex11_stream_anymatch.md) | [코드](ex11/Ex11StreamAnyMatch.java) |
| 12 | **Stream count**<br>리스트에서 50 초과인 숫자의 개수를 구하세요. | 🟢 하 | [문제](ex12/ex12_stream_count.md) | [코드](ex12/Ex12StreamCount.java) |
| 13 | **Lambda를 사용한 Comparator**<br>문자열 리스트를 알파벳 순서로 오름차순 정렬하세요. | 🟢 하 | [문제](ex13/ex13_lambda_comparator.md) | [코드](ex13/Ex13LambdaComparator.java) |
| 14 | **Stream 문자열 처리**<br>문자열 리스트를 모두 대문자로 변환하여 출력하세요. | 🟢 하 | [문제](ex14/ex14_stream_string.md) | [코드](ex14/Ex14StreamString.java) |
| 15 | **Stream max/min**<br>정수 리스트에서 최댓값과 최솟값을 구하세요. | 🟢 하 | [문제](ex15/ex15_stream_maxmin.md) | [코드](ex15/Ex15StreamMaxMin.java) |
| 16 | **Stream sorted (내림차순)**<br>정수 리스트를 내림차순으로 정렬하세요. | 🟡 중 | [문제](ex16/ex16_sorted_desc.md) | [코드](ex16/Ex16SortedDesc.java) |
| 17 | **Stream distinct**<br>중복을 제거한 숫자 리스트를 만드세요. | 🟡 중 | [문제](ex17/ex17_stream_distinct.md) | [코드](ex17/Ex17StreamDistinct.java) |
| 18 | **Stream limit과 skip**<br>리스트의 첫 3개 요소를 건너뛴 후 다음 2개를 출력하세요. | 🟡 중 | [문제](ex18/ex18_skip_limit.md) | [코드](ex18/Ex18SkipLimit.java) |
| 19 | **Stream flatMap**<br>문자열 리스트의 각 문자를 분리하여 모두 출력하세요. | 🟡 중 | [문제](ex19/ex19_flatmap.md) | [코드](ex19/Ex19FlatMap.java) |
| 20 | **Stream allMatch/noneMatch**<br>리스트의 모든 숫자가 양수인지, 아니면 모두 음수인지 확인하세요. | 🟡 중 | [문제](ex20/ex20_allmatch_nonematch.md) | [코드](ex20/Ex20AllMatchNoneMatch.java) |
| 21 | **Stream reduce (합계)**<br>리스트의 모든 숫자를 더한 합계를 구하세요. | 🟡 중 | [문제](ex21/ex21_stream_reduce.md) | [코드](ex21/Ex21StreamReduce.java) |
| 22 | **Stream groupingBy (기본)**<br>정수 리스트를 숫자의 홀짝 여부로 그룹화하세요. | 🟡 중 | [문제](ex22/ex22_groupingby_basic.md) | [코드](ex22/Ex22GroupingByBasic.java) |
| 23 | **Stream partitioningBy**<br>정수 리스트를 50 이상과 50 미만으로 분할하세요. | 🟡 중 | [문제](ex23/ex23_partitioningby.md) | [코드](ex23/Ex23PartitioningBy.java) |
| 24 | **Stream toMap**<br>(key, value) 쌍의 리스트를 Map으로 변환하세요. | 🟡 중 | [문제](ex24/ex24_stream_tomap.md) | [코드](ex24/Ex24StreamToMap.java) |
| 25 | **filter + groupingBy 조합**<br>문자열 리스트를 길이 3 이상인 것들만 문자열 길이별로 그룹화하세요. | 🟡 중 | [문제](ex25/ex25_filter_groupingby.md) | [코드](ex25/Ex25FilterGroupingBy.java) |
| 26 | **groupingBy with counting**<br>문자열 리스트에서 문자열 길이별 개수를 구하세요. | 🟡 중 | [문제](ex26/ex26_groupingby_counting.md) | [코드](ex26/Ex26GroupingByCounting.java) |
| 27 | **Stream with custom class (Student)**<br>학생 객체 리스트에서 점수 70점 이상인 학생만 필터링하여 이름을 출력하세요. | 🟡 중 | [문제](ex27/ex27_stream_custom_class.md) | [코드](ex27/Ex27StreamCustomClass.java) |
| 28 | **Stream 객체 정렬**<br>Product 객체 리스트를 가격 오름차순으로 정렬하여 출력하세요. | 🟡 중 | [문제](ex28/ex28_stream_object_sort.md) | [코드](ex28/Ex28StreamObjectSort.java) |
| 29 | **Stream 객체 groupingBy**<br>Employee 리스트를 부서(Department)별로 그룹화하세요. | 🟡 중 | [문제](ex29/ex29_stream_object_grouping.md) | [코드](ex29/Ex29StreamObjectGrouping.java) |
| 30 | **Stream 종단 작업 (터미널 오퍼레이션 조합)**<br>Book 리스트에서 2000원 이상인 도서의 총 수량과 평균 가격을 구하세요. | 🟡 중 | [문제](ex30/ex30_stream_terminal_ops.md) | [코드](ex30/Ex30StreamTerminalOps.java) |
| 31 | **Stream IntSummaryStatistics**<br>숫자 리스트의 통계 정보를 구하세요. | 🔴 상 | [문제](ex31/ex31_summarystatistics.md) | [코드](ex31/Ex31SummaryStatistics.java) |
| 32 | **Stream filter + sorted + distinct 조합**<br>정수 리스트에서 30 이상인 숫자만 선택하여 중복을 제거하고 오름차순 정렬하세요. | 🔴 상 | [문제](ex32/ex32_filter_distinct_sorted.md) | [코드](ex32/Ex32FilterDistinctSorted.java) |
| 33 | **Stream findFirst/findAny**<br>정수 리스트에서 50보다 큰 첫 번째 숫자를 찾으세요. | 🔴 상 | [문제](ex33/ex33_findfirst_findany.md) | [코드](ex33/Ex33FindFirstFindAny.java) |
| 34 | **Stream 객체 리스트 복잡 처리**<br>학생 리스트에서 점수 80점 이상인 학생만 선택하여 이름으로 정렬한 후, 상위 3명의 이름을 출력하세요. | 🔴 상 | [문제](ex34/ex34_complex_object_stream.md) | [코드](ex34/Ex34ComplexObjectStream.java) |
| 35 | **Stream reduce (최댓값 찾기)**<br>정수 리스트에서 reduce()를 사용하여 최댓값을 구하세요. | 🔴 상 | [문제](ex35/ex35_reduce_maxvalue.md) | [코드](ex35/Ex35ReduceMaxValue.java) |
| 36 | **Stream 문자열 joining**<br>문자를 리스트의 요소들을 쉼표로 연결한 문자열로 만드세요. | 🔴 상 | [문제](ex36/ex36_stream_joining.md) | [코드](ex36/Ex36StreamJoining.java) |
| 37 | **Stream groupingBy with summingInt**<br>주문 리스트에서 고객별 총 주문액을 구하세요. | 🔴 상 | [문제](ex37/ex37_groupingby_summingint.md) | [코드](ex37/Ex37GroupingBySummingInt.java) |
| 38 | **Stream flatMap 2개 리스트 합치기**<br>2개의 숫자 리스트를 하나로 합치고 정렬하세요. | 🔴 상 | [문제](ex38/ex38_flatmap_merge_lists.md) | [코드](ex38/Ex38FlatMapMergeLists.java) |
| 39 | **Stream 조건부 groupingBy**<br>학생 리스트를 성별로 분류한 후, 각 그룹에서 점수 기준 내림차순으로 정렬하세요. | 🔴 상 | [문제](ex39/ex39_conditional_groupingby.md) | [코드](ex39/Ex39ConditionalGroupingBy.java) |
| 40 | **Stream 여러 메서드 조합 (종합)**<br>거래 리스트에서 100,000원 이상인 거래만 선택하여 고객별로 그룹화하고, 각 고객별 총액을 구한 후, 내림차순으로 정렬하여 상위 3개를 출력하세요. | 🔴 상 | [문제](ex40/ex40_comprehensive_stream.md) | [코드](ex40/Ex40ComprehensiveStream.java) |
| 41 | **Stream IntStream.range**<br>1부터 20까지의 숫자 중 3의 배수만 필터링하여 합계와 개수를 출력하세요. | 🔴 상 | [문제](ex41/ex41_intstream_range.md) | [코드](ex41/Ex41IntStreamRange.java) |
| 42 | **Stream peek (디버깅)**<br>또메인 stream에서 짝수만 필터링한 후, 디버깅 정보를 출력하면서 2배로 변환하세요. | 🔴 상 | [문제](ex42/ex42_stream_peek.md) | [코드](ex42/Ex42StreamPeek.java) |
| 43 | **Stream 객체 distinctBy**<br>제목으로 중복을 확인하는 도서(Book) 리스트를 필터링하세요. | 🔴 상 | [문제](ex43/ex43_stream_distinctby.md) | [코드](ex43/Ex43StreamDistinctBy.java) |
| 44 | **Stream groupingBy 다층 구조**<br>상품(Product) 리스트를 카테고리별, 그 다음 가격대별로 그룹화하세요. | 🔴 상 | [문제](ex44/ex44_nested_groupingby.md) | [코드](ex44/Ex44NestedGroupingBy.java) |
| 45 | **Stream 정렬 (여러 기준)**<br>학생(Student) 리스트를 점수 내림차순, 동점이면 이름 오름차순으로 정렬하세요. | 🔴 상 | [문제](ex45/ex45_multi_sorting.md) | [코드](ex45/Ex45MultiSorting.java) |
| 46 | **Stream 문자열 스트림 처리**<br>문자열 문장을 단어로 분리하여 단어 길이별로 그룹화하고, 각 그룹에서 길이 기준 정렬하세요. | 🔴 상 | [문제](ex46/ex46_string_stream_process.md) | [코드](ex46/Ex46StringStreamProcess.java) |
| 47 | **Stream collect (커스텀 컬렉션)**<br>숫자 리스트를 두 개의 리스트로 분리하세요: 하나는 짝수, 하나는 홀수. | 🔴 상 | [문제](ex47/ex47_custom_collect.md) | [코드](ex47/Ex47CustomCollect.java) |
| 48 | **Stream parallelStream**<br>1부터 1,000,000까지의 숫자 중 소수의 개수를 일반 stream과 parallelStream으로 각각 구하세요. | 🔴 상 | [문제](ex48/ex48_parallelstream.md) | [코드](ex48/Ex48ParallelStream.java) |
| 49 | **Stream 조건부 Map**<br>판매기록(Sale) 리스트에서 판매액이 100,000원 이상이면 판매액, 미만이면 0으로 변환하여 합계를 구하세요. | 🔴 상 | [문제](ex49/ex49_conditional_map.md) | [코드](ex49/Ex49ConditionalMap.java) |
| 50 | **Stream 종합 실습 (회원 관리)**<br>회원(Member) 리스트에서: 1. 나이 18세 이상만 필터링 2. 각 회원을 "이름(나이)" 형식의 문자열로 변환 3. 이름 오름차순 정렬 4. 최대 5명 선택 5. 쉼표로 구분한 문자열로 변환 | 🔴 상 | [문제](ex50/ex50_final_comprehensive.md) | [코드](ex50/Ex50FinalComprehensive.java) |

## 상세 내용

### [05] Stream 기본 filter
- **난이도:** 하
- **설명:** 정수 리스트에서 10 이상인 숫자만 필터링하여 출력하세요.
- **문제 파일:** [ex05_basic_filter.md](ex05/ex05_basic_filter.md)
- **소스 코드:** [Ex05BasicFilter.java](ex05/Ex05BasicFilter.java)

### [06] Stream map
- **난이도:** 하
- **설명:** 문자열 리스트의 각 문자열 길이를 구하여 출력하세요.
- **문제 파일:** [ex06_basic_map.md](ex06/ex06_basic_map.md)
- **소스 코드:** [Ex06BasicMap.java](ex06/Ex06BasicMap.java)

### [07] filter와 map 조합
- **난이도:** 하
- **설명:** 정수 리스트에서 10 이상인 숫자만 필터링한 후, 각 숫자를 2배로 변환하여 출력하세요.
- **문제 파일:** [ex07_filter_map_combine.md](ex07/ex07_filter_map_combine.md)
- **소스 코드:** [Ex07FilterMapCombine.java](ex07/Ex07FilterMapCombine.java)

### [08] Stream sum with collect
- **난이도:** 하
- **설명:** 정수 리스트의 합계를 구하세요.
- **문제 파일:** [ex08_stream_sum.md](ex08/ex08_stream_sum.md)
- **소스 코드:** [Ex08StreamSum.java](ex08/Ex08StreamSum.java)

### [09] Stream toList로 새 리스트 생성
- **난이도:** 하
- **설명:** 정수 리스트에서 3의 배수만 필터링하여 새 리스트를 만들고 출력하세요.
- **문제 파일:** [ex09_stream_tolist.md](ex09/ex09_stream_tolist.md)
- **소스 코드:** [Ex09StreamToList.java](ex09/Ex09StreamToList.java)

### [10] forEach vs collect
- **난이도:** 하
- **설명:** 짝수들의 제곱값을 구하여 출력하세요.
- **문제 파일:** [ex10_foreach_vs_collect.md](ex10/ex10_foreach_vs_collect.md)
- **소스 코드:** [Ex10ForeachVsCollect.java](ex10/Ex10ForeachVsCollect.java)

### [11] Stream empty 체크 (anyMatch)
- **난이도:** 하
- **설명:** 리스트에 100 이상인 숫자가 존재하는지 확인하세요.
- **문제 파일:** [ex11_stream_anymatch.md](ex11/ex11_stream_anymatch.md)
- **소스 코드:** [Ex11StreamAnyMatch.java](ex11/Ex11StreamAnyMatch.java)

### [12] Stream count
- **난이도:** 하
- **설명:** 리스트에서 50 초과인 숫자의 개수를 구하세요.
- **문제 파일:** [ex12_stream_count.md](ex12/ex12_stream_count.md)
- **소스 코드:** [Ex12StreamCount.java](ex12/Ex12StreamCount.java)

### [13] Lambda를 사용한 Comparator
- **난이도:** 하
- **설명:** 문자열 리스트를 알파벳 순서로 오름차순 정렬하세요.
- **문제 파일:** [ex13_lambda_comparator.md](ex13/ex13_lambda_comparator.md)
- **소스 코드:** [Ex13LambdaComparator.java](ex13/Ex13LambdaComparator.java)

### [14] Stream 문자열 처리
- **난이도:** 하
- **설명:** 문자열 리스트를 모두 대문자로 변환하여 출력하세요.
- **문제 파일:** [ex14_stream_string.md](ex14/ex14_stream_string.md)
- **소스 코드:** [Ex14StreamString.java](ex14/Ex14StreamString.java)

### [15] Stream max/min
- **난이도:** 하
- **설명:** 정수 리스트에서 최댓값과 최솟값을 구하세요.
- **문제 파일:** [ex15_stream_maxmin.md](ex15/ex15_stream_maxmin.md)
- **소스 코드:** [Ex15StreamMaxMin.java](ex15/Ex15StreamMaxMin.java)

### [16] Stream sorted (내림차순)
- **난이도:** 중
- **설명:** 정수 리스트를 내림차순으로 정렬하세요.
- **문제 파일:** [ex16_sorted_desc.md](ex16/ex16_sorted_desc.md)
- **소스 코드:** [Ex16SortedDesc.java](ex16/Ex16SortedDesc.java)

### [17] Stream distinct
- **난이도:** 중
- **설명:** 중복을 제거한 숫자 리스트를 만드세요.
- **문제 파일:** [ex17_stream_distinct.md](ex17/ex17_stream_distinct.md)
- **소스 코드:** [Ex17StreamDistinct.java](ex17/Ex17StreamDistinct.java)

### [18] Stream limit과 skip
- **난이도:** 중
- **설명:** 리스트의 첫 3개 요소를 건너뛴 후 다음 2개를 출력하세요.
- **문제 파일:** [ex18_skip_limit.md](ex18/ex18_skip_limit.md)
- **소스 코드:** [Ex18SkipLimit.java](ex18/Ex18SkipLimit.java)

### [19] Stream flatMap
- **난이도:** 중
- **설명:** 문자열 리스트의 각 문자를 분리하여 모두 출력하세요.
- **문제 파일:** [ex19_flatmap.md](ex19/ex19_flatmap.md)
- **소스 코드:** [Ex19FlatMap.java](ex19/Ex19FlatMap.java)

### [20] Stream allMatch/noneMatch
- **난이도:** 중
- **설명:** 리스트의 모든 숫자가 양수인지, 아니면 모두 음수인지 확인하세요.
- **문제 파일:** [ex20_allmatch_nonematch.md](ex20/ex20_allmatch_nonematch.md)
- **소스 코드:** [Ex20AllMatchNoneMatch.java](ex20/Ex20AllMatchNoneMatch.java)

### [21] Stream reduce (합계)
- **난이도:** 중
- **설명:** 리스트의 모든 숫자를 더한 합계를 구하세요.
- **문제 파일:** [ex21_stream_reduce.md](ex21/ex21_stream_reduce.md)
- **소스 코드:** [Ex21StreamReduce.java](ex21/Ex21StreamReduce.java)

### [22] Stream groupingBy (기본)
- **난이도:** 중
- **설명:** 정수 리스트를 숫자의 홀짝 여부로 그룹화하세요.
- **문제 파일:** [ex22_groupingby_basic.md](ex22/ex22_groupingby_basic.md)
- **소스 코드:** [Ex22GroupingByBasic.java](ex22/Ex22GroupingByBasic.java)

### [23] Stream partitioningBy
- **난이도:** 중
- **설명:** 정수 리스트를 50 이상과 50 미만으로 분할하세요.
- **문제 파일:** [ex23_partitioningby.md](ex23/ex23_partitioningby.md)
- **소스 코드:** [Ex23PartitioningBy.java](ex23/Ex23PartitioningBy.java)

### [24] Stream toMap
- **난이도:** 중
- **설명:** (key, value) 쌍의 리스트를 Map으로 변환하세요.
- **문제 파일:** [ex24_stream_tomap.md](ex24/ex24_stream_tomap.md)
- **소스 코드:** [Ex24StreamToMap.java](ex24/Ex24StreamToMap.java)

### [25] filter + groupingBy 조합
- **난이도:** 중
- **설명:** 문자열 리스트를 길이 3 이상인 것들만 문자열 길이별로 그룹화하세요.
- **문제 파일:** [ex25_filter_groupingby.md](ex25/ex25_filter_groupingby.md)
- **소스 코드:** [Ex25FilterGroupingBy.java](ex25/Ex25FilterGroupingBy.java)

### [26] groupingBy with counting
- **난이도:** 중
- **설명:** 문자열 리스트에서 문자열 길이별 개수를 구하세요.
- **문제 파일:** [ex26_groupingby_counting.md](ex26/ex26_groupingby_counting.md)
- **소스 코드:** [Ex26GroupingByCounting.java](ex26/Ex26GroupingByCounting.java)

### [27] Stream with custom class (Student)
- **난이도:** 중
- **설명:** 학생 객체 리스트에서 점수 70점 이상인 학생만 필터링하여 이름을 출력하세요.
- **문제 파일:** [ex27_stream_custom_class.md](ex27/ex27_stream_custom_class.md)
- **소스 코드:** [Ex27StreamCustomClass.java](ex27/Ex27StreamCustomClass.java)

### [28] Stream 객체 정렬
- **난이도:** 중
- **설명:** Product 객체 리스트를 가격 오름차순으로 정렬하여 출력하세요.
- **문제 파일:** [ex28_stream_object_sort.md](ex28/ex28_stream_object_sort.md)
- **소스 코드:** [Ex28StreamObjectSort.java](ex28/Ex28StreamObjectSort.java)

### [29] Stream 객체 groupingBy
- **난이도:** 중
- **설명:** Employee 리스트를 부서(Department)별로 그룹화하세요.
- **문제 파일:** [ex29_stream_object_grouping.md](ex29/ex29_stream_object_grouping.md)
- **소스 코드:** [Ex29StreamObjectGrouping.java](ex29/Ex29StreamObjectGrouping.java)

### [30] Stream 종단 작업 (터미널 오퍼레이션 조합)
- **난이도:** 중
- **설명:** Book 리스트에서 2000원 이상인 도서의 총 수량과 평균 가격을 구하세요.
- **문제 파일:** [ex30_stream_terminal_ops.md](ex30/ex30_stream_terminal_ops.md)
- **소스 코드:** [Ex30StreamTerminalOps.java](ex30/Ex30StreamTerminalOps.java)

### [31] Stream IntSummaryStatistics
- **난이도:** 상
- **설명:** 숫자 리스트의 통계 정보를 구하세요.
- **문제 파일:** [ex31_summarystatistics.md](ex31/ex31_summarystatistics.md)
- **소스 코드:** [Ex31SummaryStatistics.java](ex31/Ex31SummaryStatistics.java)

### [32] Stream filter + sorted + distinct 조합
- **난이도:** 상
- **설명:** 정수 리스트에서 30 이상인 숫자만 선택하여 중복을 제거하고 오름차순 정렬하세요.
- **문제 파일:** [ex32_filter_distinct_sorted.md](ex32/ex32_filter_distinct_sorted.md)
- **소스 코드:** [Ex32FilterDistinctSorted.java](ex32/Ex32FilterDistinctSorted.java)

### [33] Stream findFirst/findAny
- **난이도:** 상
- **설명:** 정수 리스트에서 50보다 큰 첫 번째 숫자를 찾으세요.
- **문제 파일:** [ex33_findfirst_findany.md](ex33/ex33_findfirst_findany.md)
- **소스 코드:** [Ex33FindFirstFindAny.java](ex33/Ex33FindFirstFindAny.java)

### [34] Stream 객체 리스트 복잡 처리
- **난이도:** 상
- **설명:** 학생 리스트에서 점수 80점 이상인 학생만 선택하여 이름으로 정렬한 후, 상위 3명의 이름을 출력하세요.
- **문제 파일:** [ex34_complex_object_stream.md](ex34/ex34_complex_object_stream.md)
- **소스 코드:** [Ex34ComplexObjectStream.java](ex34/Ex34ComplexObjectStream.java)

### [35] Stream reduce (최댓값 찾기)
- **난이도:** 상
- **설명:** 정수 리스트에서 reduce()를 사용하여 최댓값을 구하세요.
- **문제 파일:** [ex35_reduce_maxvalue.md](ex35/ex35_reduce_maxvalue.md)
- **소스 코드:** [Ex35ReduceMaxValue.java](ex35/Ex35ReduceMaxValue.java)

### [36] Stream 문자열 joining
- **난이도:** 상
- **설명:** 문자를 리스트의 요소들을 쉼표로 연결한 문자열로 만드세요.
- **문제 파일:** [ex36_stream_joining.md](ex36/ex36_stream_joining.md)
- **소스 코드:** [Ex36StreamJoining.java](ex36/Ex36StreamJoining.java)

### [37] Stream groupingBy with summingInt
- **난이도:** 상
- **설명:** 주문 리스트에서 고객별 총 주문액을 구하세요.
- **문제 파일:** [ex37_groupingby_summingint.md](ex37/ex37_groupingby_summingint.md)
- **소스 코드:** [Ex37GroupingBySummingInt.java](ex37/Ex37GroupingBySummingInt.java)

### [38] Stream flatMap 2개 리스트 합치기
- **난이도:** 상
- **설명:** 2개의 숫자 리스트를 하나로 합치고 정렬하세요.
- **문제 파일:** [ex38_flatmap_merge_lists.md](ex38/ex38_flatmap_merge_lists.md)
- **소스 코드:** [Ex38FlatMapMergeLists.java](ex38/Ex38FlatMapMergeLists.java)

### [39] Stream 조건부 groupingBy
- **난이도:** 상
- **설명:** 학생 리스트를 성별로 분류한 후, 각 그룹에서 점수 기준 내림차순으로 정렬하세요.
- **문제 파일:** [ex39_conditional_groupingby.md](ex39/ex39_conditional_groupingby.md)
- **소스 코드:** [Ex39ConditionalGroupingBy.java](ex39/Ex39ConditionalGroupingBy.java)

### [40] Stream 여러 메서드 조합 (종합)
- **난이도:** 상
- **설명:** 거래 리스트에서 100,000원 이상인 거래만 선택하여 고객별로 그룹화하고, 각 고객별 총액을 구한 후, 내림차순으로 정렬하여 상위 3개를 출력하세요.
- **문제 파일:** [ex40_comprehensive_stream.md](ex40/ex40_comprehensive_stream.md)
- **소스 코드:** [Ex40ComprehensiveStream.java](ex40/Ex40ComprehensiveStream.java)

### [41] Stream IntStream.range
- **난이도:** 상
- **설명:** 1부터 20까지의 숫자 중 3의 배수만 필터링하여 합계와 개수를 출력하세요.
- **문제 파일:** [ex41_intstream_range.md](ex41/ex41_intstream_range.md)
- **소스 코드:** [Ex41IntStreamRange.java](ex41/Ex41IntStreamRange.java)

### [42] Stream peek (디버깅)
- **난이도:** 상
- **설명:** 또메인 stream에서 짝수만 필터링한 후, 디버깅 정보를 출력하면서 2배로 변환하세요.
- **문제 파일:** [ex42_stream_peek.md](ex42/ex42_stream_peek.md)
- **소스 코드:** [Ex42StreamPeek.java](ex42/Ex42StreamPeek.java)

### [43] Stream 객체 distinctBy
- **난이도:** 상
- **설명:** 제목으로 중복을 확인하는 도서(Book) 리스트를 필터링하세요.
- **문제 파일:** [ex43_stream_distinctby.md](ex43/ex43_stream_distinctby.md)
- **소스 코드:** [Ex43StreamDistinctBy.java](ex43/Ex43StreamDistinctBy.java)

### [44] Stream groupingBy 다층 구조
- **난이도:** 상
- **설명:** 상품(Product) 리스트를 카테고리별, 그 다음 가격대별로 그룹화하세요.
- **문제 파일:** [ex44_nested_groupingby.md](ex44/ex44_nested_groupingby.md)
- **소스 코드:** [Ex44NestedGroupingBy.java](ex44/Ex44NestedGroupingBy.java)

### [45] Stream 정렬 (여러 기준)
- **난이도:** 상
- **설명:** 학생(Student) 리스트를 점수 내림차순, 동점이면 이름 오름차순으로 정렬하세요.
- **문제 파일:** [ex45_multi_sorting.md](ex45/ex45_multi_sorting.md)
- **소스 코드:** [Ex45MultiSorting.java](ex45/Ex45MultiSorting.java)

### [46] Stream 문자열 스트림 처리
- **난이도:** 상
- **설명:** 문자열 문장을 단어로 분리하여 단어 길이별로 그룹화하고, 각 그룹에서 길이 기준 정렬하세요.
- **문제 파일:** [ex46_string_stream_process.md](ex46/ex46_string_stream_process.md)
- **소스 코드:** [Ex46StringStreamProcess.java](ex46/Ex46StringStreamProcess.java)

### [47] Stream collect (커스텀 컬렉션)
- **난이도:** 상
- **설명:** 숫자 리스트를 두 개의 리스트로 분리하세요: 하나는 짝수, 하나는 홀수.
- **문제 파일:** [ex47_custom_collect.md](ex47/ex47_custom_collect.md)
- **소스 코드:** [Ex47CustomCollect.java](ex47/Ex47CustomCollect.java)

### [48] Stream parallelStream
- **난이도:** 상
- **설명:** 1부터 1,000,000까지의 숫자 중 소수의 개수를 일반 stream과 parallelStream으로 각각 구하세요.
- **문제 파일:** [ex48_parallelstream.md](ex48/ex48_parallelstream.md)
- **소스 코드:** [Ex48ParallelStream.java](ex48/Ex48ParallelStream.java)

### [49] Stream 조건부 Map
- **난이도:** 상
- **설명:** 판매기록(Sale) 리스트에서 판매액이 100,000원 이상이면 판매액, 미만이면 0으로 변환하여 합계를 구하세요.
- **문제 파일:** [ex49_conditional_map.md](ex49/ex49_conditional_map.md)
- **소스 코드:** [Ex49ConditionalMap.java](ex49/Ex49ConditionalMap.java)

### [50] Stream 종합 실습 (회원 관리)
- **난이도:** 상
- **설명:** 회원(Member) 리스트에서: 1. 나이 18세 이상만 필터링 2. 각 회원을 "이름(나이)" 형식의 문자열로 변환 3. 이름 오름차순 정렬 4. 최대 5명 선택 5. 쉼표로 구분한 문자열로 변환
- **문제 파일:** [ex50_final_comprehensive.md](ex50/ex50_final_comprehensive.md)
- **소스 코드:** [Ex50FinalComprehensive.java](ex50/Ex50FinalComprehensive.java)
