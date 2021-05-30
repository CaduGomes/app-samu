export class ConflictError extends Error {
  constructor() {
    super("Adicional com o mesmo nome já cadastrado!");
    this.name = "ConflictError";
  }
}
