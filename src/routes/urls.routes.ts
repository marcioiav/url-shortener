
import { Router } from 'express'
import { getByCodeHandler, getByIdHandler, listByDateHandler, postShorten, redirectByCode } from '../controllers/urls.controller.js'
import { requireISODate } from '../middlewares/validateDate.middleware.js'

const router = Router()

router.post('/urls', postShorten)
router.get('/urls/:id', getByIdHandler)
router.get('/urls', requireISODate, listByDateHandler)
router.get('/codes/:code', getByCodeHandler)
router.get('/s/:code', redirectByCode)

export default router
