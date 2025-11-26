import { Router } from "express";
import { db, nextId } from "../store.js";
import { ok, created, noContent, clientError } from "../utils/respond.js";

const r = Router();

/** GET /api/v1/todos (예: 200 OK, 400 Bad Request 시연 가능) */
r.get("/", (req, res) => {
  const { page = 1, size = 20 } = req.query;
  const p = +page, s = +size;
  if (Number.isNaN(p) || Number.isNaN(s) || p < 1 || s < 1) {
    return clientError(res, 400, "INVALID_QUERY", "page,size는 1 이상의 정수");
  }
  const start = (p - 1) * s;
  const rows = db.todos.slice(start, start + s);
  return ok(res, rows, { page: p, size: s, total: db.todos.length });
});

/** GET /api/v1/todos/:id (200 또는 404) */
r.get("/:id", (req, res) => {
  const id = +req.params.id;
  const row = db.todos.find(t => t.id === id);
  if (!row) return clientError(res, 404, "NOT_FOUND", "Todo 없음");
  return ok(res, row);
});

/** POST /api/v1/todos (201, 400) */
r.post("/", (req, res) => {
  const { title, userId } = req.body ?? {};
  if (!title) return clientError(res, 400, "INVALID_BODY", "title 필수");
  const todo = { id: nextId(), title, done: false, userId: userId ?? null, createdAt: new Date().toISOString() };
  db.todos.push(todo);
  return created(res, todo);
});

/** PUT /api/v1/todos/:id (200, 404) */
r.put("/:id", (req, res) => {
  const id = +req.params.id;
  const row = db.todos.find(t => t.id === id);
  if (!row) return clientError(res, 404, "NOT_FOUND", "Todo 없음");
  const { title, done } = req.body ?? {};
  if (typeof title !== "undefined") row.title = title;
  if (typeof done !== "undefined") row.done = !!done;
  return ok(res, row);
});

/** DELETE /api/v1/todos/:id (204, 404) */
r.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const idx = db.todos.findIndex(t => t.id === id);
  if (idx === -1) return clientError(res, 404, "NOT_FOUND", "Todo 없음");
  db.todos.splice(idx, 1);
  return noContent(res);
});

export default r;
