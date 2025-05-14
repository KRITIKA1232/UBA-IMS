import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../helpers/db';

// Define TypeScript interface for User attributes
interface UserAttributes {
  id: number;
  fname: string;
  lname: string;
}

// Allow `id` to be optional when creating a user
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Extend Sequelize Model with strong typing
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public fname!: string;
  public lname!: string;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,

      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

export default User; 
