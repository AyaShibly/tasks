import { IsBoolean, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(2)
  title!: string;

  @IsString()
  @MinLength(2)
  category!: string;

  @IsString()
  @IsIn(['Low', 'Medium', 'High'])
  energy!: 'Low' | 'Medium' | 'High';

  @IsString()
  date!: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
