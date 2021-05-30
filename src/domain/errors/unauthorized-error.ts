export class UnauthorizedError extends Error {
  constructor() {
    super("Sem permissão necessária!");
    this.name = "AuthorizationError";
  }
}
