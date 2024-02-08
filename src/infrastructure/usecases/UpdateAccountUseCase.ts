import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";

export default class UpdateAccountUseCase {
  static execute(
    repository: AccountsRepository,
    number: number,
    smsServiceActiveStatus: boolean
  ): boolean {
    // Get the account entity from the repository using the account number
    const accountEntity = repository.getAccountByNumber(number);

    // Update the SMS service activation status
    accountEntity.setSmsServiceActiveStatus(smsServiceActiveStatus);

    // Update the account entity in the repository
    return repository.updateAccount(accountEntity);
  }
}
