/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userRepository.findOneBy({ email: createUserDto.email })) {
      throw new ConflictException('Email sudah digunakan');
    }

    const user = new User();
    user.name = createUserDto.name;

    const salt = await bcrypt.genSalt();

    user.password = await bcrypt.hash(createUserDto.password, salt);
    user.email = createUserDto.email;
    user.role = createUserDto.role;

    user.created_at = new Date();
    user.updated_at = new Date();

    await this.userRepository.save(user);
  }

  async findAll() {
    const users = await this.userRepository.find();

    const filteredUsers = users.filter((user) => user.deleted_at === null);

    const result = filteredUsers.map((user) => {
      return {
        user,
      };
    });

    return result;
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user || user.deleted_at !== null) {
      throw new NotFoundException(`User dengan Id $(id) tidak di temukan`);
    }

    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user || user.deleted_at !== null) {
      throw new NotFoundException(`User dengan Id $(id) tidak di temukan`);
    }

    user.deleted_at = new Date();
    await this.userRepository.save(user);

    return { message: 'User berhasil di Hapus' };
  }
}
