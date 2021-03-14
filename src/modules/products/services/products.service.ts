import {Get, Injectable, Param, Post} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity';
import 'mysql2'
import {createConnection,} from "mysql2";

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'products'
});

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
export interface ProductsInterface{
  Img: string;
  Sex: string;
  Model: string;
  Price: number;
  isCompleted: boolean;
}
@Injectable()
export class ProductsServiceMySQL {
    getAll(){
        connection.connect();
        connection.query('SELECT * FROM products_entity',function (error,result,fields) {
            return  {result}
        })
    }
    getOne(id:string){
        connection.connect();
        connection.query('SELECT * FROM products_entity WHERE id ='+id,function (error,result,fields) {
            return {result}
        })
    }
    createProduct(product:ProductsInterface){
        connection.connect();
        connection.query(
            'INSERT INTO products_entity (Img, Sex, Model, Price, isCompleted) VALUES("'+product.Img+'","'+product.Sex+'","'+product.Model+'",'+product.Price+","+product.isCompleted+")",
            function (error,result,fields) {
                return result
            })
    }
    updateProduct(id:string,product:ProductsInterface){
        connection.connect()
        connection.query(
            'UPDATE products_entity SET Img ="'+product.Img+'",Sex="'+product.Sex+'", Model="'+product.Model+'", Price='+product.Price+',isCompleted='+product.isCompleted+'   WHERE id ="'+id+'"',function (
                error,result,fields
            ) {
            return result
            })
    }
    deleteProduct(id:string){
        connection.connect()
        connection.query('DELETE FROM products_entity WHERE id="'+id+'"',function (error,result,fields) {
        console.log(error)
            return result
        })
    }
}



