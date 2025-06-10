import { PrismaClient } from '@prisma/client';

class Database {
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
    } catch (err) {
      console.error('❌ Failed to disconnect Prisma:', err);
    }
  }

  public async testConnection(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('✅ Prisma connected successfully');
    } catch (err) {
      console.error('❌ Prisma connection failed:', err);
    }
  }
}

const db = new Database();

export default db;
