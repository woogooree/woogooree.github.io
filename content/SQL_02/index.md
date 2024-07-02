---
emoji: 🖥️
title: Oracle과 MS SQL의 쿼리문 작성법 차이점
date: '2024-06-23'
author: 심우진
tags: DB SQL MSSQL ORACLE
categories: SQL
---

## 데이터 타입
- **Oracle**
  - VARCHAR2: 가변 길이 문자열
  - NUMBER: 모든 숫자 형식
  - DATE: 날짜 및 시간

- **MS SQL**
  - VARCHAR: 가변 길이 문자열
  - INT: 정수형
  - DATETIME: 날짜 및 시간

## 자동 증가 필드
- **Oracle**
  - 시퀀스를 사용하여 자동 증가 값을 생성한다.
  ```sql
  CREATE SEQUENCE seq_name START WITH 1 INCREMENT BY 1;
  INSERT INTO table_name (id, column1) VALUES (seq_name.NEXTVAL, 'value');
  ```

- **MS SQL**
  - IDENTITY 속성을 사용하여 자동 증가 필드를 생성한다.
  ```sql
  CREATE TABLE table_name (
    id INT IDENTITY(1,1),
    column1 VARCHAR(50)
  );
  INSERT INTO table_name (column1) VALUES ('value');
  ```

## 날짜와 시간 함수
- **Oracle**
  - SYSDATE: 현재 날짜와 시간을 반환
  - TO_DATE: 문자열을 날짜 형식으로 변환
  ```sql
  SELECT SYSDATE FROM dual;
  SELECT TO_DATE('2023-07-01', 'YYYY-MM-DD') FROM dual;
  ```

- **MS SQL**
  - GETDATE(): 현재 날짜와 시간을 반환
  - CONVERT: 문자열을 날짜 형식으로 변환
  ```sql
  SELECT GETDATE();
  SELECT CONVERT(DATETIME, '2023-07-01', 102);
  ```

## 문자열 결합
- **Oracle**
  - || 연산자를 사용하여 문자열을 결합한다.
  ```sql
  SELECT 'Hello' || ' ' || 'World' FROM dual;
  ```

- **MS SQL**
  - + 연산자를 사용하여 문자열을 결합한다.
  ```sql
  SELECT 'Hello' + ' ' + 'World';
  ```

## 테이블 생성과 삭제
- **Oracle**
  - 테이블 생성과 삭제 문법은 거의 동일하지만, `Purge` 옵션이 추가로 제공된다.
  ```sql
  CREATE TABLE table_name (
    column1 VARCHAR2(50)
  );
  DROP TABLE table_name PURGE;
  ```

- **MS SQL**
  - 표준적인 테이블 생성과 삭제 문법을 사용한다.
  ```sql
  CREATE TABLE table_name (
    column1 VARCHAR(50)
  );
  DROP TABLE table_name;
  ```

## 트랜잭션 제어
- **Oracle**
  - COMMIT과 ROLLBACK을 사용하여 트랜잭션을 제어한다. Oracle은 자동으로 트랜잭션을 시작한다.
  ```sql
  BEGIN
    UPDATE table_name SET column1 = 'value' WHERE condition;
    COMMIT;
  END;
  ```

- **MS SQL**
  - EXPLICIT 트랜잭션을 시작하기 위해 BEGIN TRANSACTION을 사용한다.
  ```sql
  BEGIN TRANSACTION;
  UPDATE table_name SET column1 = 'value' WHERE condition;
  COMMIT TRANSACTION;
  ```

## SELECT TOP과 ROWNUM
- **Oracle**
  - ROWNUM을 사용하여 제한된 수의 행을 반환한다.
  ```sql
  SELECT * FROM table_name WHERE ROWNUM <= 10;
  ```

- **MS SQL**
  - TOP을 사용하여 제한된 수의 행을 반환한다.
  ```sql
  SELECT TOP 10 * FROM table_name;
  ```


```toc

```
