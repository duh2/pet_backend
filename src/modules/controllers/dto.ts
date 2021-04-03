export class CreateProductsDto {
  Img: string;
  Sex: string;
  Model: string;
  Price: number;
  isCompleted: boolean;
}
export class UpdateProductsDto {
  Img: string;
  Sex: string;
  Model: string;
  Price: number;
  isCompleted: boolean;
}
export class CreateCartDto {
  ProductID: string;
  UUID: string;
  isCompleted: boolean;
}
