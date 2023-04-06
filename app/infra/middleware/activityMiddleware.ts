import { Context } from '../../deps.ts'

const activityMiddleware = async (
  ctx: Context,
  next: Function,
) => {
  const userAgent = ctx.request.headers.get("User-Agent");
  const acceptLanguage = ctx.request.headers.get("Accept-Language");
  const activity = {
    ip: ctx.request.ip,
    method: ctx.request.method,
    url: ctx.request.url,
    data: Date.now(),
    agente: userAgent,
    lang: acceptLanguage,
  };
  console.log(activity);
  await next();
};

export default activityMiddleware;
