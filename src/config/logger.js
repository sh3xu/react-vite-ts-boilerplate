const pino = require("pino");
const config = require("./config");

const transport =
  config.env === "development"
    ? pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
          singleLine: false,
        },
      })
    : undefined;

const logger = pino(
  {
    level: config.env === "development" ? "debug" : "info",
    base: undefined,
    serializers: {
      err: pino.stdSerializers.err,
      error: pino.stdSerializers.err,
    },
  },
  transport
);

module.exports = logger;
