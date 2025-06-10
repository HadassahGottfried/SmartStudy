import cors from 'cors';

export const corsOptions = {
  origin: 'http://localhost:3000', // או * אם אין הגבלה
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const corsMiddleware = cors(corsOptions);
