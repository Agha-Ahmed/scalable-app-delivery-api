const dotenv = require("dotenv");
dotenv.config();

function requireEnv(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

module.exports = {
  port: Number(requireEnv("PORT", 3000)),
  buildId: requireEnv("BUILD_ID", "local"),
  nodeEnv: requireEnv("NODE_ENV", "development"),
};
