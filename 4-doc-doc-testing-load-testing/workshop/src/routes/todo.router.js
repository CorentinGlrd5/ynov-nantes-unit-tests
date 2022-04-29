import { Router } from "express";
import { ToDoService } from "../services/todo.service";

const toDoRouter = Router();
const toDoService = new ToDoService();

toDoRouter.get("/", (req, res) => {
  return toDoService.getFindAllToDO(res);
});

toDoRouter.post("/", (req, res) => {
  return toDoService.createToDo(req, res);
});

toDoRouter.patch("/:id", (req, res) => {
  return toDoService.getFindOneAndUpdateToDo(req, res);
});

export default toDoRouter;
