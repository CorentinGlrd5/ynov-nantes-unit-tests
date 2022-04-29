const ToDo = require("../models/todo.model").ToDo;

class ToDoService {
  getFindAllToDO(res) {
    return ToDo.find()
      .then((toDos) => res.status(200).send(toDos))
      .catch((err) => res.status(400).send(err));
  }

  createToDo(req, res) {
    const body = req.body;
    const toDo = new ToDo({
      text: body.text,
    });
    return toDo
      .save(toDo)
      .then((savedToDo) => res.status(201).send(savedToDo))
      .catch((err) => res.status(400).send(err));
  }

  getFindOneAndUpdateToDo(req, res) {
    const { id } = req.params;
    return ToDo.findOneAndUpdate({ _id: id }, { done: true })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
  }
}

module.exports = ToDoService;
