---
emoji: 📂
title: C 언어 파일 입출력
date: '2024-06-18'
author: 심우진
tags: C언어 입출력구현
categories: 기초공부
---

## C 언어 파일 입출력

### 개요
C 언어에서 파일 입출력은 데이터를 파일에 저장하고, 파일에서 데이터를 읽어오는 작업을 의미한다. 이를 통해 프로그램은 영속적인 데이터를 다룰 수 있다. C 언어는 표준 라이브러리를 통해 파일 입출력을 지원한다.

### 파일 열기와 닫기

#### 파일 열기 (`fopen`)
`fopen` 함수는 파일을 열고, 파일에 대한 포인터를 반환한다. 파일을 열 때는 모드를 지정해야 한다. 주요 모드는 다음과 같다:
- `"r"`: 읽기 모드 (파일이 존재해야 함)
- `"w"`: 쓰기 모드 (파일이 없으면 생성, 있으면 덮어씀)
- `"a"`: 추가 모드 (파일이 없으면 생성, 있으면 끝에 추가)
- `"r+"`: 읽기 및 쓰기 모드 (파일이 존재해야 함)
- `"w+"`: 읽기 및 쓰기 모드 (파일이 없으면 생성, 있으면 덮어씀)
- `"a+"`: 읽기 및 추가 모드 (파일이 없으면 생성, 있으면 끝에 추가)

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "r"); // 읽기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    // 파일 작업...

    fclose(file); // 파일 닫기
    return 0;
}
```

#### 파일 닫기 (`fclose`)
`fclose` 함수는 열린 파일을 닫는다. 파일을 닫지 않으면 데이터 손실이나 메모리 누수가 발생할 수 있다.

```c
fclose(file);
```

### 파일 쓰기

#### 문자 단위 쓰기 (`fputc`)
`fputc` 함수는 파일에 문자를 쓴다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "w"); // 쓰기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    fputc('A', file); // 파일에 문자 'A' 쓰기

    fclose(file); // 파일 닫기
    return 0;
}
```

#### 문자열 쓰기 (`fputs`)
`fputs` 함수는 파일에 문자열을 쓴다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "w"); // 쓰기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    fputs("Hello, World!", file); // 파일에 문자열 쓰기

    fclose(file); // 파일 닫기
    return 0;
}
```

#### 형식화된 출력 (`fprintf`)
`fprintf` 함수는 파일에 형식화된 출력을 쓴다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "w"); // 쓰기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    int num = 42;
    fprintf(file, "Number: %d\n", num); // 파일에 형식화된 문자열 쓰기

    fclose(file); // 파일 닫기
    return 0;
}
```

### 파일 읽기

#### 문자 단위 읽기 (`fgetc`)
`fgetc` 함수는 파일에서 문자를 읽는다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "r"); // 읽기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    char ch = fgetc(file); // 파일에서 문자 읽기
    printf("읽은 문자: %c\n", ch);

    fclose(file); // 파일 닫기
    return 0;
}
```

#### 문자열 읽기 (`fgets`)
`fgets` 함수는 파일에서 문자열을 읽는다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "r"); // 읽기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    char buffer[100];
    if (fgets(buffer, 100, file) != NULL) { // 파일에서 문자열 읽기
        printf("읽은 문자열: %s\n", buffer);
    }

    fclose(file); // 파일 닫기
    return 0;
}
```

#### 형식화된 입력 (`fscanf`)
`fscanf` 함수는 파일에서 형식화된 입력을 읽는다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.txt", "r"); // 읽기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    int num;
    fscanf(file, "Number: %d", &num); // 파일에서 형식화된 입력 읽기
    printf("읽은 숫자: %d\n", num);

    fclose(file); // 파일 닫기
    return 0;
}
```

### 파일 위치 지정

#### 파일 위치 변경 (`fseek`)
`fseek` 함수는 파일의 읽기/쓰기 위치를 변경한다. 세 가지 모드가 있다:
- `SEEK_SET`: 파일의 시작 위치
- `SEEK_CUR`: 현재 위치
- `SEEK_END`: 파일의 끝 위치

```c
fseek(file, 0, SEEK_SET); // 파일의 시작으로 이동
```

#### 파일 위치 얻기 (`ftell`)
`ftell` 함수는 파일의 현재 위치를 반환한다.

```c
long position = ftell(file); // 현재 파일 위치 얻기
```

### 바이너리 파일 처리

#### 바이너리 쓰기 (`fwrite`)
`fwrite` 함수는 바이너리 데이터를 파일에 쓴다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.bin", "wb"); // 바이너리 쓰기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    int data[5] = {1, 2, 3, 4, 5};
    fwrite(data, sizeof(int), 5, file); // 데이터 쓰기

    fclose(file); // 파일 닫기
    return 0;
}
```

#### 바이너리 읽기 (`fread`)
`fread` 함수는 바이너리 데이터를 파일에서 읽는다.

```c
#include <stdio.h>

int main() {
    FILE *file = fopen("example.bin", "rb"); // 바이너리 읽기 모드로 파일 열기

    if (file == NULL) {
        printf("파일을 열 수 없습니다.\n");
        return 1;
    }

    int data[5];
    fread(data, sizeof(int), 5, file); // 데이터 읽기

    for (int i = 0; i < 5; i++) {
        printf("%d ", data[i]);
    }
    printf("\n");

    fclose(file); // 파일 닫기
    return 0;
}
```

### 요약
- **파일 열기**: `fopen` 함수로 파일을 열고, 모드를 지정한다.
- **파일 닫기**: `fclose` 함수로 열린 파일을 닫는다.
- **파일 쓰기**: `fputc`, `fputs`, `fprintf`, `fwrite` 함수를 사용하여 파일에 데이터를 쓴다.
- **파일 읽기**: `fgetc`, `fgets`, `fscanf`, `fread` 함수를 사용하여 파일에서 데이터를 읽는다.
- **파일 위치 지정**: `fseek`, `ftell` 함수를 사용하여 파일의 읽기/쓰기 위치를 제어한다.

```toc

```
