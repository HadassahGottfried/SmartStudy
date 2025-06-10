import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 דקות
  max: 100, // 100 בקשות לכל IP בכל 15 דקות
  message: 'Too many requests from this IP, please try again later',
});
