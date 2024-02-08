import DataContainer from "@/data/datasource/DataContainer";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import AccountType from "@/infrastructure/enums/AccountType";
import { generateAccountNumber } from "@/infrastructure/helper/accountNumberGenerator";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import DeleteAccountUseCase from "@/infrastructure/usecases/DeleteAccountUseCase";
import DepositIntoAccountUseCase from "@/infrastructure/usecases/DepositIntoAccountUseCase";
import DisplayAllAccountsUseCase from "@/infrastructure/usecases/DisplayAllAccountsUseCase";
import SearchAccountUseCase from "@/infrastructure/usecases/SearchAccountUseCase";
import UpdateAccountUseCase from "@/infrastructure/usecases/UpdateAccountUseCase";
import WithdrawFromAccount from "@/infrastructure/usecases/WithdrawFromAccountUseCase";

export function createNewAccount(type: string, balance: number) {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );

  let accountTypeEnum: AccountType;

  switch (type.toLowerCase()) {
    case "salary":
      accountTypeEnum = AccountType.Salary;
      break;
    case "current":
      accountTypeEnum = AccountType.Current;
      break;
    case "savings":
      accountTypeEnum = AccountType.Savings;
      break;
    default:
      throw new Error(`Invalid account type: ${type}`);
  }

  let accountNum = generateAccountNumber();

  while (
    accountsRepository.getAllAccounts().find((acc) => acc.number === accountNum)
  ) {
    accountNum = generateAccountNumber();
  }

  const accountDetails = {
    type: accountTypeEnum,
    number: accountNum,
    createdAt: new Date().toISOString(),
    balance: balance,
  };

  return CreateNewAccountUseCase.execute(accountsRepository, accountDetails);
}

export function updateAccount(number: number, smsServiceStatus: boolean) {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );
  return UpdateAccountUseCase.execute(
    accountsRepository,
    number,
    smsServiceStatus
  );
}

export function depositAccount(number: number, amount: number) {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );
  return DepositIntoAccountUseCase.execute(accountsRepository, number, amount);
}

export function withdrawAccount(number: number, amount: number) {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );
  return WithdrawFromAccount.execute(accountsRepository, number, amount);
}

export function searchAccount(number: number) {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );
  return SearchAccountUseCase.execute(accountsRepository, number);
}

export function deleteAccount(number: number) {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );
  return DeleteAccountUseCase.execute(accountsRepository, number);
}

export function fetchAllAccounts() {
  const accountsRepository = new AccountsRepositoryImplementation(
    DataContainer.getInstance()
  );
  return DisplayAllAccountsUseCase.execute(accountsRepository);
}
