import WithdrawFromAccountUseCase from "@/infrastructure/usecases/WithdrawFromAccountUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import WithdrawError from "@/infrastructure/errors/WithdrawError";
import DataContainer from "@/data/datasource/DataContainer";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import AccountType from "@/infrastructure/enums/AccountType";
import MinimumAccountBalanceConfig from "@/infrastructure/config/MinimumAccountBalanceConfig";

describe("WithdrawFromAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should withdraw 500 from Savings Account with initial balance of 1000 to get Minimum Balance Error", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance = 1000;
    const withdrawAmount = 500;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Check if the withdrawal was successful
    expect(() =>
      WithdrawFromAccountUseCase.execute(
        accountsRepository,
        accountNumber,
        withdrawAmount
      )
    ).toThrow(WithdrawError);

    // Check if the balance is not updated
    const updatedSavingsAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSavingsAccount.balance).toBe(initialBalance);
  });

  it("should withdraw 11 from Savings Account with initial balance of 1010 to get Minimum Balance Error", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance =
      MinimumAccountBalanceConfig.SAVINGS_ACCOUNT_MIN_BALANCE + 10;
    const withdrawAmount = 11;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Check if the withdrawal was successful
    expect(() =>
      WithdrawFromAccountUseCase.execute(
        accountsRepository,
        accountNumber,
        withdrawAmount
      )
    ).toThrow(WithdrawError);

    // Check if the balance is not updated
    const updatedSavingsAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSavingsAccount.balance).toBe(initialBalance);
  });

  it("should withdraw 10 from Savings Account with initial balance of 1010", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance =
      MinimumAccountBalanceConfig.SAVINGS_ACCOUNT_MIN_BALANCE + 10;
    const withdrawAmount = 10;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the WithdrawFromAccountUseCase
    const result = WithdrawFromAccountUseCase.execute(
      accountsRepository,
      accountNumber,
      withdrawAmount
    );

    // Check if the withdrawal was successful
    expect(result).toBe(true);

    // Check if the balance is updated correctly
    const updatedSavingsAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSavingsAccount.balance).toBe(initialBalance - withdrawAmount);
  });

  it("should withdraw 500 from Savings Account with initial balance of 2000", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance = 2000;
    const withdrawAmount = 500;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the WithdrawFromAccountUseCase
    const result = WithdrawFromAccountUseCase.execute(
      accountsRepository,
      accountNumber,
      withdrawAmount
    );

    // Check if the withdrawal was successful
    expect(result).toBe(true);

    // Check if the balance is updated correctly
    const updatedSavingsAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSavingsAccount.balance).toBe(initialBalance - withdrawAmount);
  });

  it("should throw WithdrawError for negative withdrawal amount", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );
    const initialBalance = 1000;
    const negativeWithdrawAmount = -200;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the WithdrawFromAccountUseCase and expect it to throw WithdrawError
    expect(() => {
      WithdrawFromAccountUseCase.execute(
        accountsRepository,
        accountNumber,
        negativeWithdrawAmount
      );
    }).toThrow(WithdrawError);
  });

  it("should throw WithdrawError for withdrawal amount exceeding balance", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );
    const initialBalance = 1000;
    const withdrawAmount = 1200;

    // Execute the CreateNewAccountUseCase to create a Savings Account
    const savingsAccountDetails = {
      type: AccountType.Savings,
      number: 123456,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, savingsAccountDetails);

    const accountNumber = savingsAccountDetails.number;

    // Execute the WithdrawFromAccountUseCase and expect it to throw WithdrawError
    expect(() => {
      WithdrawFromAccountUseCase.execute(
        accountsRepository,
        accountNumber,
        withdrawAmount
      );
    }).toThrow(WithdrawError);
  });

  it("should withdraw 50 from Salary Account with initial balance of 200", () => {
    const accountsRepository = new AccountsRepositoryImplementation(
      DataContainer.getInstance()
    );

    const initialBalance = 200;
    const withdrawAmount = 50;

    // Execute the CreateNewAccountUseCase to create a Salary Account
    const salaryAccountDetails = {
      type: AccountType.Salary,
      number: 789012,
      createdAt: new Date().toISOString(),
      balance: initialBalance,
    };

    CreateNewAccountUseCase.execute(accountsRepository, salaryAccountDetails);

    const accountNumber = salaryAccountDetails.number;

    // Execute the WithdrawFromAccountUseCase
    const result = WithdrawFromAccountUseCase.execute(
      accountsRepository,
      accountNumber,
      withdrawAmount
    );

    // Check if the withdrawal was successful
    expect(result).toBe(true);

    // Check if the balance is updated correctly
    const updatedSalaryAccount =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(updatedSalaryAccount.balance).toBe(initialBalance - withdrawAmount);
  });
});
