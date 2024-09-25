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

async function updateUser(userNew) {
  const user = await getUserByID(userNew.id);
  if (user) {
    Object.keys(userNew).forEach((key) => {
      user[key] = userNew[key];
    });
  }
  return user.save();
}

export default {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
};
