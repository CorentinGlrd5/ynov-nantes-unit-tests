const { it } = require("@jest/globals");
const MongoDB = require("../src/mongo/mongo");
const ToDo = require("../src/models/todo.model").ToDo;

const mongoDB = new MongoDB();

describe("testTodoModel", () => {
  beforeAll(async () => {
    // Connect to MongoDB
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

    await ToDo.deleteMany();
  });

  afterAll(async () => {
    mongoDB.disconnect();
  });

  it("Create a new todo", () => {
    const todoData = new ToDo({ text: "task", done: false });
    return todoData.save().then((data) => {
      expect(data.text).toBe("task");
    });
  });

  it("Find all todo ", () => {
    return ToDo.find({}).then((data) => {
      expect(data.length).toBe(1);
    });
  });

  it("Modify todo ", () => {
    return ToDo.findOneAndUpdate(
      { text: "task" },
      { text: "Gold mine" },
      { new: true }
    ).then((data) => {
      expect(data.text).toBe("Gold mine");
    });
  });

  it("Delete todo ", () => {
    let todoData = {};
    ToDo.findOne({ text: "Gold mine" }).then((data) => {
      todoData = data;
    });
    return ToDo.deleteOne({ _id: todoData._id }).then((data) => {
      expect(data.length).toBe(undefined);
    });
  });
});
