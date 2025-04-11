import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

// DTO (Data Transfer Object) es la informacion que nosotros vamos a permitir del cliente al controlador
export class CreateCatDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  bread: string;
}
