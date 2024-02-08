export default class AccountTypeNotSupportedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AccountTypeNotSupportedError";
  }
}
