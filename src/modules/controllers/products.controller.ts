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
import { ProductsService } from '../products/services/products.service';

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
