const request = require("supertest");
const MongoDB = require("../src/mongo/mongo");
const ToDo = require("../src/models/todo.model").ToDo;

const app = require("../src/app");

const mongoDB = new MongoDB();

describe("e2e with supertest", () => {
  beforeAll(() => {
    mongoDB.connect("mongodb://mongo:27017/docker-node-mongo-todo-app");
  });

  afterAll(() => {
    mongoDB.disconnect();
  });

  test("POST /api/todo", () => {
    return request(app)
      .post("/api/todo")
      .send({ text: "Blablabla", done: true })
      .expect(201)
      .expect((res) => {
        Object.keys(res.body.data).length = 2;
        res.body.data.text = "Blablabla";
        res.body.data.done = true;
      });
  });

  test("PATCH /api/todo/:id", async () => {
    let toDo = await ToDo.findOne({ name: "Blablabla" });
    return request(app)
      .patch(`/api/todo/${toDo._id}`)
      .send({ done: false })
      .expect(200)
      .expect((res) => {
        Object.keys(res.body.data).length = 2;
        res.body.data.done = false;
      });
  });

  test("GET /api/todo", () => {
    return request(app)
      .get("/api/todo")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect((res) => {
        Array.isArray(res.body.data);
      });
  });
});
