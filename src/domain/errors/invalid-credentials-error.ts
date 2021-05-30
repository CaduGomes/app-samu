export class InvalidCredentialsError extends Error {
  constructor() {
    super("Verifique seu email e sua senha");
    this.name = "InvalidCredentialsError";
  }
}
