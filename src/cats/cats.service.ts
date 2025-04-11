import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
      private readonly catRepository: Repository<Cat>,
    @InjectRepository(Breed) 
      private readonly breedsService: Repository<Breed>
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {

      const breed = await this.breedsService.findOneBy({ name : createCatDto.breed });
      if (!breed) {
        throw new BadRequestException();
      }

      return await this.catRepository.save({
        ...createCatDto,
        breed: breed,
      });
    } catch (error) {
      throw new BadRequestException(`Error creating cat: ${error}`);
    }
  }

  async findAll() {
    try {
      const cats = await this.catRepository.find({
        relations: { breed: true },
      });
    
      return cats.map(({ breed, ...cat }) => ({
        ...cat,
        breed: breed? breed.name : null,
      }));
      
    } catch (error) {
      throw new BadRequestException(`Error fetching cats: ${error}`);
    }
  }
  
  

  async findOne(id: string) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) throw new BadRequestException(`Cat with id ${id} not found`);
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    try {
      await this.findOne(id);
      //const cat = await this.catRepository.update(id, updateCatDto)
      return this.findOne(id);
    } catch (error) {
      throw new BadRequestException(`Error updating cat: ${error}`);
    }
  }

  async remove(id: string) {
    try {
      await this.findOne(id);
      const cat = await this.catRepository.softDelete({ id });
      return cat;
    } catch (error) {
      throw new BadRequestException(`Error deleting cat: ${error}`);
    }
  }
}
