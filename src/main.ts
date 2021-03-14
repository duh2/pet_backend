import { NestFactory } from '@nestjs/core';
import {AppModule, AppModuleSQL} from './app.module';
import * as dotenv from 'dotenv'
dotenv.config();

async function bootstrap() {
  let env = process.env.ENV_CHOICE;
  switch (env) {
    case 'typeORM':
          const app = await NestFactory.create(AppModule);
          await app.listen(3000);
    break
    case 'mySQL':
      const appsql = await NestFactory.create(AppModuleSQL);
      await appsql.listen(3000);
      break
  }

}
bootstrap();
