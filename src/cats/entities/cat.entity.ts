import { Breed } from 'src/breeds/entities/breed.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Breed, (breed) => breed.cats, { eager: true })
  breed: Breed;


  @DeleteDateColumn()
  deletedAt: Date;
}
