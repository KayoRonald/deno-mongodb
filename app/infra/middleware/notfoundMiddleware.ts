import { Context } from '../../deps.ts'

const notfoundMiddleware = async (
  ctx: Context,
  next: Function,
) => {
  await next();
  if (ctx.response.status === 404 && ctx.request.accepts("application/json")) {
    ctx.response.type = "json";
    ctx.response.body = { message: "Not Found" };
  }
};

export default notfoundMiddleware;
