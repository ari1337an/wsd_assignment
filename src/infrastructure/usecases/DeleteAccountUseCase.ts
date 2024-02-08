import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";

export default class DeleteAccountUseCase {
  static execute(repository: AccountsRepository, number: number): boolean {
    return repository.deleteAccount(number);
  }
}
