const toDo = require("./routes/todo.router");
const MongoDB = require("./mongo/mongo");
const swaggerDefinition = require("./utils/swagger");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const express = require("express");
const bodyParser = require("body-parser");
const mongoDB = new MongoDB();

const app = express();

// swagger configuration
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["**/routes/*.js", "./routes/*.ts"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/todo", toDo);

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

module.exports = app;
