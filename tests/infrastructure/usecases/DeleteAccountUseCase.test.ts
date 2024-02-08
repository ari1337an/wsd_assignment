// DeleteAccountUseCase.test.ts
import DeleteAccountUseCase from "@/infrastructure/usecases/DeleteAccountUseCase";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import DisplayAllAccountsUseCase from "@/infrastructure/usecases/DisplayAllAccountsUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import DataContainer from "@/data/datasource/DataContainer";
import AccountType from "@/infrastructure/enums/AccountType";

describe("DeleteAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should create two account and delete one of them successfully", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const savingsAccount = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 1000,
    };

    const currentAccount = {
      type: AccountType.Current,
      number: 123458,
      createdAt: new Date().toISOString(),
      balance: 1000,
    };

    // Create account
    CreateNewAccountUseCase.execute(accountsRepository, savingsAccount);
    CreateNewAccountUseCase.execute(accountsRepository, currentAccount);

    // Use the DeleteAccountUseCase to delete the account
    const deleted = DeleteAccountUseCase.execute(
      accountsRepository,
      savingsAccount.number
    );

    // get currently available accounts
    const allAccounts = DisplayAllAccountsUseCase.execute(accountsRepository);

    // Assertions
    expect(deleted).toBe(true);
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0].name).toBe("Current Account");
    expect(allAccounts[0].number).toBe(currentAccount.number);
    expect(allAccounts[0].createdAt).toBe(currentAccount.createdAt);
    expect(allAccounts[0].balance).toBe(currentAccount.balance);
  });
});
