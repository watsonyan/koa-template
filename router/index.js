import Router from '@koa/router';
import path from 'node:path';
import { readdirSync } from 'node:fs';

const router = new Router();

router.get('/', async (ctx, next) => {
  await next();
  ctx.body = '<h1>Index</h1>';
});

async function scanRouters(routerDir) {
  // 扫描router/modules目录:
  const dirname = path.resolve('./router');
  console.log(`scan dir ${dirname}...`);
  const files = readdirSync(path.join(dirname, routerDir)).filter((f) => f.endsWith('.js'));
  // for (const file in files) {
  files.forEach(async (file) => {
    // 导入模块:
    console.log(`import router/modules/${file}...`);
    const { default: mappings } = await import(`./${routerDir}/${file}`);
    // 把每个URL映射添加到router:
    Object.keys(mappings).forEach((url) => {
      if (url.startsWith('GET ')) {
        const p = url.substring(4);
        router.get(p, mappings[url]);
        console.log(`mapping: GET ${p}`);
      } else if (url.startsWith('POST ')) {
        const p = url.substring(5);
        router.post(p, mappings[url]);
        console.log(`mapping: POST ${p}`);
      } else {
        console.warn(`invalid mapping: ${url}`);
      }
    });
  });
}

scanRouters('./modules');

export default router;
