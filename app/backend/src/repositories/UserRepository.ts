import { IUserWithPassword } from '../interfaces/user_interfaces/IUser';
import User from '../database/models/User';

class UserRepository {
  private model = User;

  findByEmail = async (email: string): Promise<IUserWithPassword> => {
    const user = await this.model.findOne({
      where: { email },
      raw: true,
    });
    return user as IUserWithPassword;
  };
}

export default UserRepository;
