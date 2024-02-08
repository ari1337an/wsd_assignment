import AccountEntity from "@/infrastructure/entities/AccountEntity";
import MinimumAccountBalanceConfig from "../config/MinimumAccountBalanceConfig";

export default class SalaryAccountEntity extends AccountEntity {
  static accountName = "Salary Account";

  constructor(number: number, createdAt: string, balance: number) {
    super(SalaryAccountEntity.accountName, number, createdAt, balance);
  }

  getMinimumBalance(): number {
    return MinimumAccountBalanceConfig.SALARY_ACCOUNT_MIN_BALANCE;
  }
}
