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
      schemas: {
        LoginUser: {
          type: 'object',
          required: ['phone', 'name'],
          properties: {
            phone: {
              type: 'string',
              minLength: 10,
              example: '0521234567',
            },
            name: {
              type: 'string',
              minLength: 2,
              example: 'John Doe',
            },
          },
        },
        RegisterUser: {
          type: 'object',
          required: ['phone', 'name'],
          properties: {
            phone: {
              type: 'string',
              minLength: 10,
              example: '0521234567',
            },
            name: {
              type: 'string',
              minLength: 2,
              example: 'John Doe',
            },
          },
        },
        UpdateUser: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Jane' },
            phone: { type: 'string', example: '0527654321' },
            id_number: { type: 'string', example: '123456789' },
          },
        },
        CreateCategory: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Math' },
          },
        },
        UpdateCategory: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Science' },
          },
        },
        CreateSubCategory: {
          type: 'object',
          required: ['name', 'category_id'],
          properties: {
            name: {
              type: 'string',
              example: 'Algebra',
            },
            category_id: {
              type: 'number',
              example: 1,
            },
          },
        },

        UpdateSubCategory: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Geometry' },
          },
        },
        CreatePrompt: {
          type: 'object',
          required: ['prompt', 'categoryId', 'sub_category_id'],
          properties: {
            prompt: { type: 'string', minLength: 5, example: 'Explain photosynthesis' },
            category_id: { type: 'number', example: 1 },
            sub_category_id: { type: 'number', example: 2 },
          },
        },
        IdParam: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', example: 'a3bb189e-8bf9-3888-9912-ace4e6543002' },
          },
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
