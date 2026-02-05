import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

 async create(data: Partial<User>) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = this.usersRepo.create({
    ...data,
    password: hashedPassword,
  });

  return this.usersRepo.save(user);
}

}
