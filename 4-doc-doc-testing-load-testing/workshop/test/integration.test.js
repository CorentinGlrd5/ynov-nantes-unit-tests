const { it } = require("@jest/globals");
const MongoDB = require("../src/mongo/mongo");
const ToDo = require("../src/models/todo.model").ToDo;

const mongoDB = new MongoDB();

describe("testTodoModel", () => {
  beforeAll(async () => {
    // Connect to MongoDB
    mongoDB.connect("mongodb://mongo:27017/docker-node-mongo-todo-app");

    await ToDo.deleteMany();
  });

  afterAll(async () => {
    mongoDB.disconnect();
  });

  it("Create a new todo", () => {
    const todoData = new ToDo({ name: "task", done: false });
    return todoData.save().then((data) => {
      expect(data.name).toBe("task");
    });
  });

  it("Find all todo ", () => {
    return ToDo.find({}).then((data) => {
      expect(data.length).toBe(1);
    });
  });

  it("Modify todo ", () => {
    return ToDo.findOneAndUpdate(
      { name: "task" },
      { name: "Gold mine" },
      { new: true }
    ).then((data) => {
      expect(data.name).toBe("Gold mine");
    });
  });

  it("Delete todo ", () => {
    let todoData = {};
    ToDo.findOne({ name: "Gold mine" }).then((data) => {
      todoData = data;
    });
    return ToDo.deleteOne({ _id: todoData._id }).then((data) => {
      expect(data.length).toBe(undefined);
    });
  });
});
