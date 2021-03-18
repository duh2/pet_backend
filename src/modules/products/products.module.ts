import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import {ProductsController} from "../controllers/products.controller";
import { ProductsMethods, ProductsService, ProductsServiceMySQL} from "./services/products.service";
import 'mysql2'
import {Repository} from "typeorm";
import {ConfigModule, ConfigService} from "nestjs-dotenv";


export let factoryProvider ={provide:"ChooseImplementationToken",
    useFactory:(env:ConfigService):ProductsMethods=>{
  console.log(env.get('ENV_CHOICE'))
  return (env.get('ENV_CHOICE')==='typeORM'? new ProductsService(new Repository<ProductsEntity>()):
      new ProductsServiceMySQL())


}, inject:[ConfigService]}



@Module(
    {
  imports: [TypeOrmModule.forFeature([ProductsEntity]),
    ConfigModule.forRoot()],
  controllers: [ProductsController],
  providers: [factoryProvider],
})
export class ProductsModule {}



