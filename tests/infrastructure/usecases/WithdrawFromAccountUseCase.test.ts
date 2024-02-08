import WithdrawFromAccountUseCase from "@/infrastructure/usecases/WithdrawFromAccountUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import WithdrawError from "@/infrastructure/errors/WithdrawError";
import DataContainer from "@/data/datasource/DataContainer";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import AccountType from "@/infrastructure/enums/AccountType";

describe("WithdrawFromAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should withdraw 500 from Savings Account with initial balance of 1000", () => {
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
