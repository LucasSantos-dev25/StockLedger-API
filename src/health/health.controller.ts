import { Controller, Get} from '@nestjs/common';
import { 
  HealthCheckService,
  HealthCheck,
  PrismaHealthIndicator,
  MemoryHealthIndicator
  } 
  from '@nestjs/terminus';

import { PrismaService } from 'src/prisma/prisma.service';
import { ApiCheckHealth } from './swagger/health.swagger';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaIndicator: PrismaHealthIndicator,
    private readonly memoryIndicator: MemoryHealthIndicator,
    private readonly prisma: PrismaService,
  ){}

  @Get()
  @HealthCheck()
  @ApiCheckHealth()
  check(){
    return this.health.check([
      () => this.prismaIndicator.pingCheck('database', this.prisma),
      () => this.memoryIndicator.checkHeap('memory_heap', 300 * 1024 * 1024),
    ])
  }
}
