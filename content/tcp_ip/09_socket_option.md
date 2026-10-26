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


**9주차 2차시 [Chapter 09-2 & 09-3: SO_REUSEADDR & TCP_NODELAY]** 집중 공략 정리입니다!

---

### 📌 1. Time-wait 상태의 이해와 발생 원인

#### (1) Active Close vs Passive Close

* **Active Close (능동적 종료)**: 연결 종료를 위해 Four-way handshaking의 **첫 번째 `FIN` 패킷을 먼저 전송한 호스트**입니다.


* **Passive Close (수동적 종료)**: 상대방의 `FIN`을 받고 연결을 닫는 호스트입니다.
* ⚠️ **핵심**: **Time-wait 상태는 오직 먼저 종료(`close()`)를 호출한 Active Close 측에서만 발생**합니다! (클라이언트든 서버든 상관없이 먼저 닫은 쪽에 발생).



#### (2) Time-wait은 왜 필요한가? (존재 이유)

* Four-way handshaking의 마지막 단계에서 Active Close 호스트는 상대방의 `FIN`에 대한 최종 `ACK`를 보냅니다.
* 만약 이 **마지막 `ACK` 패킷이 네트워크 상에서 유실**되면, 상대방은 `FIN`을 다시 재전송하게 됩니다.
* 이때 소켓이 즉시 사라져 버리면, 재전송된 `FIN` 패킷에 대해 OS가 소켓을 찾지 못해 비정상 종료를 뜻하는 `RST` 패킷을 보내게 됩니다.
* 따라서 **마지막 `ACK`가 유실되더라도 상대방의 재전송 `FIN`을 정상 수신하고 다시 `ACK`를 보내줄 수 있도록 일정 시간(수 분간) 소켓을 남겨두는 것**이 바로 **Time-wait** 상태입니다.

---

### 📌 2. 주소할당 에러(bind() error)와 서버의 문제점

#### (1) 서버에서 Time-wait이 치명적인 이유

* **클라이언트**가 먼저 닫는 경우: 클라이언트는 커널이 임의의 남는 포트(동적 포트)를 배정하므로 Time-wait 상태여도 큰 문제가 없습니다.
* **서버**가 먼저 닫는 경우 (콘솔에서 `Ctrl + C`로 강제 종료하거나 오류로 재부팅될 때):


* 서버 소켓이 Active Close가 되어 **서버의 고정 포트 번호가 Time-wait 상태**로 묶이게 됩니다.


* 관리자가 서버를 즉시 재실행하려고 하면 해당 포트가 커널에 점유되어 있으므로 `bind() error (Address already in use / EADDRINUSE)`가 발생하며 서버가 켜지지 않습니다.


* Time-wait 타이머(약 2~3분)가 완전히 끝날 때까지 서비스가 중단되는 문제가 발생합니다.



---

### 📌 3. 해결책: `SO_REUSEADDR` 옵션

#### (1) 개념

* **`SO_REUSEADDR`**: Time-wait 상태에 놓여 있는 IP와 Port 번호라도, 새로운 소켓에 **즉시 재할당(Re-bind)할 수 있도록 허용**하는 옵션입니다.


* 기본값은 `0(FALSE)`으로 꺼져 있으며, 이를 `1(TRUE)`로 변경해 줍니다.



#### (2) 코드 패턴 (★ 단골 빈칸 출제 코드)

```c
int serv_sock;
int option;
socklen_t optlen;

serv_sock = socket(PF_INET, SOCK_STREAM, 0);

optlen = sizeof(option);
option = 1; // 또는 TRUE (1로 활성화)[cite: 1, 2]

// SOL_SOCKET 레벨의 SO_REUSEADDR 옵션을 켜줌[cite: 1, 2]
setsockopt(serv_sock, SOL_SOCKET, SO_REUSEADDR, (void*)&option, optlen); //[cite: 1, 2]

// 이후 평소처럼 bind() -> listen() 진행
bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr));

```

---

### 📌 4. [Chapter 09-3] 네이글(Nagle) 알고리즘 & `TCP_NODELAY`

#### (1) 네이글(Nagle) 알고리즘이란?

* **동작 원리**: **"앞서 전송한 패킷에 대한 ACK를 수신해야만 다음 데이터를 전송한다."** (단, 데이터가 MSS만큼 가득 차면 ACK 없이 즉시 전송).


* **장점**: 작은 크기의 패킷(헤더 낭비)을 난발하지 않아서 **네트워크 트래픽 효율이 극대화**됩니다.


* **단점**: ACK가 올 때까지 전송을 대기(버퍼링)하므로 전송 지연(Latency)이 발생합니다.



#### (2) 네이글 알고리즘을 꺼야(Off) 하는 경우

* **사용 사례**: 실시간 온라인 게임, 원격 마우스/키보드 입력(Telnet), 대용량 파일 전송(이미 패킷이 꽉 차서 버퍼링이 무의미한 경우)처럼 **즉각적인 응답성이 중요한 환경**.


* **옵션 설정**:
* 레벨: **`IPPROTO_TCP`**


* 옵션명: **`TCP_NODELAY`**


* 값: `1(TRUE)`로 설정하면 네이글 알고리즘이 비활성화됩니다.





```c
int opt_val = 1;
setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)&opt_val, sizeof(opt_val)); //[cite: 2]

```

---

### 📝 시험 직전 3초 암기 족집게 포인트

1. **Time-wait이 걸리는 주체**: `FIN`을 먼저 보낸 **Active Close** 측.


2. **서버 즉시 재시작 시 bind() 에러 원인**: 포트가 **Time-wait** 상태로 점유되어 있어서.


3. **Time-wait 포트 재사용 옵션**: `SOL_SOCKET` 레벨의 **`SO_REUSEADDR`**.


4. **네이글 알고리즘 해제 옵션**: `IPPROTO_TCP` 레벨의 **`TCP_NODELAY`**.


**9주차 3차시 [Chapter 09-3: TCP_NODELAY & 네이글(Nagle) 알고리즘]** 핵심 정리입니다.

---

### 📌 1. TCP_NODELAY 옵션 개요

* **프로토콜 레벨 (Level)**: `IPPROTO_TCP` (전송 계층)


* **옵션명 (Option Name)**: `TCP_NODELAY`


* **조회(Get) / 설정(Set)**: 모두 가능 (**Get: O, Set: O**)


* **역할**: TCP 소켓에 기본적으로 적용되어 있는 네이글(Nagle) 알고리즘을 해제(Disable)할 때 사용합니다.



---

### 📌 2. 네이글(Nagle) 알고리즘의 동작 원리

#### (1) 네이글 알고리즘이란?

> **"앞서 전송한 데이터에 대한 ACK 메시지를 받아야만, 다음 데이터를 전송하는 알고리즘"**
>
>

* **도입 목적**: 네트워크에 작은 크기의 패킷(헤더 오버헤드)이 과도하게 쏟아져 **트래픽이 폭증하고 전송 속도가 저하되는 것을 방지**하기 위해 설계되었습니다.


* **기본 동작**: 소켓은 생성 시 **기본적으로 네이글 알고리즘이 켜져(적용되어) 있습니다**. 특별한 목적이 있는 경우가 아니라면 중단하지 않는 것이 원칙입니다.



#### (2) Nagle ON vs OFF 패킷 흐름 비교 (문자열 `"Nagle"` 전송 예시)



* **Nagle ON (알고리즘 적용 시)**:


1. 첫 글자 `'N'`을 즉시 패킷으로 전송.


2. `'N'`에 대한 **ACK가 올 때까지** 이후 입력된 데이터(`'a'`, `'g'`, `'l'`, `'e'`)를 보내지 않고 출력 버퍼에 모아둠.


3. ACK가 도착하면 버퍼에 모인 `"agle"`을 한 번의 패킷으로 묶어서 전송.




* 👉 **총 송수신 패킷 수: 4개** (효율적인 네트워크 트래픽)




* **Nagle OFF (알고리즘 해제 시)**:


1. 데이터가 생길 때마다 버퍼링 없이 즉시 전송 (`'N'`, `'a'`, `'g'`, `'l'`, `'e'` 각각 1문자씩 전송).


2. 상대방도 각 패킷마다 개별 ACK를 반환.




* 👉 **총 송수신 패킷 수: 10개** (작은 패킷 남발로 네트워크 트래픽 오버헤드 급증)





---

### 📌 3. 네이글 알고리즘의 장단점 및 고려사항

1. **장점**: 네트워크의 효율성이 높아집니다 (송수신 패킷 수 최소화).


2. **단점**: 전송 속도(반응 속도)가 느려질 수 있습니다 (이전 패킷의 ACK가 수신될 때까지 대기 시간 발생).


3. **생각해 볼 문제**:
* **네이글 알고리즘의 중단이 데이터 전송 속도를 무조건 향상시켜 주는 것은 아닙니다**.


* 대용량 파일 전송의 경우 이미 버퍼가 가득 차서 계속해서 전송되므로 네이글 해제의 효과가 미미할 수 있으며, 오히려 작은 패킷이 난발되면 전체 네트워크 성능이 저하될 수 있습니다.


* 반면, **실시간 게임, 마우스 좌표 전송 등 즉각적인 반응성(Low-latency)이 필수적인 인터랙티브 통신**에서는 네이글을 끄는 것이 유리합니다.



---

### 📌 4. TCP_NODELAY 설정 및 확인 코드 (C언어)

#### (1) 네이글 알고리즘 중단(해제) 코드



* `0 (FALSE)`: 네이글 알고리즘 적용 (기본값)


* `1 (TRUE)`: 네이글 알고리즘 해제



```c
#include <netinet/tcp.h>
#include <sys/socket.h>

int opt_val = 1; // 1 (TRUE): 네이글 해제[cite: 1]
setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)&opt_val, sizeof(opt_val)); //[cite: 1]

```

#### (2) 네이글 알고리즘 설정 상태 확인 코드



```c
int opt_val;
socklen_t opt_len = sizeof(opt_val); //[cite: 1]

getsockopt(sock, IPPROTO_TCP, TCP_NODELAY, (void*)&opt_val, &opt_len); //[cite: 1]

```

---

### 📌 5. `tcpdump`를 이용한 네이글 알고리즘 분석

* **`tcpdump` 개념**: 서버/클라이언트 간에 오가는 네트워크 패킷을 캡처하여 확인하는 프로그램 (리눅스 기본 패키지).


* **분석 결과**: `tcpdump`로 패킷을 캡처해 보면, **Nagle을 껐을 때(미사용 시) 훨씬 더 많은 양의 패킷이 오가는 것을 직접 확인**할 수 있습니다. 버퍼를 이용해 서너 번에 보낼 수 있는 데이터를 수십, 수백 번의 통신으로 쪼개 보내기 때문에 트래픽에 큰 지장을 초래할 수 있습니다.



#### `tcpdump` 주요 명령어 옵션



| 옵션 | 설명 | 예시|
| --- | --- | --- |
| **`-c count`** | 지정한 개수만큼 패킷을 수신하고 종료| `tcpdump -c 10` (10개 수신)|
| **`-i interface`** | 특정 네트워크 인터페이스를 경유하는 패킷 출력| `tcpdump -i eth2`|
| **`-w file`** | 캡처한 패킷 내용을 파일(.pcap)로 저장| `tcpdump -w abc.pcap /temp`|
| **`-r file`** | 저장된 캡처 파일로부터 패킷을 읽어들임| `tcpdump -r abc.pcap /temp`|
| **`-v`** | 패킷 내용을 자세히(상세 정보) 보기| `tcpdump -vi eth0`|
| **`-n`** | IP 주소 및 포트 번호를 이름(도메인/서비스명)으로 번역하지 않고 숫자로 출력| `tcpdump -n`|
| **`-N`** | 호스트 이름 출력 시 도메인을 생략| `tcpdump -N`|
| **`-q`** | 프로토콜 정보를 간략히(출력 최소화) 표시| `tcpdump -q`|

---

### 📝 시험 직전 3초 요약 족집게 포인트

1. **네이글 정의**: 이전 전송 데이터의 **ACK를 받아야만** 다음 데이터를 전송.


2. **소켓 기본값**: 네이글 알고리즘 **기본 적용 (Default: ON, `0`)**.


3. **네이글 끄는 옵션**: 레벨은 **`IPPROTO_TCP`**, 옵션명은 **`TCP_NODELAY`**, 값은 **`1 (TRUE)`**.


4. **네이글 패킷 수**: Nagle ON일 때 패킷 수가 현저히 적고, Nagle OFF일 때 패킷 수가 급증함.