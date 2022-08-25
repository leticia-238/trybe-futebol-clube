import CustomError from './CustomError';

class NotFoundError extends CustomError {
  private _code = 404;
  get code() : number { return this._code; }
}

export default NotFoundError;
