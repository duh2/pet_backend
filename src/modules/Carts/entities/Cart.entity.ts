import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ProductID: string;
  @Column()
  UUID: string;
  @Column()
  isCompleted: boolean;
}
