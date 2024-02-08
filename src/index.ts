import {
  displayMainMenu,
  createNewAccountPrompt,
  displayAllAccountsPrompt,
  updateAccountPrompt,
  depositAccountPrompt,
  searchAccountPrompt,
  deleteAccountPrompt,
  withdrawAccountPrompt,
} from "@/presentation/menu";

async function startApp() {
  while (true) {
    const mainMenuChoice = await displayMainMenu();

    switch (mainMenuChoice) {
      case "createanewaccount":
        await createNewAccountPrompt();
        break;
      case "displayallaccounts":
        await displayAllAccountsPrompt();
        break;
      case "updateanaccount":
        await updateAccountPrompt();
        break;
      case "deleteanaccount":
        await deleteAccountPrompt();
        break;
      case "depositanamount":
        await depositAccountPrompt();
        break;
      case "withdrawanamount":
        await withdrawAccountPrompt();
        break;
      case "searchforanaccount":
        await searchAccountPrompt();
        break;
      case "exit":
        process.exit(0);
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

startApp();
