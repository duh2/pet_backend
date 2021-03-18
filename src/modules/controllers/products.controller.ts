import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsEntity } from '../products/entities/products.entity';
import { CreateProductsDto, UpdateProductsDto } from './dto';
import {
  ProductsMethods
} from '../products/services/products.service';
@Controller('products')
export class ProductsController {


  constructor(@Inject("ChooseImplementationToken")private productsService:ProductsMethods) {}
  @Get()
  findAll(): Promise<ProductsEntity[]> {
    return this.productsService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ProductsEntity> {
    return this.productsService.getOne(id);
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
    return this.productsService.createProduct(products);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { Img, Sex, Model, Price, isCompleted = false }: UpdateProductsDto,
  ): Promise<ProductsEntity> {
    const products = await this.productsService.getOne(id);
    if (products === undefined) {
      throw new BadRequestException('Invalid product');
    }
    products.Img = Img;
    products.Sex = Sex;
    products.Model = Model;
    products.Price = Price;
    products.isCompleted = isCompleted;
    return this.productsService.updateProduct(products);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }
}


