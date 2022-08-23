abstract class CustomError extends Error {
  constructor(message:string) {
    super(message);
    this.name = this.constructor.name;
  }

  abstract get code(): number;
}

export default CustomError;
