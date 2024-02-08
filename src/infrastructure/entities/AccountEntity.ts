import { z, ZodError } from "zod";
import SchemaError from "@/infrastructure/errors/SchemaError";

export default abstract class AccountEntity {
  name: string;
  number: number;
  createdAt: string;
  balance: number;

  constructor(
    name: string,
    number: number,
    createdAt: string,
    balance: number
  ) {
    try {
      const validatedData = AccountEntity.schema().parse({
        name,
        number,
        createdAt,
        balance,
      });

      this.name = validatedData.name;
      this.number = validatedData.number;
      this.createdAt = validatedData.createdAt;
      this.balance = validatedData.balance;
    } catch (error) {
      if (error instanceof ZodError)
        throw new SchemaError((error as ZodError).issues[0].message);
      else throw error;
    }
  }

  toJson(): string {
    return JSON.stringify({
      name: this.name,
      number: this.number,
      createdAt: this.createdAt,
      balance: this.balance,
    });
  }

  toMap(): Map<string, any> {
    const accountMap = new Map<string, any>();
    accountMap.set("name", this.name);
    accountMap.set("number", this.number);
    accountMap.set("createdAt", this.createdAt);
    accountMap.set("balance", this.balance);
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
    });
  }
}
