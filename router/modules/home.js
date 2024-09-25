async function home(ctx, next) {
  await next();
  ctx.body = '<h1>Home</h1>';
}

export default {
  'GET /home': home,
};
