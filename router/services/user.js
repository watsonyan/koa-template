import { User } from '../../db/orm.js';

async function getUsers() {
  const users = await User.findAll();
  return users;
}

async function getUserByID(id) {
  const user = await User.findOne({ where: { id } });
  return user;
}

async function addUser(user) {
  const newUser = await User.create(user);
  return newUser;
}

export default {
  getUsers,
  getUserByID,
  addUser,
};
