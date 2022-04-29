const request = require("supertest");
import { MongoDB } from "./mongo/mongo";

const app = require("./app");

describe("e2e supertest", () => {
  const mongoDB = new MongoDB();

  beforeAll(() => {
    mongoDB.connect();
  });

  afterAll(() => {
    mongoDB.disconnect();
  });

  test("GET /", () => {
    return request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        Array.isArray(res.body.data);
      });
  });

  test("POST /", () => {
    return request(app)
      .post("/")
      .send({ text: "Blablabla", done: true })
      .expect(201)
      .expect((res) => {
        Object.keys(res.body.data).length = 2;
        res.body.data.text = "Blablabla";
        res.body.data.done = true;
      });
  });

  test("PATCH /:id", () => {
    return request(app)
      .patch("/1")
      .send({ done: true })
      .expect(200)
      .expect((res) => {
        Object.keys(res.body.data).length = 2;
        res.body.data.done = true;
      });
  });
});
