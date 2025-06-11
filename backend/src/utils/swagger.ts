import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartStudy API',
      version: '1.0.0',
      description: 'API for the AI-Driven Learning Platform (SmartStudy)',
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    './src/resources/users/**/*.ts',
    './src/resources/categories/**/*.ts',
    './src/resources/subCategories/**/*.ts',
    './src/resources/prompts/**/*.ts',
    './src/resources/auth/**/*.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
