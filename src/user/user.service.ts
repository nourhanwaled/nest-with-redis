import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: +id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create() {
    const users: User[] = [];
    for (let i = 0; i < 20000; i++) {
      const user = new User();
      user.name = `Name${i}`;
      user.email = `email${i}@gmail.com`;
      users.push(user);
    }
    await this.usersRepository.save(users);
  }
}
