import * as bcrypt from 'bcryptjs';

export const encryptPassword = (password: string): string => (
  bcrypt.hashSync(password)
);

export const compareEncryptPassword = (
  password: string,
  hashPassword: string,
): boolean => bcrypt.compareSync(password, hashPassword);
