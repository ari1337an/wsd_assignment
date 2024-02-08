import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";
import AccountsFactory from "@/infrastructure/factories/AccountsFactory";
import AccountType from "@/infrastructure/enums/AccountType";

export default class CreateNewAccountUseCase {
  static execute(
    repository: AccountsRepository,
    accountDetails: {
      type: AccountType;
      number: number;
      createdAt: string;
      balance: number;
    }
  ): boolean {
    const { type, number, createdAt, balance } = accountDetails;
    const newAccount = AccountsFactory.createAccount(
      type,
      number,
      createdAt,
      balance
    );
    return repository.addAccount(newAccount);
  }
}
