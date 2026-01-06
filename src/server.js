const createApp = require("./app");
const config = require("./config");
const logger = require("./logger");

const app = createApp();

const server = app.listen(config.port, () => {
  logger.info(
    { port: config.port, buildId: config.buildId, env: config.nodeEnv },
    "API started"
  );
});

// Graceful shutdown (important in containers)
function shutdown(signal) {
  logger.info({ signal }, "Shutdown signal received");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });

  // Force close if stuck
  setTimeout(() => {
    logger.error("Force shutdown");
    process.exit(1);
  }, 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
