export class AuthenticationError extends Error {
  constructor() {
    super("Sua sessão expirou!");
    this.name = "AuthenticationError";
  }
}
