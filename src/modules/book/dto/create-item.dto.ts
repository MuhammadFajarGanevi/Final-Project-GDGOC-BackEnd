import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  publisher: string;

  @IsNotEmpty()
  page_count: number;
}
