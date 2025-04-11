import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat {
  // @Column({
  //   primary: true,
  //   generated: true,
  // })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  bread: string;

  @DeleteDateColumn()
  deletedAt: Date
}
