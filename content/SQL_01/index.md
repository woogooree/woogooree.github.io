---
emoji: 🖥️
title: SQL CRUD 기본 명령어
date: '2024-06-13'
author: 심우진
tags: DB SQL MSSQL ORACLE
categories: SQL
---

## DML
데이터 조작 언어 라는 뜻이다.
SELECT, INSERT, UPDATE, DELETE 로 CRUD를 구현한다.

### SELECT 문

`SELECT` 문은 데이터베이스에서 데이터를 조회할 때 사용한다.

```sql
SELECT 열_이름
FROM 테이블_이름;
```


### WHERE 절

`WHERE` 절은 특정 조건을 만족하는 행만 선택할 때 사용한다.


```sql
SELECT FirstName, LastName
FROM Employees
WHERE Department = 'Sales';
```

### INSERT 문

`INSERT` 문은 테이블에 새로운 데이터를 삽입할 때 사용한다.


```sql
INSERT INTO Employees (FirstName, LastName, Department)
VALUES ('John', 'Doe', 'Sales');
```

### UPDATE 문

`UPDATE` 문은 기존 데이터를 수정할 때 사용한다.

```sql
UPDATE Employees
SET Department = 'Marketing'
WHERE EmployeeID = 1;
```

### DELETE 문

`DELETE` 문은 테이블에서 데이터를 삭제할 때 사용한다.

```sql
DELETE FROM Employees
WHERE EmployeeID = 1;
```

### JOIN 문

`JOIN` 문은 여러 테이블에서 데이터를 결합할 때 사용한다.

### INNER JOIN

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

### LEFT JOIN

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
LEFT JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

### RIGHT JOIN

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
RIGHT JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

### FULL OUTER JOIN

```sql
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
FULL OUTER JOIN Customers
ON Orders.CustomerID = Customers.CustomerID;
```

```toc

```
