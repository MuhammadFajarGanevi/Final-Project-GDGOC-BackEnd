import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './modules/book/item.module';
import { UserModule } from './modules/user/user.module';
import { ReadingModule } from './modules/reading/reading.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ItemModule,
    UserModule,
    ReadingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
