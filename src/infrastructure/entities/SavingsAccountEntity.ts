import AccountEntity from "@/infrastructure/entities/AccountEntity";
import MinimumAccountBalanceConfig from "../config/MinimumAccountBalanceConfig";

export default class SavingsAccountEntity extends AccountEntity {
  static accountName = "Savings Account";

  constructor(number: number, createdAt: string, balance: number) {
    super(SavingsAccountEntity.accountName, number, createdAt, balance);
  }

  getMinimumBalance(): number {
    return MinimumAccountBalanceConfig.SAVINGS_ACCOUNT_MIN_BALANCE;
  }
}
