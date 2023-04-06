import { Router } from '../../deps.ts'
import users  from './router/users/user.router.ts'

const router = new Router({
  prefix: "/v1"
});

router.use(["/user", "/users"], users.routes())

export default router;