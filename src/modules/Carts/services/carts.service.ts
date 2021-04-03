import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../entities/Cart.entity';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  getCart(uuid: string): Promise<CartEntity[]> {
    return this.cartRepository.find({ where: { uuid: uuid } });
  }
  addToCart(cart: CartEntity): Promise<CartEntity> {
    return this.cartRepository.save(cart);
  }
  async removeFromCart(id: string, uuid: string): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartEntity)
      .where('id =:id', { id: id })
      .andWhere('uuid =:uuid', { uuid: uuid });
  }
}
