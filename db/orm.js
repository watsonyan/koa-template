import { Sequelize, DataTypes } from 'sequelize';

// import path from 'node:path';

// const workDir = path.resolve('.');
// console.log(workDir, 'workDir---------');
export const sequelize = new Sequelize('sqlite:./db/test.db');

export const User = sequelize.define(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
  },
);
