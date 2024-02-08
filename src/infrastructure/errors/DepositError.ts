export default class DepositError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DepositError";
  }
}
