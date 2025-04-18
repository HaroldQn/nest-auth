import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Breed {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true , length: 50})
  name: string;

  @OneToMany(()=> Cat, (cat)=> cat.breed)
  cats: Cat[]

}
