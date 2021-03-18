import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ProductsModule} from './modules/products/products.module';
import {ConfigModule} from "nestjs-dotenv";

@Module({
  imports: [TypeOrmModule.forRoot(),
    ProductsModule,
    ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
