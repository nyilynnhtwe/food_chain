const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Food Delivery API",
      version: "1.0.0",
      description: "A Backend API for a Food Delivery Platform",
      contact: {
        name: "API Support",
        email: "nyilynnhtwe@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:8888",
        description: "My API Documentation",
      },
    ],
     // Define the JWT Bearer authentication security scheme
     components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Optional, specifies that it's a JWT token
        },
      },
    },
    // Apply JWT security globally
    security: [
      {
        BearerAuth: [], // This ensures that the security scheme applies to all endpoints
      },
    ],
  },
  apis: [`${__dirname}/../routes/*.ts`],
};

export default swaggerOptions;
