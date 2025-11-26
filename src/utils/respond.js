export const ok = (res, data, meta) =>
  res.status(200).json({ status: "success", data, ...(meta ? { meta } : {}) });

export const created = (res, data) =>
  res.status(201).json({ status: "success", data });

export const noContent = (res) => res.status(204).end();

export const clientError = (res, code, message, details) =>
  res.status(code).json({ status: "fail", error: { code, message, details } });

export const serverError = (res, code, message, details) =>
  res.status(code).json({ status: "error", error: { code, message, details } });
