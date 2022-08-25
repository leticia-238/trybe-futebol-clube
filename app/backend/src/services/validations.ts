import { IUserLogin } from '../interfaces/User';
import UnauthorizedError from '../errors/UnauthorizedError';
import ValidationError from '../errors/ValidationError';
import NotFoundError from '../errors/NotFoundError';

const invalidLoginMessage = 'Incorrect email or password';

export const validateSigninPayload = (payload: IUserLogin): void => {
  const hasKeys = 'email' in payload && 'password' in payload;
  if (!hasKeys) throw new ValidationError('All fields must be filled');

  const { email, password } = payload;
  const isEmpty = email.trim().length === 0 || password.trim().length === 0;
  if (isEmpty) throw new ValidationError('All fields must be filled');

  const isString = typeof email === 'string' && typeof password === 'string';
  if (!isString) throw new UnauthorizedError(invalidLoginMessage);

  // regex copiado da seguinte fonte: https://regexr.com/3e48o
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const validPassword = password.length > 6;
  if (!validEmail || !validPassword) {
    throw new UnauthorizedError(invalidLoginMessage);
  }
};

export const validateAuthorizationHeader = (token: unknown) => {
  if (!token) throw new ValidationError('token not found');
};

export const validateIdParam = (id: unknown) => {
  if (Number.isNaN(Number(id))) throw new NotFoundError('Not Found');
};
