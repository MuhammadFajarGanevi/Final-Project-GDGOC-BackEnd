import { Controller, Redirect, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put()
  @Redirect('/books', 302) // kode 302 = temporary redirect
  redirectToBooks() {}
}
