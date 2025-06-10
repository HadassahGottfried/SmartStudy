import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

export class SwaggerGenerator {
  private readonly outputFile: string;
  private readonly endpointsFiles: string[];

  constructor() {
    this.outputFile = './swagger-output.json';
    this.endpointsFiles = [
      './src/resources/users/api.ts',
      './src/resources/categories/api.ts',
      './src/resources/subCategories/api.ts',
      './src/resources/prompts/api.ts',
    ];
  }

  private getDocConfig() {
    return {
      info: {
        version: 'v1.0.0',
        title: 'LexBridge API',
        description:
          'LexBridge is a seamless platform that connects clients with verified legal experts, offering secure communication, easy appointment booking, transparent pricing, and comprehensive legal services all in one place.',
      },
      host: `localhost:${process.env.PORT || 3000}`,
      basePath: '/',
      schemes: ['http'],
    };
  }

  public generate() {
    const doc = this.getDocConfig();
    swaggerAutogen()(this.outputFile, this.endpointsFiles, doc);
  }
}

// ✅ שימוש: להריץ רק כשהקובץ מופעל ישירות
if (require.main === module) {
  const generator = new SwaggerGenerator();
  generator.generate();
}
