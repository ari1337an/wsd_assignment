import UpdateAccountUseCase from "@/infrastructure/usecases/UpdateAccountUseCase";
import AccountsRepositoryImplementation from "@/data/repositories/AccountsRepositoryImplementation";
import DataContainer from "@/data/datasource/DataContainer";
import CreateNewAccountUseCase from "@/infrastructure/usecases/CreateNewAccountUseCase";
import AccountType from "@/infrastructure/enums/AccountType";

describe("UpdateAccountUseCase tests", () => {
  beforeEach(() => {
    // Clear all data before each test
    DataContainer.getInstance().clear();
  });

  it("should update SMS service status from true to false and then to true", () => {
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

    // Execute the UpdateAccountUseCase to set SMS service to false
    UpdateAccountUseCase.execute(accountsRepository, accountNumber, false);

    // Check if the SMS service status is updated correctly
    const accountWithFalseStatus =
      accountsRepository.getAccountByNumber(accountNumber);
    expect(accountWithFalseStatus.smsServiceActiveStatus).toBe(false);

    // Execute the UpdateAccountUseCase to set SMS service back to true
    UpdateAccountUseCase.execute(accountsRepository, accountNumber, true);

    // Check if the SMS service status is updated correctly
    const accountWithTrueStatus =
      accountsRepository.getAccountByNumber(accountNumber);

    expect(accountWithTrueStatus.smsServiceActiveStatus).toBe(true);
  });
});
