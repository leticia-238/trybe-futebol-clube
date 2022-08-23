import CustomError from './CustomError';

class UnauthorizedError extends CustomError {
  private _code = 401;
  get code() : number { return this._code; }
}

export default UnauthorizedError;
