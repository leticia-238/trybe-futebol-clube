import CustomError from './CustomError';

class ValidationError extends CustomError {
  private _code = 400;
  get code() : number { return this._code; }
}

export default ValidationError;
