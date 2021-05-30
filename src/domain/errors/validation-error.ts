export class ValidationError extends Error {
  constructor(public validation: string) {
    super("Verifique os campos!");
    this.validation = validation;
    this.name = "ValidationError";
  }
}
