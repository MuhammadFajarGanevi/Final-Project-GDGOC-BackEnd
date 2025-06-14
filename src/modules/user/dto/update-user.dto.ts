/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional } from 'class-validator';
export class UpdateUserDate {
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  new_password: string;

  @IsOptional()
  role?: string;
}
