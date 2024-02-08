import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";

export default class WithdrawFromAccount {
  static execute(
    repository: AccountsRepository,
    number: number,
    amount: number
  ): boolean {
    // Get the account entity from the repository using the account number
    const accountEntity = repository.getAccountByNumber(number);

    // Call the withdraw method on the account entity
    accountEntity.withdraw(amount);

    // Update the account entity in the repository
    return repository.updateAccount(accountEntity);
  }
}
