import { Router } from '../../../../deps.ts'
import { createSchema, getIdSchema } from '../../../zod/user.schema.ts'
import validate from '../../../middleware/validate.ts'
import controller from '../../../controller/user.controller.ts'
const router = new Router();

router
  .get<string>('/', controller.findAlCtl)
  .get<string>('/:id', controller.findByIdCtl)
  .post<string>('/', validate(createSchema), controller.createCtl)
  .put<string>('/:id', validate(getIdSchema), controller.updateCtl)
  .delete<string>('/:id', controller.deleteCtl)

export default router;