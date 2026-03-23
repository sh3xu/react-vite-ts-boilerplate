const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const { apiLimiter, authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes/v1");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const path = require("node:path");
const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// NOTE: express-mongo-sanitize middleware is incompatible with Express 5
// (req.query is a read-only getter), so we sanitize body and params manually
app.use((req, _res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});

app.use(compression());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "hbs");

if (config.env !== "test") {
  app.use("/v1", apiLimiter);
  app.use("/v1/auth", authLimiter);
}

// v1 api routes
app.use("/v1", routes);

const frontendDistPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDistPath));
app.use("/uploads", express.static("uploads"));

app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith("/v1") || req.path.startsWith("/uploads")) {
    next();
    return;
  }
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
