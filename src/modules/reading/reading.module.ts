import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reading } from './entities/reading.entity';
import { Item } from '../book/entities/item.entity';
import { User } from '../user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Reading, User, Item])],
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
