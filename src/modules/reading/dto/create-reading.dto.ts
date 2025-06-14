import { IsNotEmpty } from 'class-validator';

export class CreateReadingDto {
  @IsNotEmpty()
  user_id: number;
  @IsNotEmpty()
  item_id: number;

  @IsNotEmpty()
  read_page: number;

  @IsNotEmpty()
  reading: boolean;
}
