import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCatDto{

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsOptional()
  @IsString()
  breed?: string;

}
