const express = require("express");
const { buildId } = require("./config");

function createApp() {
  const app = express();

  // Basic hardening: hide express fingerprint
  app.disable("x-powered-by");

  // Health check endpoint (used by AWS health checks)
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Version endpoint (must be dynamic)
  app.get("/version", (req, res) => {
    res.status(200).json({ build: buildId });
  });

  // Optional: root endpoint
  app.get("/", (req, res) => {
    res.status(200).json({ name: "scalable-app-delivery-api" });
  });

  return app;
}

module.exports = createApp;
