// DisplayAllAccountsUseCase.test.ts
import DisplayAllAccountsUseCase from "@/infrastructure/usecases/DisplayAllAccountsUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import DataContainer from "@/data/datasource/DataContainer";
import AccountType from "@/infrastructure/enums/AccountType";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";

describe("DisplayAllAccountsUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should display all accounts with a length of 2", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const savingsAccount = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 1000,
    };

    const salaryAccount = {
      type: AccountType.Salary,
      number: 1234567,
      createdAt: new Date().toISOString(),
      balance: 2000,
    };

    // Create two accounts
    CreateNewAccountUseCase.execute(accountsRepository, savingsAccount);
    CreateNewAccountUseCase.execute(accountsRepository, salaryAccount);

    // Use the DisplayAllAccountsUseCase to get all accounts
    const allAccounts = DisplayAllAccountsUseCase.execute(accountsRepository);

    // Assertions
    expect(allAccounts.length).toBe(2);
  });

  it("should display all accounts with a length of 0", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    // Use the DisplayAllAccountsUseCase to get all accounts
    const allAccounts = DisplayAllAccountsUseCase.execute(accountsRepository);

    // Assertions
    expect(allAccounts.length).toBe(0);
  });
});
