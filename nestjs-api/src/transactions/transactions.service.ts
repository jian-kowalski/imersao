import { Account } from './../accounts/entities/account.entity';
import { TenantService } from './../tenant/tenant/tenant.service';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction) private transactionModel: typeof Transaction,
    @InjectModel(Account) private accountModel: typeof Account,
    private tenantService: TenantService,
    private sequelize: Sequelize,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const transactionAtomic = await this.sequelize.transaction();
    try {
      const transaction = await this.transactionModel.create({
        ...createTransactionDto,
        account_id: this.tenantService.getTenant().id,
      });
      const account = await this.accountModel.findByPk(transaction.account_id, {
        lock: transactionAtomic.LOCK.UPDATE,
        transaction: transactionAtomic,
      });
      const amount =
        createTransactionDto.type === TransactionType.DEBITO
          ? -transaction.amount
          : transaction.amount;
      await account.update(
        { balance: account.balance + amount },
        { transaction: transactionAtomic },
      );
      await transactionAtomic.commit();
      return transaction;
    } catch (e) {
      await transactionAtomic.rollback();
      throw e;
    }
  }

  findAll() {
    return this.transactionModel.findAll({
      where: {
        account_id: this.tenantService.getTenant().id,
      },
    });
  }
}
