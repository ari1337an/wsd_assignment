import AccountEntity from "@/infrastructure/entities/AccountEntity";

export default class SalaryAccountEntity extends AccountEntity {
  static accountName = "Salary Account";

  constructor(number: number, createdAt: string, balance: number) {
    super(SalaryAccountEntity.accountName, number, createdAt, balance);
  }
}
