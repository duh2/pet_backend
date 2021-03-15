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
  ProductsMethods,
} from '../products/services/products.service';
@Controller('rest/products')
export class ProductsController {

  constructor(private readonly productsService: ProductsMethods) {}
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

/*export class ProductsControllerSQLCRUD{
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
    let product : ProductsEntity = {
      id: null,
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
  let product : ProductsEntity = {
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
}*/
