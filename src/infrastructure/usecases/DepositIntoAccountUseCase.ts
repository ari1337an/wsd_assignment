import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";
import DepositError from "@/infrastructure/errors/DepositError";

export default class DepositIntoAccountUseCase {
  static execute(
    repository: AccountsRepository,
    number: number,
    amount: number
  ): boolean {
    // Get the account entity from the repository using the account number
    const accountEntity = repository.getAccountByNumber(number);

    // Call the deposit method on the account entity
    accountEntity.deposit(amount);

    // Update the account entity in the repository
    return repository.updateAccount(accountEntity);
  }
}
