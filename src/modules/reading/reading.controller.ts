import { Controller, Get, Param, Post, Body } from '@nestjs/common';

import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';

@Controller('my-readlist')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Get()
  getAll() {
    return this.readingService.getAll();
  }
  @Get()
  findOne(@Param(':id') id: number) {
    return this.readingService.findOne(+id);
  }

  @Post()
  create(@Body() createReadingdto: CreateReadingDto) {
    return this.readingService.create(createReadingdto);
  }
}
