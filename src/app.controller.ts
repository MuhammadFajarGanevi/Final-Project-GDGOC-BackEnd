import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/books', 302) // kode 302 = temporary redirect
  redirectToBooks() {
    // kamu juga bisa pakai logic di sini jika butuh
  }
}
