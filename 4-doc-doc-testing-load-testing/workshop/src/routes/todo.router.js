const express = require("express");
const ToDoService = require("../services/todo.service");

const toDoRouter = express.Router();
const toDoService = new ToDoService();

/**
 * @openapi
 * /api/toDo:
 *   get:
 *     summary: Retrieve a list of toDo
 *     description: Retrieve a list of toDo
 *     responses:
 *       200:
 *         description: Success
 */
toDoRouter.get("/", (req, res) => {
  return toDoService.getFindAllToDO(res);
});

/**
 * @openapi
 * /api/toDo:
 *   post:
 *     summary: Create a new toDo
 *     description: Create a new toDo
 */
toDoRouter.post("/", (req, res) => {
  return toDoService.createToDo(req, res);
});

/**
 * @openapi
 * /api/toDo/:id:
 *   patch:
 *     summary: Update a toDo
 *     description: Update a toDo
 */
toDoRouter.patch("/:id", (req, res) => {
  return toDoService.getFindOneAndUpdateToDo(req, res);
});

module.exports = toDoRouter;
