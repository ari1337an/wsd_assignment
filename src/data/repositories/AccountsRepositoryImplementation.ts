import DataContainer from "@/data/datasource/DataContainer";
import AccountEntity from "@/infrastructure/entities/AccountEntity";
import AccountAlreadyExistsError from "@/infrastructure/errors/AccountAlreadyExistsError";
import AccountNotFoundError from "@/infrastructure/errors/AccountNotFoundError";
import AccountsRepository from "@/infrastructure/repositories/AccountsRepository";

type AccountContainer = DataContainer<AccountEntity>;

export default class AccountsRepositoryImplementation
  implements AccountsRepository
{
  dataSource: AccountContainer;

  constructor(dataSource: AccountContainer) {
    this.dataSource = dataSource;
  }

  addAccount(account: AccountEntity): boolean {
    const existingAccount = this.getAllAccounts().find(
      (acc: AccountEntity) => acc.number === account.number
    );

    if (existingAccount) {
      throw new AccountAlreadyExistsError(
        `Account already exists with account number ${account.number}`
      );
    }

    this.dataSource.addObject(account);
    return true;
  }

  getAccountByNumber(number: number): AccountEntity {
    const account = this.getAllAccounts().find(
      (acc: AccountEntity) => acc.number === number
    );
    if (!account) {
      throw new AccountNotFoundError(
        `Account not found with account number ${number} in the system`
      );
    }
    return account;
  }

  getAllAccounts(): AccountEntity[] {
    return this.dataSource.getAllObjects();
  }

  updateAccount(updatedAccount: AccountEntity): boolean {
    const accounts = this.dataSource.getAllObjects();
    const index = accounts.findIndex(
      (acc: AccountEntity) => acc.number === updatedAccount.number
    );
    if (index !== -1) {
      accounts[index] = updatedAccount;
      return true;
    }
    throw new AccountNotFoundError(
      `Account not found with account number ${updatedAccount.number} in the system`
    );
  }

  deleteAccount(number: number): boolean {
    const accounts = this.dataSource.getAllObjects();
    const index = accounts.findIndex(
      (acc: AccountEntity) => acc.number === number
    );

    if (index !== -1) {
      this.dataSource.removeObjectAtIndex(index);
      return true;
    }

    throw new AccountNotFoundError(
      `Account not found with account number ${number} in the system`
    );
  }
}
