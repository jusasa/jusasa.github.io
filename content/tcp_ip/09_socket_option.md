### 📌 1. 소켓 옵션의 계층(Protocol Level)별 분류 & Get/Set 가능 여부

소켓의 동작 특성을 확인하고 변경할 때 소켓 옵션을 사용하며, 각 옵션은 해당하는 프로토콜 계층별로 분류됩니다.

| 프로토콜 레벨 (Level) | 옵션 이름 (Option Name) | 조회 (Get) | 설정 (Set) | 주요 의미 및 특징 |
| --- | --- | --- | --- | --- |
| **SOL_SOCKET** | **SO_SNDBUF** | O | O | 송신 버퍼 크기 제어|
|(소켓 기본 계층) | **SO_RCVBUF** <br> | O | O | 수신 버퍼 크기 제어|
||**SO_REUSEADDR**| **O** | **O**| Time-wait 상태인 IP/Port 재할당 허용
|  | **SO_KEEPALIVE**| **O**| **O**| 연결 유지 상태 주기적 확인
|  | **SO_BROADCAST**| **O**| **O**| 브로드캐스트 데이터 전송 허용
|  | ⚠️ **SO_TYPE** | **O**| **X (불가)**| **소켓 타입(TCP/UDP) 확인 (생성 시 고정되므로 변경 불가, ★시험 단골)**
|  | ⚠️ **SO_ERROR**| **O**| **X (불가)**| **발생한 에러 코드 확인 (조회 전용, 설정 불가)**|
| **IPPROTO_IP**<br>(IP 계층)| **IP_TOS**, **IP_TTL**<br>**IP_MULTICAST_TTL** 등| **O**| **O**| 패킷 수명(TTL), 멀티캐스트 설정 등 IP 프로토콜 제어|
| **IPPROTO_TCP**<br><br>(TCP 계층)| **TCP_NODELAY**| **O**| **O**| **네이글(Nagle) 알고리즘 해제 여부 설정 (★시험 단골)**|
|  | **TCP_MAXSEG**| **O**| **O**| 최대 세그먼트 크기(MSS) 설정|

---

### 📌 2. 소켓 옵션 제어 함수 (getsockopt vs setsockopt)

옵션을 읽어올 때와 변경할 때 사용하는 함수의 시그니처와 **마지막 5번째 매개변수의 형태 차이**를 반드시 구분해야 합니다.

```c
#include <sys/socket.h>

// 1) 옵션 상태 확인 (Get)
int getsockopt(int sock, int level, int optname, void *optval, socklen_t *optlen); // 성공 시 0, 실패 시 -1[cite: 1, 2]

// 2) 옵션 상태 변경 (Set)
int setsockopt(int sock, int level, int optname, const void *optval, socklen_t optlen); // 성공 시 0, 실패 시 -1[cite: 1, 2]

```

* **5번째 인자(`optlen`)의 결정적 차이**:


* `getsockopt`: 호출 전 전달할 버퍼의 크기를 담아 넘기고, 함수 호출 후 실제 반환된 옵션 크기(byte 단위)가 기록되므로 포인터 타입(`socklen_t *optlen`)을 전달합니다.


* `setsockopt`: 변경하고자 하는 옵션 정보 버퍼의 크기 자체를 전달하므로 단순 값 타입(`socklen_t optlen`)을 전달합니다.





---

### 📌 3. 핵심 4대 옵션 집중 분석

#### ① SO_TYPE (소켓 타입 확인)



* 소켓의 전송 방식인 연결지향형(TCP, `SOCK_STREAM`)인지, 비연결지향형(UDP, `SOCK_DGRAM`)인지를 정수 값으로 확인합니다.


* **불가 사유**: 소켓 타입은 `socket()` 함수 호출 시 커널에서 한 번 결정되면 내부 구조가 고정되므로 중간에 변경할 수 없습니다 (`Get: O, Set: X`).


* **실행 결과 분석 (`sock_type.c`)**:


```c
printf("SOCK_STREAM: %d \n", SOCK_STREAM); // 출력: 1[cite: 2]
printf("SOCK_DGRAM: %d \n", SOCK_DGRAM);   // 출력: 2[cite: 2]

```



#### ② SO_SNDBUF & SO_RCVBUF (송수신 버퍼 크기 제어)



* 커널에 할당된 송신 버퍼(`SO_SNDBUF`)와 수신 버퍼(`SO_RCVBUF`)의 크기를 확인 및 변경합니다.


* **버퍼 설정의 커널 동작 특성 (강의 슬라이드 해석)**:


* **버퍼를 `0`으로 설정할 때**: 실제 값이 0이 되지 않음. 0이 되면 TCP/IP 프로토콜 자체가 작동할 수 없으므로, OS 커널이 프로토콜 동작이 가능한 최소 크기로 자동 보정합니다.
* **버퍼를 매우 크게 설정할 때**: 커널 메모리는 한정된 고비용 자원이므로 사용자가 요구한 크기 그대로 100% 반영되지 않고, OS의 버퍼 관리 정책에 따라 유사한 상한선 크기로 조정됩니다.





#### ③ Time-wait 상태와 SO_REUSEADDR (★ 최빈출)



* **Time-wait 발생 원인**: Four-way Handshaking 종료 과정에서 먼저 `close()`를 호출한 측(Active Close 호스트)에 발생합니다.


* **서버에서의 문제점**:
* 서버 프로세스가 예기치 않게 종료되거나 재부팅되었을 때, 소켓이 Time-wait 상태에 머물러 있으면 해당 포트가 커널에 묶여 있게 됩니다.


* 서버를 즉시 재실행하면 `bind() error (Address already in use / EADDRINUSE)`가 발생하며 서비스가 시작되지 않습니다.




* **해결 방법**: `SO_REUSEADDR`을 `1(TRUE)`로 설정하여 Time-wait 상태에 있는 포트라도 새 소켓에 즉각 재할당(Re-bind)할 수 있도록 허용합니다.


```c
int option = TRUE;
socklen_t optlen = sizeof(option);
setsockopt(serv_sock, SOL_SOCKET, SO_REUSEADDR, (void*)&option, optlen); //[cite: 1]

```



#### ④ 네이글(Nagle) 알고리즘과 TCP_NODELAY



* **네이글 알고리즘 동작 원리**:
* 앞서 전송한 패킷에 대한 **ACK를 수신해야만** 출력 버퍼에 모인 다음 데이터를 전송하는 방식입니다.


* **장점**: 작은 크기의 패킷(헤더 오버헤드 낭비)을 난발하지 않아 **네트워크 트래픽 효율이 극대화**됩니다.


* **단점**: ACK가 올 때까지 전송이 대기되므로 전송 지연(Latency)이 발생합니다.




* **네이글 끄기 (TCP_NODELAY 설정)**:
* 실시간 게임, 대용량 파일 전송, 빠른 응답성이 요구되는 경우 `IPPROTO_TCP` 레벨의 `TCP_NODELAY` 옵션을 `1(TRUE)`로 설정하여 네이글 알고리즘을 비활성화합니다.




```c
int opt_val = 1;
setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)&opt_val, sizeof(opt_val));

```



---

### 📝 실전 시험 족집게 체크리스트

1. **Get/Set 불가 옵션 2개**: `SO_TYPE`, `SO_ERROR` (`SOL_SOCKET` 레벨).


2. **함수 인자 타입**: `getsockopt`의 5번째 인자는 `socklen_t *optlen`, `setsockopt`는 `socklen_t optlen`.


3. **Time-wait 발생 측**: `Active Close`(연결 종료를 먼저 요청한 쪽).


4. **네이글 해제 옵션**: 레벨은 `IPPROTO_TCP`, 옵션명은 `TCP_NODELAY`.