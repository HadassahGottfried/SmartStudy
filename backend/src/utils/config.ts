import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 4000,
  databaseUrl: process.env.DATABASE_URL || 'postgresql://postgres:1234@localhost:5432/ai_learning',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:4000',
};

export default config;
