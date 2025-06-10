import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './resources/users/api';
import categoryRoutes from './resources/categories/api';
import subCategoryRoutes from './resources/subCategories/api';
import promptRoutes from './resources/prompts/api';
import authRoutes from './resources/auth/api'; // ✅ חדש

import db from './utils/db-conn';
import config from './utils/config';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './utils/swagger-output.json';

class App {
  public app: Express;
  private port: number;

  constructor() {
    this.app = express();
    this.port = config.port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.handleShutdown();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors({ origin: config.corsOrigin }));
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    this.app.use('/auth', authRoutes); // ✅ נוסף
    this.app.use('/users', userRoutes);
    this.app.use('/categories', categoryRoutes);
    this.app.use('/sub_categories', subCategoryRoutes);
    this.app.use('/prompts', promptRoutes);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err);
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.status(status).json({ message });
      }
    );
  }

  private handleShutdown(): void {
    process.on('SIGINT', async () => {
      console.log('\n🚦 Shutting down server...');
      try {
        await db.prisma.$disconnect();
        console.log('✅ Prisma disconnected gracefully');
      } catch (error) {
        console.error('❌ Error disconnecting Prisma:', error);
      } finally {
        process.exit(0);
      }
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server is running on port ${this.port}`);
    });
  }
}

export default App;
