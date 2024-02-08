// menu.ts
const inquirer = require("inquirer");
import {
  createNewAccount,
  deleteAccount,
  depositAccount,
  fetchAllAccounts,
  searchAccount,
  updateAccount,
  withdrawAccount,
} from "./operations";

export async function displayMainMenu() {
  const prompt = inquirer.createPromptModule();

  const questions = [
    {
      type: "rawlist",
      name: "choice",
      message: "Select an option:",
      loop: false,
      choices: [
        "Create a new account",
        "Display all accounts",
        "Update an account",
        "Delete an account",
        "Deposit an amount",
        "Withdraw an amount",
        "Search for an account",
        "Exit",
      ],
    },
  ];

  const answers = await prompt(questions);
  return answers.choice.toLowerCase().replace(/\s/g, "");
}

export async function updateAccountPrompt() {
  try {
    // Prompt the user for an account number
    const { accountNumber, smsServiceStatus } = await inquirer.prompt([
      {
        type: "number",
        name: "accountNumber",
        message: "Enter the account number:",
      },
      {
        type: "confirm",
        name: "smsServiceStatus",
        message: "Set account SMS Service as active?",
        default: true, // You can set a default value if needed
      },
    ]);

    // Call the updateAccount function with the provided account number
    updateAccount(accountNumber, smsServiceStatus);

    console.log("Updated!");
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function searchAccountPrompt() {
  try {
    // Prompt the user for an account number to search
    const { accountNumber } = await inquirer.prompt([
      {
        type: "number",
        name: "accountNumber",
        message: "Enter the account number to search:",
      },
    ]);

    // Call the searchAccount function with the provided account number
    const result = searchAccount(accountNumber);

    if (result) {
      console.log("Account found!");
      console.log(result); // Display the account details
    } else {
      console.log("Account not found.");
    }
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function depositAccountPrompt() {
  try {
    // Prompt the user for an account number and deposit amount
    const { accountNumber, depositAmount } = await inquirer.prompt([
      {
        type: "number",
        name: "accountNumber",
        message: "Enter the account number:",
      },
      {
        type: "number",
        name: "depositAmount",
        message: "Enter the deposit amount:",
      },
    ]);

    // Call the depositAccount function with the provided account number and deposit amount
    const result = depositAccount(accountNumber, depositAmount);

    console.log("Deposit successful!");
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function withdrawAccountPrompt() {
  try {
    // Prompt the user for an account number and deposit amount
    const { accountNumber, depositAmount } = await inquirer.prompt([
      {
        type: "number",
        name: "accountNumber",
        message: "Enter the account number:",
      },
      {
        type: "number",
        name: "depositAmount",
        message: "Enter the withdraw amount:",
      },
    ]);

    // Call the depositAccount function with the provided account number and deposit amount
    const result = withdrawAccount(accountNumber, depositAmount);

    console.log("Withdraw successful!");
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function deleteAccountPrompt() {
  try {
    // Prompt the user for an account number
    const { accountNumber } = await inquirer.prompt({
      type: "number",
      name: "accountNumber",
      message: "Enter the account number:",
    });

    // Call the deleteAccount function with the provided account number
    deleteAccount(accountNumber);

    console.log("Deleted!");
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function displayAllAccountsPrompt() {
  try {
    const result = fetchAllAccounts();

    console.log(result);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function createNewAccountPrompt() {
  const prompt = inquirer.createPromptModule();

  const accountTypeQuestion = {
    type: "list",
    name: "type",
    message: "Select the type of account:",
    choices: ["Salary", "Current", "Savings"],
  };

  const balanceQuestion = {
    type: "number",
    name: "balance",
    message: "Enter the initial balance:",
  };

  const accountTypeAnswer = await prompt(accountTypeQuestion);
  const balanceAnswer = await prompt(balanceQuestion);

  try {
    const result = createNewAccount(
      accountTypeAnswer.type.toLowerCase(),
      balanceAnswer.balance
    );

    if (result) console.log("Account created successfully!");
    else console.error("Couldn't create account");
  } catch (error: any) {
    console.error(error.message);
  }
}
