import { Module } from '@nestjs/common';
import { ReportsService } from './report.service';
import { ReportController } from './report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/accounts/entities/account.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [SequelizeModule.forFeature([Report, Account])],
  controllers: [ReportController],
  providers: [ReportsService]
})
export class ReportModule {}
