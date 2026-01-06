const request = require("supertest");
const createApp = require("../src/app");

describe("API", () => {
  test("GET /health returns ok", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  test("GET /version returns build id", async () => {
    const app = createApp();
    const res = await request(app).get("/version");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("build");
  });
});
