import Koa from 'koa';

const app = new Koa();

app.use(async (ctx, next) => {
  await next();

  // let string = 'double';
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello World</h1>';
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
