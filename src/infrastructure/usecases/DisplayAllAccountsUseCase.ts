import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";
import AccountEntity from "@/infrastructure/entities/AccountEntity";

export default class DisplayAllAccountsUseCase {
  static execute(repository: AccountsRepository): AccountEntity[] {
    return repository.getAllAccounts();
  }
}
