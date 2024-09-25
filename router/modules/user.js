import { User } from '../../db/orm.js';

async function greet(ctx, next) {
  await next();
  const { name } = ctx.params;
  // 从数据库查询用户:
  // let user = await ctx.db.fetch`SELECT * FROM users WHERE name=${name}`
  const user = await User.findOne({ where: { name } });
  if (user !== null) {
    console.log('signin ok!', user.toJSON());
    ctx.body = user;
  } else {
    console.log('signin failed!');
    ctx.body = {
      error: 'USER_NOT_FOUND',
    };
  }
}

async function getUserByID(ctx, next) {
  await next();
  // let name = ctx.params.name;
  const { id } = ctx.params;
  const user = await User.findOne({ where: { id } });
  if (user !== null) {
    ctx.body = user;
  } else {
    ctx.body = {
      error: 'USER_NOT_FOUND',
    };
  }
}

export default {
  'GET /user/greet/:name': greet,
  'GET /user/:id': getUserByID,
};
