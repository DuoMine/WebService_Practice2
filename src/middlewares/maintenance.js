import { clientError, serverError } from "../utils/respond.js";
export const maintenanceGate = (req, res, next) => {
  if (process.env.MAINTENANCE === "true") {
    // 5xx 중 하나: 503
    return serverError(res, 503, "Service Unavailable", "Maintenance mode");
  }
  next();
};
