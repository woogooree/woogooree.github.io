---
emoji: 🔥
title: Firebase Function 사용법
date: '2024-06-05'
author: 심우진
tags: 파이어베이스
categories: Cloud
---

## Firebase Functions 개요

Firebase Functions는 서버 없이 백엔드 코드를 실행할 수 있게 해주는 기능이다. 이를 통해 클라우드 이벤트에 응답하거나 HTTP 요청을 처리하는 등의 작업을 수행할 수 있다. Firebase Functions는 Node.js 환경에서 실행된다.

## Firebase Functions 설정 및 초기화

1. **Firebase 프로젝트 생성**: Firebase 콘솔에서 새 프로젝트를 생성한다.
2. **Firebase CLI 설치**: Firebase CLI를 설치한다.
   ```bash
   npm install -g firebase-tools
   ```
3. **Firebase 로그인**: Firebase CLI를 통해 로그인한다. 브라우저로 로그인창이 뜨게 된다.
   ```bash
   firebase login
   ```
4. **Firebase 프로젝트 초기화**: Firebase 프로젝트를 초기화한다.
   ```bash
   firebase init
   ```
   - `Functions`를 선택하고, 필요한 설정을 진행한다.
   - Node.js 버전을 선택하고, 에뮬레이터 설정을 선택할 수 있다.


## Firebase Functions 작성

1. **기본 구조**: `functions` 폴더 내부의 `index.js` 파일에서 코드를 작성한다.
   ```javascript
   const functions = require('firebase-functions');

   // HTTP 요청을 처리하는 함수
   exports.helloWorld = functions.https.onRequest((request, response) => {
       response.send("Hello from Firebase!");
   });
   ```

2. **종류별 함수**:
   - **HTTP 함수**: HTTP 요청을 처리한다.
     ```javascript
     exports.helloWorld = functions.https.onRequest((request, response) => {
         response.send("Hello from Firebase!");
     });
     ```
   - **배포 트리거 함수**: Firebase의 다양한 이벤트(예: Firestore 문서 생성, 업데이트, 삭제 등)에 반응한다.
     ```javascript
     exports.firestoreTrigger = functions.firestore.document('collection/{docId}')
         .onCreate((snap, context) => {
             const newValue = snap.data();
             // 트리거된 이벤트에 대한 처리 로직
         });
     ```

## Firebase Functions 배포

1. **배포 명령**: Firebase CLI를 사용하여 함수를 배포한다.
   ```bash
   firebase deploy --only functions
   ```

## Firebase Functions 추가 사용법

1. **로컬 테스트**: Firebase 에뮬레이터를 사용하여 로컬에서 함수를 테스트할 수 있다.
   ```bash
   firebase emulators:start
   ```
   이를 통해 실제 배포 전에 함수를 로컬 환경에서 검증할 수 있다.

2. **환경 변수 설정**: 민감한 정보를 환경 변수로 설정하여 관리할 수 있다.
   ```bash
   firebase functions:config:set someservice.key="THE API KEY"
   ```
   
   ```javascript
   const functions = require('firebase-functions');
   const apiKey = functions.config().someservice.key;
   ```

3. **의존성 추가**: `package.json` 파일을 수정하여 필요한 Node.js 패키지를 추가하고 설치한다.
   ```bash
   npm install axios
   ```

4. **데이터베이스와 연동**: Firestore 또는 Realtime Database와 연동하여 데이터를 처리할 수 있다.
   ```javascript
   const admin = require('firebase-admin');
   admin.initializeApp();

   exports.addData = functions.https.onRequest(async (req, res) => {
       const writeResult = await admin.firestore().collection('collection').add({original: req.query.text});
       res.json({result: `Message with ID: ${writeResult.id} added.`});
   });
   ```


자세한 내용은 [Firebase 공식 문서](https://firebase.google.com/docs/functions)를 참고할 수 있다.

```toc

```
