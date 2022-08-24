import * as bcrypt from 'bcryptjs';

export const encryptPassword = (password: string) => (
  bcrypt.hashSync(password)
);

export const compareEncryptPassword = (password: string, hashPassword: string) => (
  bcrypt.compareSync(password, hashPassword)
);
