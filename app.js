import Koa from 'koa';
import bodyParser from '@koa/bodyparser';

import router from './router/index.js';

import { sequelize, User } from './db/orm.js';

async function initDb() {
  await sequelize.sync();
  const email = 'Admin@example.com';
  const user = await User.findOne({ where: { email } });
  // console.log(user);
  // 不存在则自动创建:
  if (user === null) {
    await User.create({
      email,
      name: 'Bob',
      password: '123456',
    });
  }
}

initDb();

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`process ${ctx.method} ${ctx.url}`);
  await next();
});

app.use(bodyParser());

app.use(router.routes());

// app.context.db = await initDb()

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
