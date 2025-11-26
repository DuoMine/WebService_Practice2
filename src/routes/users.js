import { Router } from "express";
import { db, nextId } from "../store.js";
import { ok, created, noContent, clientError, serverError } from "../utils/respond.js";

const r = Router();

/** GET /api/v1/users-crash (의도적 500 테스트용) */
r.get("/__crash", (_req, res) => {
  return serverError(res, 500, "INTERNAL_ERROR", "Intentional crash for demo");
});

/** GET /api/v1/users (200) */
r.get("/", (req, res) => {
  return ok(res, db.users);
});

/** GET /api/v1/users/:id (200, 404) */
r.get("/:id", (req, res) => {
  const id = +req.params.id;
  const row = db.users.find(u => u.id === id);
  if (!row) return clientError(res, 404, "NOT_FOUND", "User 없음");
  return ok(res, row);
});

/** POST /api/v1/users (201, 409) */
r.post("/", (req, res) => {
  const { name, email } = req.body ?? {};
  if (!name || !email) return clientError(res, 400, "INVALID_BODY", "name,email 필수");
  if (db.users.some(u => u.email === email)) {
    return clientError(res, 409, "CONFLICT", "이메일 중복");
  }
  const user = { id: nextId(), name, email };
  db.users.push(user);
  return created(res, user);
});

/** PUT /api/v1/users/:id (200, 404) */
r.put("/:id", (req, res) => {
  const id = +req.params.id;
  const row = db.users.find(u => u.id === id);
  if (!row) return clientError(res, 404, "NOT_FOUND", "User 없음");
  const { name, email } = req.body ?? {};
  if (email && db.users.some(u => u.email === email && u.id !== id)) {
    return clientError(res, 409, "CONFLICT", "이메일 중복");
  }
  if (typeof name !== "undefined") row.name = name;
  if (typeof email !== "undefined") row.email = email;
  return ok(res, row);
});

/** DELETE /api/v1/users/:id (204, 404) */
r.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const idx = db.users.findIndex(u => u.id === id);
  if (idx === -1) return clientError(res, 404, "NOT_FOUND", "User 없음");
  db.users.splice(idx, 1);
  return noContent(res);
});


export default r;
