export interface IUserService {
  validateRegisteredUser(email: string, password: string): Promise<void>
}
