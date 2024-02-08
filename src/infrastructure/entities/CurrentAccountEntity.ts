import AccountEntity from "@/infrastructure/entities/AccountEntity";
import MinimumAccountBalanceConfig from "../config/MinimumAccountBalanceConfig";

export default class CurrentAccountEntity extends AccountEntity {
  static accountName = "Current Account";

  constructor(number: number, createdAt: string, balance: number) {
    super(CurrentAccountEntity.accountName, number, createdAt, balance);
  }

  getMinimumBalance(): number {
    return MinimumAccountBalanceConfig.CURRENT_ACCOUNT_MIN_BALANCE;
  }
}
