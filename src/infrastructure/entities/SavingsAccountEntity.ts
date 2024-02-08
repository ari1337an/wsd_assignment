import AccountEntity from "@/infrastructure/entities/AccountEntity";

export default class SavingsAccountEntity extends AccountEntity {
  static accountName = "Savings Account";

  constructor(number: number, createdAt: string, balance: number) {
    super(SavingsAccountEntity.accountName, number, createdAt, balance);
  }
}
