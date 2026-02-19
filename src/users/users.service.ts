import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id as any });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(userData: { email: string; password?: string; fullName?: string }): Promise<User> {
    const { password, ...rest } = userData;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : '';
    const user = this.usersRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }
}
