const PORT = process.env.PORT || 5000;

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

module.exports = swaggerDefinition;
