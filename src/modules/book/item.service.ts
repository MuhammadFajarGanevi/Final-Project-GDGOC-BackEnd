import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = new Item();
    item.name = createItemDto.name;
    item.year = createItemDto.year;
    item.publisher = createItemDto.publisher;
    item.author = createItemDto.author;
    item.summary = createItemDto.summary;
    item.page_count = createItemDto.page_count;

    item.created_at = new Date();
    item.updated_at = new Date();

    await this.itemRepository.save(item);
  }

  async findAll() {
    const items = await this.itemRepository.find();

    // Hanya ambil item yang sudah dihapus (soft delete)
    const filteredItems = items.filter((item) => item.deleted_at !== null);

    const result = filteredItems.map((item) => {
      const status =
        item.read_page !== item.page_count ? 'unfinished' : 'finished';
      return {
        ...item,
        status,
      };
    });

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const item = new Item();
    item.reading = updateItemDto.reading;
    item.read_page = updateItemDto.read_page;
    item.updated_at = new Date();
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
