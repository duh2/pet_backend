import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  findAll(): Promise<ProductsEntity[]> {
    return this.productsRepository.find();
  }
  create(products: ProductsEntity): Promise<ProductsEntity> {
    delete products.id;
    return this.productsRepository.save(products);
  }

  async update(products: ProductsEntity): Promise<ProductsEntity> {
    const loadedProducts = await this.productsRepository.findOneOrFail(
      products.id,
    );
    return this.productsRepository.save(loadedProducts);
  }

  findOne(id: string): Promise<ProductsEntity> {
    return this.productsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
