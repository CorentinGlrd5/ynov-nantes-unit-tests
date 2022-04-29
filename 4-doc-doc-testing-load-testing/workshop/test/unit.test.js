const ToDo = require("../src/models/todo.model").ToDo;

describe("todo model unit test", () => {
  test("todo model creation", () => {
    const toDo = new ToDo({
      text: "tooooooodooooooo",
      done: true,
    });
    expect(toDo.text).toBe("tooooooodooooooo");
    expect(toDo.done).toBe(true);
    toDo.done = false;
    expect(toDo.done).toBe(false);
  });
});
