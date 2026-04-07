import { IsString, MinLength } from 'class-validator';

export class CategoryDto {
  @IsString()
  @MinLength(2)
  category!: string;
}
