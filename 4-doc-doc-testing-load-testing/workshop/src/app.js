import toDo from "./routes/todo.router";
import { MongoDB } from "./mongo/mongo";

const express = require("express");
const bodyParser = require("body-parser");
const mongoDB = new MongoDB();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// API Routes
app.use("api/todo", toDo);

// Connect to MongoDB
mongoDB.connect();

// swagger configuration
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API REST todo project",
    version: "1.0.0",
    description: "This is REST API for todo project",
  },
  components: {
    securitySchemes: {
      jwt: {
        type: "http",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
        bearerFormat: "JWT",
      },
    },
  },

  security: [
    {
      jwt: [],
    },
  ],

  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["**/routes/*.js", "./routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
const swaggerUi = require("swagger-ui-express");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

module.exports = app;
