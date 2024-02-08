import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";
import AccountEntity from "@/infrastructure/entities/AccountEntity";

export default class SearchAccountUseCase {
  static execute(
    repository: AccountsRepository,
    number: number
  ): AccountEntity {
    return repository.getAccountByNumber(number);
  }
}
