import { Router } from '../../../../deps.ts'
import { createSchema, getIdSchema } from '../../../zod/user.schema.ts'
import validate from '../../../middleware/validate.ts'
import controller from '../../../controller/user.controller.ts'
const router = new Router();

router
  .get<string>('/', controller.findAlCtl)
  .get<string>('/:userId', controller.findByIdCtl)
  .post<string>('/', validate(createSchema), controller.createCtl)
  .put<string>('/:userId', validate(getIdSchema), controller.updateCtl)
  .delete<string>('/:userId', controller.deleteCtl)

export default router;