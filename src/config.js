const dotenv = require("dotenv");
dotenv.config();

const pkg = require('../package.json');

function requireEnv(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

const buildId =
  process.env.BUILD_ID ||        // injected at build-time via --build-arg
  process.env.GIT_SHA ||         // possible CI-provided var
  process.env.GITHUB_SHA ||      // GitHub Actions runtime SHA
  pkg.version ||                 // fallback to package.json version
  'local';

module.exports = {
  port: Number(requireEnv("PORT", 3000)),
  buildId,
  nodeEnv: requireEnv("NODE_ENV", "development"),
};