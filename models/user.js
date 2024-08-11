import { DataTypes } from 'sequelize';

const User = (sequelize) => {
  sequelize.define('user',{
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    }
  }, {
    paranoid: true
  });
}

export default User