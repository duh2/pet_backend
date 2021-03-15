import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProductsEntity} from '../entities/products.entity';
import 'mysql2'
import {createConnection,} from "mysql2";

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'products'
});

@Injectable()
export class ProductsService implements ProductsMethods {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

    getAll(): Promise<ProductsEntity[]> {
    return this.productsRepository.find();
  }
    createProduct(products: ProductsEntity): Promise<ProductsEntity> {
    delete products.id;
    return this.productsRepository.save(products);
  }
  async updateProduct(products: ProductsEntity): Promise<ProductsEntity> {
    const loadedProducts = await this.productsRepository.findOneOrFail(
      products.id,
    );
    return this.productsRepository.save(loadedProducts);
  }
    getOne(id: string): Promise<ProductsEntity> {
    return this.productsRepository.findOne(id);
  }
  async deleteProduct(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

export interface ProductsMethods {
    getAll(): Promise<ProductsEntity[]>;

    getOne(id: string): Promise<ProductsEntity>;

    createProduct(product: ProductsEntity): Promise<ProductsEntity>;

    updateProduct(product: ProductsEntity): Promise<ProductsEntity>;

    deleteProduct(id: string): Promise<void>;
}

@Injectable()
export class ProductsServiceMySQL implements ProductsMethods {
    constructor(

    ) {}

    getAll() {
        connection.connect();
        return new Promise<ProductsEntity[]>((resolve, reject) => {
            connection.query('SELECT * FROM products_entity', function (error, result, fields) {
                var string = JSON.stringify(result)
                var json = JSON.parse(string)
                var allData: Array<any> = []
                for (let i = 0; i < json.length; i++) {
                    allData.push(json[i])
                }
                resolve(allData);
            })
        })
    }

    getOne(id: string) {
        connection.connect();
        return new Promise<ProductsEntity>((resolve, reject) => {
            connection.query('SELECT * FROM products_entity WHERE id ="' + id + '"', function (error, result, fields) {

                console.log(fields.length)
                resolve({
                    id: result[0].id,
                    Img: result[0].Img,
                    Sex: result[0].Sex,
                    Model: result[0].Model,
                    Price: result[0].Price,
                    isCompleted: result[0].isCompleted,
                });
            })
        })
    }

    createProduct(product: ProductsEntity) {
        connection.connect();
        return new Promise<ProductsEntity>((resolve, reject) => {
            connection.query(
                'INSERT INTO products_entity (Img, Sex, Model, Price, isCompleted) VALUES("' + product.Img + '","' + product.Sex + '","' + product.Model + '",' + product.Price + "," + product.isCompleted + ")",
                function (error, result, fields) {
                    delete product.id
                    return resolve({
                        id: product.id,
                        Img: product.Img,
                        Sex: product.Sex,
                        Model: product.Model,
                        Price: product.Price,
                        isCompleted: product.isCompleted,
                    })
                })
        })
    }

    updateProduct( product: ProductsEntity) {
        connection.connect()
        return new Promise<ProductsEntity>((resolve, reject) => {
            connection.query(
                'UPDATE products_entity SET Img ="' + product.Img + '",Sex="' + product.Sex + '", Model="' + product.Model + '", Price=' + product.Price + ',isCompleted=' + product.isCompleted + '   WHERE id ="' + product.id + '"', function (
                    error, result, fields
                ) {
                    return resolve({
                        id: product.id,
                        Img: product.Img,
                        Sex: product.Sex,
                        Model: product.Model,
                        Price: product.Price,
                        isCompleted: product.isCompleted,
                    })
                })
        })
    }

    deleteProduct(id: string) {
        connection.connect()
        return new Promise<void>((resolve, reject) => {
            connection.query('DELETE FROM products_entity WHERE id="' + id + '"', function (error, result, fields) {

                return resolve
            })
        })
    }
}


