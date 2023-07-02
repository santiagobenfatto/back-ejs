import { Router } from 'express';
import sessionRouter from './sessions.routes.js'
import viewsRouter from './views.routes.js'

const router = Router()

router.use('/', viewsRouter);
router.use('/api/sessions', sessionRouter);

export default router