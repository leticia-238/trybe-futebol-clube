import { Model, DataTypes } from 'sequelize';
import { RoleType } from '../../interfaces/IUser';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: RoleType;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'User',
  underscored: true,
  timestamps: false,
});

export default User;
