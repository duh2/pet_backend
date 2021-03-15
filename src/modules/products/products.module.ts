import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import {ProductsController} from "../controllers/products.controller";
import {ProductsService, ProductsServiceMySQL} from "./services/products.service";
import 'mysql2'
import {DotenvService} from "./services/dotenv.service";
import {Repository} from "typeorm";
export const env = process.env.ENV_CHOICE






@Module(
    {
  imports: [TypeOrmModule.forFeature([ProductsEntity]),],
  controllers: [ProductsController],
  providers: [{
    provide:ProductsService,
    useFactory: () => {
      const env = process.env.ENV_CHOICE
      switch (env) {
        case 'typeORM': return new ProductsService(new Repository<ProductsEntity>())
        case 'MySQL': return new ProductsServiceMySQL()
      }

    },
    inject: [ProductsService,ProductsServiceMySQL],
  }],
})
export class ProductsModule {}



