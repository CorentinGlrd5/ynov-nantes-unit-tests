const request = require("supertest");
const MongoDB = require("../src/mongo/mongo");
const ToDo = require("../src/models/todo.model").ToDo;

const app = require("../src/app");

const mongoDB = new MongoDB();

describe("e2e with supertest", () => {
  beforeAll(() => {
    /*
     *
     *  URI de la bdd mongo en local pour pouvoir text les tests en local
     *  mongodb://localhost:27017/todo
     *
     *  URI de la bdd mongo avec docker
     *  mongodb://localhost:27017/todo
     *
     */
    mongoDB.connect("mongodb://mongo:27017/toDoApp");
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
        expect(res.body.text).toBe("Blablabla");
        expect(res.body.done).toBe(false);
      });
  });

  test("PATCH /api/todo/:id", async () => {
    let toDo = await ToDo.findOne({ text: "Blablabla" });
    console.log(1, toDo);
    return request(app)
      .patch(`/api/todo/${toDo._id}`)
      .send({ done: false })
      .expect(200)
      .expect((res) => {
        expect(res.body.done).toBe(false);
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
