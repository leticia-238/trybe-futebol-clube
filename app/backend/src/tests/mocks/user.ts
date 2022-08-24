import { encryptPassword } from "../../utils/encrypt";

export const validEmail = "email@email.com";
export const validPassword = "123456abc";
const hashPassword = encryptPassword(validPassword)
 
export const mockUserLogin = {
  email: validEmail,
  password: hashPassword,
};

export const mockUserToken = "token123456";