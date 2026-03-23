const rateLimit = require("express-rate-limit");

const buildRateLimiter = ({ windowMs, max, message, skipSuccessfulRequests = false }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message,
    skipSuccessfulRequests,
  });

const apiLimiter = buildRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: "Too many requests from this IP, please try again later.",
});

const authLimiter = buildRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many authentication attempts, please try again later.",
  skipSuccessfulRequests: true,
});

const authLoginLimiter = buildRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many login attempts, please try again later.",
  skipSuccessfulRequests: true,
});

const sensitiveAuthLimiter = buildRateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: "Too many sensitive auth requests, please try again later.",
  skipSuccessfulRequests: false,
});

module.exports = {
  apiLimiter,
  authLimiter,
  authLoginLimiter,
  sensitiveAuthLimiter,
};
