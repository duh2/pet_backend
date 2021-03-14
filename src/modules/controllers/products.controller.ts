import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsEntity } from '../products/entities/products.entity';
import { CreateProductsDto, UpdateProductsDto } from './dto';
import {
  ProductsInterface,
  ProductsService,
  ProductsServiceMySQL,
} from '../products/services/products.service';
import mysql from 'mysql';
import {createPool} from "mysql2";
import {type} from "os";
export var connection = createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'products'
}).promise()


@Controller('rest/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getAll(): Promise<ProductsEntity[]> {
    return this.productsService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ProductsEntity> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(
    @Body() createProductsDto: CreateProductsDto,
  ): Promise<ProductsEntity> {
    const products = new ProductsEntity();
    products.Img = createProductsDto.Img;
    products.Sex = createProductsDto.Sex;
    products.Model = createProductsDto.Model;
    products.Price = createProductsDto.Price;
    products.isCompleted = createProductsDto.isCompleted;
    return this.productsService.create(products);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { Img, Sex, Model, Price, isCompleted = false }: UpdateProductsDto,
  ): Promise<ProductsEntity> {
    const products = await this.productsService.findOne(id);
    if (products === undefined) {
      throw new BadRequestException('Invalid product');
    }
    products.Img = Img;
    products.Sex = Sex;
    products.Model = Model;
    products.Price = Price;
    products.isCompleted = isCompleted;
    return this.productsService.update(products);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
declare class ProductsClass {
  id: number;
  Img: string;
  Sex: string;
  Model: string;
  Price: number;
  isCompleted: boolean;

}

/*@Controller()
export class ProductsControllerSQL {
  constructor(private readonly productsServiceSQL: ProductsServiceSQL) {}
  @Get()
  async getAll():Promise<ProductsInterface[]>{
return this.productsServiceSQL.getAll()
  }
  @Get(':id')
  getOne(@Param('id')id:number):Promise<ProductsInterface[]>{
return this.productsServiceSQL.getOne(id);
  }
@Post()
 async create(@Body() createProductsDto: CreateProductsDto,
):Promise<ProductsInterface[]>{
    const products = new ProductsClass
  products.Img = createProductsDto.Img;
  products.Sex = createProductsDto.Sex;
  products.Model = createProductsDto.Model;
  products.Price = createProductsDto.Price;
  products.isCompleted = createProductsDto.isCompleted;
 return await this.productsServiceSQL.createProduct(products[0])
}
@Put(':id')
 async update(@Param('id')id:number,
              @Body() { Img, Sex, Model, Price, isCompleted = false }: UpdateProductsDto,
):Promise<ProductsInterface[]>{
    const product = await this.productsServiceSQL.getOne(id)
  product[0].Img = Img
  product[0].Sex = Sex;
  product[0].Model = Model;
  product[0].Price = Price;
  product[0].isCompleted = isCompleted;
return await this.productsServiceSQL.updateProduct(product)
  }

}
*/
@Controller('products')
export class ProductsControllerSQLCRUD{
  constructor(private readonly productsServiceMySQL: ProductsServiceMySQL) {}
  @Get()
  getAll(){
    return this.productsServiceMySQL.getAll()
  }
  @Get(':id')
  getone(@Param('id') id: string){
    return this.productsServiceMySQL.getOne(id);
  }
@Post()
createOne(
    @Body() createProductsDto:CreateProductsDto){
    let product : ProductsInterface = {
      Img: createProductsDto.Img,
      Sex: createProductsDto.Sex,
      Model: createProductsDto.Model,
      Price: createProductsDto.Price,
      isCompleted: createProductsDto.isCompleted,
    }
    return this.productsServiceMySQL.createProduct(product)
}
@Put(':id')
  updateOne(@Param('id') id: string,
            @Body() { Img, Sex, Model, Price, isCompleted = false }:UpdateProductsDto){
  let product : ProductsInterface = {
    Img: Img,
    Sex: Sex,
    Model: Model,
    Price: Price,
    isCompleted: isCompleted,
  }
  return this.productsServiceMySQL.updateProduct(id,product[0])
}
@Delete(':id')
  removeOne(@Param('id') id: string){
    return this.productsServiceMySQL.deleteProduct(id)
}
}
