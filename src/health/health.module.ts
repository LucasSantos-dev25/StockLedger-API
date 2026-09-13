import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus'
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [TerminusModule, PrismaModule],
  providers:[PrismaService],
  controllers: [HealthController],
})
export class HealthModule {}
