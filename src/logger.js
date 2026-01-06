const pino = require("pino");

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  base: undefined, // cleaner logs (optional)
});

module.exports = logger;
