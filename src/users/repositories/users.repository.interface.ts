import { User } from 'src/generated/prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUsersRepository {
  create(data: CreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}