import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class ProjectUpdateDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  technology: string;

  @IsOptional()
  @IsString()
  imageSource: string;
}
