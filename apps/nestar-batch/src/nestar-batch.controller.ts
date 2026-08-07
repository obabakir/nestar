import { Controller, Get } from '@nestjs/common';
import { NestarBatchService } from './nestar-batch.service';
import { ConfigModule } from '@nestjs/config';

@Controller()
export class NestarBatchController {
  constructor(private readonly nestarBatchService: NestarBatchService) {}

  @Get()
  getHello(): string {
    return this.nestarBatchService.getHello();
  }
}
