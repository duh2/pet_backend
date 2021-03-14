import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import {ProductsController, ProductsControllerSQLCRUD} from "../controllers/products.controller";
import {ProductsService, ProductsServiceMySQL} from "./services/products.service";
import 'mysql2'




@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}

let mysql2 =require('mysql2');

@Module({
  imports:[],
  controllers:[ProductsControllerSQLCRUD],
  providers:[ProductsServiceMySQL],
})
export class ProductsModuleSQL {}
