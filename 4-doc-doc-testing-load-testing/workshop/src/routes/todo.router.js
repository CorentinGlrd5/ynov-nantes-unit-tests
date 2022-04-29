const express = require("express");
const ToDoService = require("../services/todo.service");

const toDoRouter = express.Router();
const toDoService = new ToDoService();

/**
 * @openapi
 * /api/todo:
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
 * /api/todo:
 *   post:
 *     summary: Create a new toDo
 *     description: Create a new toDo
 *     parameters:
 *     - name: text
 *       description: text of the todo task
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       201:
 *         description: Created
 */
toDoRouter.post("/", (req, res) => {
  return toDoService.createToDo(req, res);
});

/**
 * @openapi
 * /api/todo/:id:
 *   patch:
 *     summary: Update a toDo
 *     description: Update a toDo
 *     parameters:
 *     - name: id
 *       description: id of the todo task
 *       in: formData
 *       required: true
 *       type: string
 *     responses:
 *       201:
 *         description: Updated
 */
toDoRouter.patch("/:id", (req, res) => {
  return toDoService.getFindOneAndUpdateToDo(req, res);
});

module.exports = toDoRouter;
