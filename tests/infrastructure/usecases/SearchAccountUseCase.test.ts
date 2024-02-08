import SearchAccountUseCase from "@/infrastructure/usecases/SearchAccountUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import DataContainer from "@/data/datasource/DataContainer";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import AccountType from "@/infrastructure/enums/AccountType";
import AccountNotFoundError from "@/infrastructure/errors/AccountNotFoundError";

describe("SearchAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should find the created account", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 2000,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the SearchAccountUseCase
    const foundAccount = SearchAccountUseCase.execute(
      accountsRepository,
      accountNumber
    );

    // Check if the correct account was found
    expect(foundAccount).toBeDefined();
    expect(foundAccount.number).toBe(accountNumber);
  });

  it("should find one of the two created accounts", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 2000,
    };

    // Execute the CreateNewAccountUseCase to create another Savings Account
    const currentAccountDetails = {
      type: AccountType.Current,
      number: 789012,
      createdAt: new Date().toISOString(),
      balance: 1500,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);
    CreateNewAccountUseCase.execute(accountsRepository, currentAccountDetails);

    const searchableAccountNumber = savingsAccountDetails.number;

    // Execute the SearchAccountUseCase
    const foundAccount = SearchAccountUseCase.execute(
      accountsRepository,
      searchableAccountNumber
    );

    // Check if one of the two accounts was found
    expect(foundAccount).toBeDefined();
    expect(
      foundAccount.number === savingsAccountDetails.number ||
        foundAccount.number === currentAccountDetails.number
    ).toBe(true);
  });

  it("should not find any account for a non-existent account number", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 2000,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;
    const undefinedAccountNumber = accountNumber + 100;
    
    // Check that no account was found
    expect(() => SearchAccountUseCase.execute(
      accountsRepository,
      undefinedAccountNumber
    )).toThrow(AccountNotFoundError);
  });

  it("should not find any account when no accounts are created", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    // Execute the SearchAccountUseCase without creating any accounts
    const nonExistentAccountNumber = 123456;

    // Check that no account was found
    expect(() => SearchAccountUseCase.execute(
      accountsRepository,
      nonExistentAccountNumber
    )).toThrow(AccountNotFoundError);
  });
});
