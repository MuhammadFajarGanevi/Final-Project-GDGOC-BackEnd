/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Reading } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
// import { UpdateReadingDto } from './dto/update-reading.dto';
import { User } from '../user/entities/user.entity';
import { Item } from '../book/entities/item.entity';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  //   Membuat readlist POST
  async create(createReadingdto: CreateReadingDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: createReadingdto.user_id,
        deleted_at: IsNull(),
      },
    });

    const item = await this.itemRepository.findOne({
      where: {
        id: createReadingdto.item_id,
        deleted_at: IsNull(),
      },
    });

    if (!user || !item) {
      throw new NotFoundException(
        'User atau buku tidak ditemukan atau sudah dihapus',
      );
    }

    const reading = this.readingRepository.create({
      user,
      item,
      read_page: createReadingdto.read_page,
      reading: createReadingdto.reading,
    });

    await this.readingRepository.save(reading);
  }

  // Mengambil data dari Id readList
  async findOne(id: number) {
    const readList = await this.readingRepository.findOneBy({ id });

    if (!readList) {
      throw new NotFoundException(`readList dengan id ${id} tidak ditemukan`);
    }

    return {
      message: 'buku yang sedang kamu baca',
      id: readList.id,
      name: readList.item?.name,
      user: readList.user?.name,
      read_page: readList.read_page,
      reading: readList.reading,
    };
  }

  async getAll() {
    try {
      return await this.readingRepository.find();
    } catch (error) {
      console.error('ERROR:', error);
      throw new InternalServerErrorException('Gagal mengambil data');
    }
  }
}
