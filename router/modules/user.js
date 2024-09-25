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
  ResponseUtil.success(ctx, u);
}

export default {
  'GET /users': getUsers,
  'GET /users/:id': getUserByID,
  'POST /users': addUser,
};
