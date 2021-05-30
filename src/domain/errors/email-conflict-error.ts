export class EmailConflictError extends Error {
  constructor() {
    super("Email já cadastrado");
    this.name = "EmailConflictError";
  }
}
