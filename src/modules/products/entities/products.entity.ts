import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Img: string;
  @Column()
  Sex: string;
  @Column()
  Model: string;
  @Column()
  Price: number;
  @Column()
  isCompleted: boolean;
}
