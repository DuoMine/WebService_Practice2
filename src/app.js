import express from "express";
import dotenv from "dotenv";
import { logger } from "./middlewares/logger.js";
import { maintenanceGate } from "./middlewares/maintenance.js";
import todos from "./routes/todos.js";
import users from "./routes/users.js";
import { clientError, serverError, ok } from "./utils/respond.js";

dotenv.config();

const app = express();

// 기본 파서
app.use(express.json());

// 미들웨어: 로깅, 점검게이트(503)
app.use(logger);
app.use(maintenanceGate);

// 단순 헬스체크 (200)
app.get("/health", (req, res) => ok(res, { uptime: process.uptime() }));

// 라우트 마운트
app.use("/api/v1/todos", todos);
app.use("/api/v1/users", users);

// 404 핸들러(모든 메서드 공통)
app.use((req, res) => clientError(res, 404, "NOT_FOUND", "Route 없음"));

// 에러 핸들러(500)
app.use((err, _req, res, _next) => {
  console.error(err);
  return serverError(res, 500, "INTERNAL_ERROR");
});

export default app;
