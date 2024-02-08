import { z, ZodError } from "zod";
import SchemaError from "@/infrastructure/errors/SchemaError";
import DepositError from "@/infrastructure/errors/DepositError";
import WithdrawError from "@/infrastructure/errors/WithdrawError";

export default abstract class AccountEntity {
  name: string;
  number: number;
  createdAt: string;
  balance: number;
  smsServiceActiveStatus: boolean;

  constructor(
    name: string,
    number: number,
    createdAt: string,
    balance: number,
    smsServiceActiveStatus: boolean = true // By default, SMS service is Active
  ) {
    try {
      const validatedData = AccountEntity.schema().parse({
        name,
        number,
        createdAt,
        balance,
        smsServiceActiveStatus,
      });

      this.name = validatedData.name;
      this.number = validatedData.number;
      this.createdAt = validatedData.createdAt;
      this.balance = validatedData.balance;
      this.smsServiceActiveStatus = validatedData.smsServiceActiveStatus;

      // Check if the initial balance is greater than or equal to the minimum balance
      this.validateMinimumBalance();
    } catch (error) {
      if (error instanceof ZodError)
        throw new SchemaError((error as ZodError).issues[0].message);
      else throw error;
    }
  }

  deposit(amount: number): void {
    try {
      const validatedAmount = z
        .number()
        .positive("Deposit amount must be a positive number")
        .multipleOf(0.01, {
          message: "Amount can have two decimal precision.",
        })
        .parse(amount);

      this.balance += validatedAmount;
    } catch (error) {
      if (error instanceof ZodError)
        throw new DepositError((error as ZodError).issues[0].message);
      else throw error;
    }
  }

  withdraw(amount: number): void {
    try {
      const validatedAmount = z
        .number()
        .positive("Withdrawal amount must be a positive number")
        .multipleOf(0.01, {
          message: "Amount can have two decimal precision.",
        })
        .parse(amount);

      // Check if the account has sufficient balance
      if (this.balance < validatedAmount) {
        throw new WithdrawError("Insufficient balance for withdrawal!");
      }

      // Check if the resulting balance after withdrawal is greater than or equal to the minimum balance
      if (this.balance - validatedAmount < this.getMinimumBalance()) {
        throw new WithdrawError(
          "Minimum balance requirement won't met after withdrawal!"
        );
      }

      this.balance -= validatedAmount;
    } catch (error) {
      if (error instanceof ZodError)
        throw new WithdrawError((error as ZodError).issues[0].message);
      else throw error;
    }
  }

  setSmsServiceActiveStatus(smsServiceActiveStatus: boolean) {
    this.smsServiceActiveStatus = smsServiceActiveStatus;
  }

  private validateMinimumBalance() {
    if (this.balance < this.getMinimumBalance()) {
      throw new SchemaError(
        "Initial balance does not meet the minimum balance requirement!"
      );
    }
  }

  abstract getMinimumBalance(): number;

  toJson(): string {
    return JSON.stringify({
      name: this.name,
      number: this.number,
      createdAt: this.createdAt,
      balance: this.balance,
      smsServiceActiveStatus: this.smsServiceActiveStatus,
    });
  }

  toMap(): Map<string, any> {
    const accountMap = new Map<string, any>();
    accountMap.set("name", this.name);
    accountMap.set("number", this.number);
    accountMap.set("createdAt", this.createdAt);
    accountMap.set("balance", this.balance);
    accountMap.set("smsServiceActiveStatus", this.smsServiceActiveStatus);
    return accountMap;
  }

  static schema() {
    return z.object({
      name: z.string().min(0, { message: "Account name cannot be empty!" }),
      number: z.number().min(0, { message: "Account number cannot be empty!" }),
      createdAt: z
        .string()
        .datetime({ message: "Account creation datetime is invalid!" }),
      balance: z.number().multipleOf(0.01, {
        message: "Account balance can have two decimal precision.",
      }),
      smsServiceActiveStatus: z.boolean(),
    });
  }
}
