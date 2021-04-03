import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartEntity } from '../Carts/entities/Cart.entity';
import { CartsService } from '../Carts/services/carts.service';
import { CreateCartDto } from './dto';

@Controller('cart')
export class CartsController {
  constructor(private cartsService: CartsService) {}
  @Get(':uuid')
  Cart(@Param('uuid') uuid: string): Promise<CartEntity[]> {
    return this.cartsService.getCart(uuid);
  }
  @Post()
  create(@Body() createCartDto: CreateCartDto): Promise<CartEntity> {
    const cart = new CartEntity();
    cart.ProductID = createCartDto.ProductID;
    cart.UUID = createCartDto.UUID;
    return this.cartsService.addToCart(cart);
  }
  @Delete(':uuid/:id')
  delete(@Param('uuid' || 'id') uuid: string, id: string): Promise<void> {
    return this.cartsService.removeFromCart(id, uuid);
  }
}
