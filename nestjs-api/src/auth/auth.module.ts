import { Module } from '@nestjs/common';
import { JtwStrategyService } from './jtw-strategy/jtw-strategy.service';

@Module({
  providers: [JtwStrategyService]
})
export class AuthModule {}
