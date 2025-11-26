# WebService_Practice2
📘 Backend Assignment – Express API

이 프로젝트는 Express 기반으로 구현된 실습 과제이며, 다음 요구사항을 충족하도록 개발되었습니다.

HTTP 메소드별 API 구현

POST / GET / PUT / DELETE 각각 2개 이상 → 총 8개 이상

미들웨어 적용 (요청 로깅, 점검 모드)

2xx / 4xx / 5xx 응답 코드 다양하게 사용

수업 자료에 제시된 표준 응답 포맷으로统一

📁 프로젝트 구조
```
express-assignment/
├─ package.json
├─ README.md
├─ .env
└─ src/
   ├─ app.js
   ├─ server.js
   ├─ store.js
   ├─ utils/
   │  └─ respond.js
   ├─ middlewares/
   │  ├─ logger.js
   │  └─ maintenance.js
   └─ routes/
      ├─ todos.js
      └─ users.js
```

📡 실행 방법
---
1) 패키지 설치
```
npm install
```

2) 개발 실행 (nodemon)
```
npm run dev
```

3) 일반 실행
```
npm start
```

📌 공통 응답 형식 (Standard Response Format)
```
✔ 성공 (2xx)
{
  "status": "success",
  "data": { ... }
}

✔ 클라이언트 오류 (4xx)
{
  "status": "fail",
  "error": {
    "code": 400,
    "message": "INVALID_BODY",
    "details": "title 필수"
  }
}

✔ 서버 오류 (5xx)
{
  "status": "error",
  "error": {
    "code": 500,
    "message": "INTERNAL_ERROR"
  }
}
```
---

🧩 구현된 기능
---
⭐ 미들웨어
1) 요청 로깅 미들웨어 (logger.js)
```
morgan을 사용하여 요청 URL, 메서드, 응답 시간 등을 기록

개발 중 디버깅에 활용
```

2) 점검 모드 미들웨어 (maintenance.js)
```
.env 에서 MAINTENANCE=true로 설정 시

모든 요청을 503 Service Unavailable로 응답

서버 점검 시나리오 구현
```
---


🗂 API 목록 (총 12개 제공)

📌 Todos API
```
✔ GET /api/v1/todos — 200 OK

Todo 목록 조회 (paging 포함)

✔ GET /api/v1/todos/:id — 404 OR 200

존재하지 않는 id 요청 시 404

✔ POST /api/v1/todos — 201 CREATED

새 Todo 생성
요청 Body validation 실패 시 400

✔ PUT /api/v1/todos/:id — 200 OR 404

Todo 수정

✔ DELETE /api/v1/todos/:id — 204 NO_CONTENT

삭제 후 빈 응답
```

📌 Users API
```
✔ GET /api/v1/users — 200 OK

전체 사용자 조회

✔ GET /api/v1/users/:id — 200 OR 404

존재하지 않는 user 조회 시 404

✔ POST /api/v1/users — 201 CREATED

새 사용자 추가
이메일 중복 시 409

✔ PUT /api/v1/users/:id — 200 OK

사용자 정보 수정
이메일 중복 시 409

✔ DELETE /api/v1/users/:id — 204 NO_CONTENT

사용자 삭제

✔ GET /api/v1/users/__crash — 500 INTERNAL_ERROR

의도적 서버 오류 발생 테스트 라우트
```


📊 사용된 상태 코드 정리

상태코드	발생 API	설명
```
200 OK	GET /todos, GET /users	정상 조회

201 CREATED	POST /todos, POST /users	새 리소스 생성

204 NO_CONTENT	DELETE /todos/:id, DELETE /users/:id	삭제 성공

400 BAD_REQUEST	POST /todos (title 없음)	잘못된 요청 본문

404 NOT_FOUND	GET /todos/:id, GET /users/:id	리소스 없음

409 CONFLICT	POST /users (이메일 중복)	데이터 충돌

500 INTERNAL_ERROR	GET /users/__crash	의도적 서버 오류

503 SERVICE_UNAVAILABLE	maintenance 모드	점검 중
```

🧪 테스트 방법
---
1) Postman / Insomnia
```
```

2) curl 테스트 예시
```
Todo 생성
curl -X POST http://localhost:3000/api/v1/todos \
 -H "Content-Type: application/json" \
 -d "{\"title\":\"TestTodo\", \"userId\":1}"

User 중복 테스트
curl -X POST http://localhost:3000/api/v1/users \
 -H "Content-Type: application/json" \
 -d "{\"name\":\"Dup\", \"email\":\"alice@example.com\"}"
 ---
```