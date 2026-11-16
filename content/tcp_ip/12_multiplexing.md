### 📌 1. IO 멀티플렉싱의 개념과 등장 배경

#### (1) 멀티프로세스 서버의 한계와 대안

* **멀티프로세스 서버의 단점**:
* 클라이언트 연결마다 프로세스를 빈번하게 생성하므로 **성능 저하**가 발생합니다.


* 다중 프로세스의 실행 흐름을 제어하고 구현하기가 어렵습니다.


* 프로세스 간 통신(IPC)이 필요한 경우 구현이 훨씬 복잡해집니다.




* **대안 (IO 멀티플렉싱)**:
* **하나의 프로세스**가 여러 개의 소켓(파일 디스크립터)을 동시에 관리하며 다수의 클라이언트에게 서비스를 제공하는 방식입니다.





#### (2) 멀티플렉싱(Multiplexing)의 원리

* **정의**: **하나의 리소스(통신 채널/프로세스)를 둘 이상의 영역에서 공유**하는 기법입니다.


* **동작 방식**: 서버 프로세스가 주기적으로 데이터를 전송해 오는 클라이언트가 있는지 관찰하다가, 이벤트(데이터 수신 등)가 발견된 클라이언트로부터 데이터를 수신해 처리합니다.



---

### 📌 2. `select` 함수의 이해와 사용 절차

`select` 함수를 사용하면 한 곳에 모아둔 다수의 파일 디스크립터를 대상으로 **3가지 상태 변화**를 한 번에 관찰할 수 있습니다:

1. **수신한 데이터**를 지니고 있는 소켓이 존재하는가? (Read)


2. **블로킹되지 않고 데이터의 전송**이 가능한 소켓은 무엇인가? (Write)


3. **예외 상황**이 발생한 소켓은 무엇인가? (Exception)



#### `select` 함수 호출 3단계 (★ 시험 단골)

* **Step 1. 준비 단계**: 파일 디스크립터의 설정 ➡️ 검사 범위(`maxfd`) 지정 ➡️ 타임아웃(`timeval`) 설정


* **Step 2. 호출 단계**: `select()` 함수 호출


* **Step 3. 확인 단계**: 호출 결과 반환값 및 변화가 발생한 파일 디스크립터 확인



---

### 📌 3. `fd_set` 비트배열과 매크로 함수

파일 디스크립터의 관찰 여부를 등록할 때는 `0`과 `1`로 이루어진 비트 배열 구조체인 `fd_set`을 사용하며, 아래 4가지 전용 매크로 함수로 조작합니다:

| 매크로 함수 | 기능 설명 |
| --- | --- |
| **`FD_ZERO(fd_set *fdset)`** | `fd_set` 변수의 모든 비트를 `0`으로 초기화

 |
| **`FD_SET(int fd, fd_set *fdset)`** | 매개변수 `fd`로 전달된 파일 디스크립터 정보를 등록 (비트를 `1`로 설정)

 |
| **`FD_CLR(int fd, fd_set *fdset)`** | 매개변수 `fd`로 전달된 파일 디스크립터 정보를 삭제 (비트를 `0`으로 설정)

 |
| **`FD_ISSET(int fd, fd_set *fdset)`** | `fd`로 전달된 파일 디스크립터 정보가 있으면(비트가 `1`이면) 양수(`true`) 반환

 |

---

### 📌 4. `select` 함수 원형 및 핵심 주의사항 (★ 최빈출)

```c
#include <sys/select.h>
#include <sys/time.h>

int select(int maxfd, fd_set *readset, fd_set *writeset, fd_set *exceptset, const struct timeval *timeout);
// 성공 시: 0 이상 반환 (변화가 발생한 파일 디스크립터의 수, 타임아웃 시 0)
// 실패 시: -1 반환

```

#### ⚠️ 시험에 반드시 나오는 3가지 주의사항

1. **첫 번째 인자 (`maxfd`)**:
* 검사 대상이 되는 파일 디스크립터의 개수이므로, 가장 큰 파일 디스크립터 값에 `+ 1`을 해서 전달합니다 (`fd_max + 1`) (파일 디스크립터 번호가 `0`부터 시작하기 때문).




2. **`fd_set` 원본 복사 (`cpy_reads = reads;`)**:
* `select` 함수 호출이 완료되면, **변화가 발생한 디스크립터 위치의 비트만 `1`로 남고 나머지 비트는 모두 `0`으로 초기화**되어 덮어씌워집니다.


* 따라서 원본 관찰 대상을 유지하려면 반드시 **`while` 루프 안에서 `fd_set` 변수를 복사해서(`cpy_reads = reads;`) 전달**해야 합니다.




3. **타임아웃(`timeout`) 매번 재초기화**:
* `select` 호출 후 `timeval` 구조체 변수에는 원래 설정한 시간이 아니라 "타임아웃 발생 직전까지 남은 시간"으로 값이 변경됩니다.


* 따라서 반복문 내에서 `select`를 호출하기 전에 **매번 `tv_sec`와 `tv_usec` 값을 다시 초기화**해야 합니다.





---

### 📌 5. IO 멀티플렉싱 기반 에코 서버 구현 흐름

1. **1단계: 리스닝 소켓(`serv_sock`) 관찰 등록**


* 클라이언트의 연결 요청(`connect`) 역시 서버 소켓으로 들어오는 **일종의 데이터 수신**이므로, `FD_SET(serv_sock, &reads)`를 통해 관찰 대상에 포함시킵니다.


* 초기 최대 디스크립터 값 설정: `fd_max = serv_sock;`




2. **2단계: 루프 내 `select` 호출 및 결과 분기**


* `cpy_reads = reads;`로 복사 및 `timeout` 재설정 후 `select(fd_max + 1, &cpy_reads, 0, 0, &timeout)` 호출.


* 반환값 `fd_num == -1`이면 에러 종료(`break`), `fd_num == 0`이면 타임아웃이므로 `continue`.




3. **3단계: 변화가 발생한 디스크립터 순회 처리 (`0` ~ `fd_max`)**
* 반복문으로 `FD_ISSET(i, &cpy_reads)`가 참인 디스크립터 `i`를 찾습니다.
* **Case A (`i == serv_sock`) — 새로운 연결 요청**:
* `accept()`로 클라이언트 소켓(`clnt_sock`)을 생성하고 `FD_SET(clnt_sock, &reads)`로 관찰 대상에 추가합니다.
* `if (fd_max < clnt_sock) fd_max = clnt_sock;`로 검사 범위를 갱신합니다.


* **Case B (`i != serv_sock`) — 클라이언트 데이터 수신 또는 종료**:
* `read()`로 데이터를 읽습니다.
* `str_len == 0` (EOF 수신, 연결 종료 요청): `FD_CLR(i, &reads)`로 관찰 대상에서 제거하고 `close(i)`로 소켓을 닫습니다.
* `str_len > 0` (데이터 수신): `write(i, buf, str_len)`로 에코 전송합니다.

**Chapter 12. IO 멀티플렉싱(`fd_set` 및 `select`)** 핵심 예시 코드 2가지(`select.c` 기초 예제 + `echo_selectserv.c` 다중접속 에코 서버)입니다.

---

### 1. `fd_set`과 `select()` 기본 동작 예시 (`select.c`)

표준 입력(`0`, 키보드)을 `fd_set`에 등록하고 5초간 입력 여부를 감시하는 가장 기본적인 코드입니다.

```c
#include <stdio.h>
#include <unistd.h>
#include <sys/time.h>
#include <sys/select.h>

#define BUF_SIZE 30

int main(int argc, char *argv[]) {
    fd_set reads, temps;
    int result, str_len;
    char buf[BUF_SIZE];
    struct timeval timeout;

    // 1. fd_set 초기화 및 표준 입력(0번 디스크립터) 등록
    FD_ZERO(&reads);
    FD_SET(0, &reads); // 0 is standard input(console)

    while (1) {
        // 2. 원본 유지를 위해 반드시 복사본(temps)을 select에 전달
        temps = reads;

        // 3. select 호출 전 매번 timeout 값을 재설정해야 함
        timeout.tv_sec = 5;
        timeout.tv_usec = 0;

        // 4. 검사 범위는 최대 디스크립터(0) + 1 = 1 전달
        result = select(1, &temps, 0, 0, &timeout);

        if (result == -1) {
            puts("select() error!");
            break;
        } else if (result == 0) {
            puts("Time-out!"); // 5초 동안 입력이 없을 때
        } else {
            // 5. 변화가 생긴 디스크립터가 0번(표준 입력)인지 확인
            if (FD_ISSET(0, &temps)) {
                str_len = read(0, buf, BUF_SIZE);
                buf[str_len] = 0;
                printf("message from console: %s", buf);
            }
        }
    }
    return 0;
}

```

---

### 2. IO 멀티플렉싱 기반 다중접속 에코 서버 (`echo_selectserv.c`)

`serv_sock`과 여러 `clnt_sock`을 하나의 `fd_set`으로 묶어 처리하는 실전 서버 핵심 루프 코드입니다.

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <sys/select.h>

#define BUF_SIZE 100

int main(int argc, char *argv[]) {
    int serv_sock, clnt_sock;
    struct sockaddr_in serv_adr, clnt_adr;
    struct timeval timeout;
    fd_set reads, cpy_reads;

    socklen_t adr_sz;
    int fd_max, str_len, fd_num, i;
    char buf[BUF_SIZE];

    serv_sock = socket(PF_INET, SOCK_STREAM, 0);
    memset(&serv_adr, 0, sizeof(serv_adr));
    serv_adr.sin_family = AF_INET;
    serv_adr.sin_addr.s_addr = htonl(INADDR_ANY);
    serv_adr.sin_port = htons(atoi(argv[1]));

    bind(serv_sock, (struct sockaddr*)&serv_adr, sizeof(serv_adr));
    listen(serv_sock, 5);

    // 1. fd_set 초기화 및 리스닝 소켓(serv_sock) 등록
    FD_ZERO(&reads);
    FD_SET(serv_sock, &reads);
    fd_max = serv_sock; // 현재 가장 큰 디스크립터 번호

    while (1) {
        cpy_reads = reads; // 원본 보존을 위한 복사
        timeout.tv_sec = 5;
        timeout.tv_usec = 5000;

        // 2. 관찰 범위(fd_max + 1) 전달
        if ((fd_num = select(fd_max + 1, &cpy_reads, 0, 0, &timeout)) == -1)
            break;
        if (fd_num == 0) // 타임아웃 시 다시 대기
            continue;

        // 3. 0부터 fd_max까지 순회하며 변화가 발생한 소켓 탐색
        for (i = 0; i < fd_max + 1; i++) {
            if (FD_ISSET(i, &cpy_reads)) { // 변화가 있는 디스크립터 발견
                if (i == serv_sock) {      // [Case A] 새로운 클라이언트 연결 요청
                    adr_sz = sizeof(clnt_adr);
                    clnt_sock = accept(serv_sock, (struct sockaddr*)&clnt_adr, &adr_sz);
                    FD_SET(clnt_sock, &reads); // 새 클라이언트 소켓을 원본 reads에 등록
                    if (fd_max < clnt_sock)
                        fd_max = clnt_sock;    // 최대 디스크립터 번호 갱신
                    printf("connected client: %d \n", clnt_sock);
                } else {                   // [Case B] 기존 클라이언트의 데이터 수신 또는 종료
                    str_len = read(i, buf, BUF_SIZE);
                    if (str_len == 0) {    // EOF 수신 -> 연결 종료 처리
                        FD_CLR(i, &reads); // 원본 reads에서 해당 소켓 비트 삭제
                        close(i);
                        printf("closed client: %d \n", i);
                    } else {               // 수신한 데이터 에코 전송
                        write(i, buf, str_len);
                    }
                }
            }
        }
    }
    close(serv_sock);
    return 0;
}

```

---

### 🔍 코드 핵심 포인트 요약

* **`temps = reads;` (`cpy_reads = reads;`)**: `select()`가 끝나면 이벤트가 발생한 비트만 `1`로 남고 나머지는 `0`으로 초기화되므로 매 반복마다 원본을 복사해서 넘깁니다.
* **`fd_max + 1`**: 파일 디스크립터 번호는 `0`부터 시작하므로 `가장 큰 번호 + 1`이 총 검사 개수가 됩니다.
* **`FD_CLR(i, &reads)`**: 클라이언트 연결이 끊어졌을 때(`read() == 0`) 반드시 원본 `fd_set`에서 해당 비트를 지워주어야 다음 `select()`에서 닫힌 소켓을 감시하지 않습니다.