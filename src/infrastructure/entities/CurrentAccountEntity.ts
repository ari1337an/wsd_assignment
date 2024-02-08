import AccountEntity from "@/infrastructure/entities/AccountEntity";

export default class CurrentAccountEntity extends AccountEntity {
  static accountName = "Current Account";

  constructor(number: number, createdAt: string, balance: number) {
    super(CurrentAccountEntity.accountName, number, createdAt, balance);
  }
}
