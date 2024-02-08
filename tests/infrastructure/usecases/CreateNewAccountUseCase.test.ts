// CreateNewAccountUseCase.test.ts
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import DataContainer from "@/data/datasource/DataContainer";
import AccountType from "@/infrastructure/enums/AccountType";

describe("CreateNewAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should add a new Savings account successfully", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const testcase_account_detail = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 1000,
    };

    CreateNewAccountUseCase.execute(accountsRepository, testcase_account_detail);

    const allAccounts = accountsRepository.getAllAccounts();

    // assertions
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0].name).toBe("Savings Account");
    expect(allAccounts[0].number).toBe(testcase_account_detail.number);
    expect(allAccounts[0].createdAt).toBe(testcase_account_detail.createdAt);
    expect(allAccounts[0].balance).toBe(testcase_account_detail.balance);
  });

  it("should add a new Salary account successfully", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const testcase_account_detail = {
      type: AccountType.Salary,
      number: 1234567,
      createdAt: new Date().toISOString(),
      balance: 2000,
    };

    CreateNewAccountUseCase.execute(accountsRepository, testcase_account_detail);

    const allAccounts = accountsRepository.getAllAccounts();

    // assertions
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0].name).toBe("Salary Account");
    expect(allAccounts[0].number).toBe(testcase_account_detail.number);
    expect(allAccounts[0].createdAt).toBe(testcase_account_detail.createdAt);
    expect(allAccounts[0].balance).toBe(testcase_account_detail.balance);
  });

  it("should add a new Current account successfully", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const testcase_account_detail = {
      type: AccountType.Current,
      number: 987654,
      createdAt: new Date().toISOString(),
      balance: 3000,
    };

    CreateNewAccountUseCase.execute(accountsRepository, testcase_account_detail);

    const allAccounts = accountsRepository.getAllAccounts();

    // assertions
    expect(allAccounts.length).toBe(1);
    expect(allAccounts[0].name).toBe("Current Account");
    expect(allAccounts[0].number).toBe(testcase_account_detail.number);
    expect(allAccounts[0].createdAt).toBe(testcase_account_detail.createdAt);
    expect(allAccounts[0].balance).toBe(testcase_account_detail.balance);
  });

  it("should check the length after creating two accounts", () => {
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

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccount);
    CreateNewAccountUseCase.execute(accountsRepository, salaryAccount);

    const allAccounts = accountsRepository.getAllAccounts();

    // assertions
    expect(allAccounts.length).toBe(2);
  });
});
