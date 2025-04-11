import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCatDto{

  @IsNumber()
  @IsOptional()
  age?: number;

}
