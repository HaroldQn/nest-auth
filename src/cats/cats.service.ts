import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    try {
      const cat = this.catRepository.create({
        ...createCatDto,
        name: createCatDto.name.toUpperCase(),
      });
      return await this.catRepository.save(cat);
    } catch (error) {
      throw new BadRequestException(`Error creating cat: ${error}`);
    }
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: string) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) throw new BadRequestException(`Cat with id ${id} not found`);
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    try {
      await this.findOne(id);
      const cat = await this.catRepository.update(id, updateCatDto)
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
