import AccountEntity from "@/infrastructure/entities/AccountEntity";
import SavingsAccountEntity from "@/infrastructure/entities/SavingsAccountEntity";
import SalaryAccountEntity from "@/infrastructure/entities/SalaryAccountEntity";
import CurrentAccountEntity from "@/infrastructure/entities/CurrentAccountEntity";
import AccountTypeNotSupportedError from "@/infrastructure/errors/AccountTypeNotSupportedError";
import AccountType from "@/infrastructure/enums/AccountType";

export default class AccountsFactory {
  static createAccount(
    type: AccountType,
    number: number,
    createdAt: string,
    balance: number
  ): AccountEntity {
    switch (type) {
      case AccountType.Current:
        return new CurrentAccountEntity(number, createdAt, balance);
      case AccountType.Savings:
        return new SavingsAccountEntity(number, createdAt, balance);
      case AccountType.Salary:
        return new SalaryAccountEntity(number, createdAt, balance);
      default:
        throw new AccountTypeNotSupportedError("Invalid account type!");
    }
  }
}
