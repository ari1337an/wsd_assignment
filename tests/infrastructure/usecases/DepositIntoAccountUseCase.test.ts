import DepositIntoAccountUseCase from "@/infrastructure/usecases/DepositIntoAccountUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import DepositError from "@/infrastructure/errors/DepositError";
import DataContainer from "@/data/datasource/DataContainer";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import AccountType from "@/infrastructure/enums/AccountType";

describe("DepositIntoAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should deposit 1000 into Savings Account with initial balance of 2000", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance = 2000;
    const depositAmount = 1000;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the DepositIntoAccountUseCase
    const result = DepositIntoAccountUseCase.execute(
      accountsRepository,
      accountNumber,
      depositAmount
    );

    // Check if the deposit was successful
    expect(result).toBe(true);

    // Check if the balance is updated correctly
    const updatedSavingsAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSavingsAccount.balance).toBe(initialBalance + depositAmount);
  });

  it("should deposit 110.5 into Savings Account with initial balance of 2100", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance = 2100;
    const depositAmount = 110.5;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the DepositIntoAccountUseCase
    const result = DepositIntoAccountUseCase.execute(
      accountsRepository,
      accountNumber,
      depositAmount
    );

    // Check if the deposit was successful
    expect(result).toBe(true);

    // Check if the balance is updated correctly
    const updatedSavingsAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSavingsAccount.balance).toBe(initialBalance + depositAmount);
  });

  it("should throw DepositError for negative deposit amount", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );
    const initialBalance = 2000;
    const negativeDepositAmount = -500;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the DepositIntoAccountUseCase and expect it to throw DepositError
    expect(() => {
      DepositIntoAccountUseCase.execute(
        accountsRepository,
        accountNumber,
        negativeDepositAmount
      );
    }).toThrow(DepositError);
  });

  it("should deposit 510.59 into one Savings Account with initial balance of 2500, leaving another Savings Account with initial balance 2100 unaffected", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    // Execute the CreateNewAccountUseCase to create two Savings Accounts
    const savingsAccount1Details = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: 2500,
    };

    const savingsAccount2Details = {
      type: AccountType.Savings,
      number: 789012,
      createdAt: new Date().toISOString(),
      balance: 2100,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccount1Details);
    CreateNewAccountUseCase.execute(accountsRepository, savingsAccount2Details);

    const accountNumberToDeposit = savingsAccount1Details.number;
    const depositAmount = 510.59;

    // Execute the DepositIntoAccountUseCase
    const result = DepositIntoAccountUseCase.execute(
      accountsRepository,
      accountNumberToDeposit,
      depositAmount
    );

    const updatedSavingsAccount1 = accountsRepository.getAccountByNumber(
      accountNumberToDeposit
    );
    const savingsAccount2 = accountsRepository.getAccountByNumber(
      savingsAccount2Details.number
    );

    // Check if the deposit was successful
    expect(result).toBe(true);

    // Check if the balance of the first Savings Account is updated correctly
    expect(updatedSavingsAccount1.balance).toBe(
      savingsAccount1Details.balance + depositAmount
    );

    // Check if the balance of the second Savings Account is unaffected
    expect(savingsAccount2.balance).toBe(savingsAccount2Details.balance);
  });
});
