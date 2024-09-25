// responseUtil.js
const success = (ctx, data, message) => {
  ctx.body = {
    code: 0,
    data,
    message: message || '请求成功',
  };
};

const error = (ctx, message, statusCode = 1) => {
  // ctx.status = statusCode;
  ctx.body = {
    code: statusCode,
    message: message || '请求失败',
  };
};

export default {
  success,
  error,
};
