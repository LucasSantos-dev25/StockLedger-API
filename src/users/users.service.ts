import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { type IUsersRepository } from './repositories/users.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.usersRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });

    return this.excludePassword(user);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.excludePassword(user);
  }

  async findAll() {
    const users = await this.usersRepository.findAll();
    return users.map((u) => this.excludePassword(u));
  }

  private excludePassword(user: { password: string; [key: string]: any }) {
    const { password, ...rest } = user;
    return rest;
  }
}