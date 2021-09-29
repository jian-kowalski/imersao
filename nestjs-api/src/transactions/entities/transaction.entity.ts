import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ToNumber } from 'src/common/db/to-number.decorator';

import { Account } from '../../accounts/entities/account.entity';

export enum TransactionType {
  CREDITO = 'credit',
  DEBITO = 'debit', 
}
export const TransactionTypeList: string[] = Object.values(TransactionType);

export enum TransactionCategory {
  CATEGORIA1 = 'category1',
  CATEGORIA2 = 'category2',
}

export const TransactionCategoryList: string[] =
  Object.values(TransactionCategory);

@Table({
  tableName: 'transactions',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Transaction extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false })
  payment_date: Date;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  category: TransactionCategory;

  @ToNumber
  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  amount: number;

  @Column({ allowNull: false })
  type: TransactionType;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  account_id: string;

  @BelongsTo(() => Account)
  account: Account;
}
