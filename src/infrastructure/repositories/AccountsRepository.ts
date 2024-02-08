import DataContainer from "@/data/datasource/DataContainer";
import AccountEntity from "@/infrastructure/entities/AccountEntity";

export default interface AccountsRepository {
  dataSource: DataContainer<AccountEntity>;

  addAccount(account: AccountEntity): boolean;
  getAccountByNumber(number: number): AccountEntity | undefined;
  getAllAccounts(): AccountEntity[];
  updateAccount(account: AccountEntity): boolean;
  deleteAccount(number: number): boolean;
}
