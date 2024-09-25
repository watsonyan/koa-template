import UserService from '../services/user.js';
import ResponseUtil from '../../utils/responseUtil.js';

async function getUsers(ctx, next) {
  await next();
  const users = await UserService.getUsers();
  if (users !== null) {
    ResponseUtil.success(ctx, users);
  } else {
    console.log('no users now');
    // ctx.body = [];
    ResponseUtil.success(ctx, []);
  }
}

async function getUserByID(ctx, next) {
  await next();
  const { id } = ctx.params;
  const user = await UserService.getUserByID(id);
  if (user !== null) {
    ResponseUtil.success(ctx, user);
  } else {
    ResponseUtil.error(ctx, 'no user found');
  }
}

async function addUser(ctx, next) {
  await next();
  const user = ctx.request.body;
  const u = await UserService.addUser(user);
  if (u !== null) {
    ResponseUtil.success(ctx, u);
  } else {
    ResponseUtil.error(ctx, 'add user failed');
  }
}

async function updateUser(ctx, next) {
  await next();
  const { id } = ctx.params;
  const user = ctx.request.body;
  user.id = id;
  // console.log(user, '------');
  const u = await UserService.updateUser(user);
  if (u !== null) {
    ResponseUtil.success(ctx, u);
  } else {
    ResponseUtil.error(ctx, 'update user failed');
  }
}

export default {
  'GET /users': getUsers,
  'GET /users/:id': getUserByID,
  'POST /users': addUser,
  'PUT /users/:id': updateUser,
};
