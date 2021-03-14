import {Get, Injectable, Param, Post} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity';
import 'mysql2'
import RowDataPacket from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";
import {createConnection, FieldPacket} from "mysql2";

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
/*@Injectable()
export class ProductsServiceSQL {
public async getAll(): Promise<ProductsInterface[]>{
  const [products]: [ProductsInterface[],FieldPacket[]] = await connection.query(
      'SELECT * FROM products_entity');
  return products
}
public async getOne(id:number): Promise<ProductsInterface[]>{
  const [product]: [ProductsInterface[],FieldPacket[]] = await connection.query(
      'SELECT * FROM products_entity WHERE id ='+id);
  return product;
}
public async createProduct(product:ProductsInterface[]){
  const [createdProduct]: [typeof product,FieldPacket[]] = await connection.query('INSERT INTO products_entity VALUES('+product[0].id+','+product[0].Img+','+product[0].Sex+','+product[0].Model+','+product[0].Price+','+product[0].isCompleted+')')
  return createdProduct
}
public async updateProduct(product:ProductsInterface[]){
  const [updatedProduct]: [typeof product,FieldPacket[]] = await connection.query(
      'UPDATE products_entity SET Img ='+product[0].Img+',Sex='+product[0].Sex+', Model='+product[0].Model+', Price='+product[0].Price+',isComleted='+product[0].isCompleted+'   WHERE id ='+product[0].id)
  return updatedProduct;
}
}

 */
@Injectable()
export class ProductsServiceMySQL {
    getAll(){
        var memo :any
        connection.connect();
        connection.query('SELECT * FROM products_entity',function (error,result,fields) {
            console.log(result)
            return  {result}

        })

    }
    getOne(id:string){
        connection.connect();
        connection.query('SELECT * FROM products_entity WHERE id ='+id,function (error,result,fields) {
          console.log(result)
            return {result}
        })

    }
    createProduct(product:ProductsInterface){
        connection.connect();
        connection.query(
            'INSERT INTO products_entity (Img, Sex, Model, Price, isCompleted) VALUES("'+product.Img+'","'+product.Sex+'","'+product.Model+'",'+product.Price+","+product.isCompleted+")",
            function (error,result,fields) {
               console.log(product.Img,product.Sex,product.Model,product.Price,product.isCompleted)
                console.log(error)
                return {result}
            })

    }
    updateProduct(id:string,product:ProductsInterface){

        connection.connect()
        connection.query(
            'UPDATE products_entity SET Img ="'+product.Img+'",Sex="'+product.Sex+'", Model="'+product.Model+'", Price='+product.Price+',isCompleted='+product.isCompleted+'   WHERE id ="'+id+'"',function (
                error,result,fields
            ) {
                console.log(error)
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



