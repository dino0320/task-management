import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  create(createUserDto: CreateUserDto) {
    return this.userRepository.insert(createUserDto);
  }
  
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
  
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
