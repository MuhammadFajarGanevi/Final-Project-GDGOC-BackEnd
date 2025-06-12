import { Injectable, NotFoundException } from '@nestjs/common';
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

    const filteredItems = items.filter((item) => item.deleted_at === null);

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

  async findOne(id: number) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item || item.deleted_at !== null) {
      throw new NotFoundException(`Buku dengan id ${id} tidak ditemukan`);
    }

    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item || item.deleted_at !== null) {
      throw new NotFoundException(`Item dengan id ${id} tidak ditemukan`);
    }

    // Update field
    item.reading = updateItemDto.reading ?? item.reading;
    item.read_page = updateItemDto.read_page ?? item.read_page;
    item.updated_at = new Date();

    await this.itemRepository.save(item);

    return item;
  }

  async remove(id: number) {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException('buku dengan id ${id} tidak ditemukan');
    }

    item.deleted_at = new Date();

    await this.itemRepository.save(item);

    return `This action removes a #${id} item`;
  }
}
