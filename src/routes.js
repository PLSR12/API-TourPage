import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import InternationalController from './app/controllers/international'
import NationalController from './app/controllers/national'
import ValuationController from './app/controllers/Valuation'

const upload = multer(multerConfig)
const routes = new Router()

routes.post('/international', upload.single('file'), InternationalController.store)
routes.get('/international',  InternationalController.index)
routes.put('/international/:id', upload.single('file'), InternationalController.update)


routes.post('/national', upload.single('file'), NationalController.store)
routes.get('/national',  NationalController.index)
routes.put('/national/:id', upload.single('file'), NationalController.update)

routes.post('/valuation', ValuationController.store)
routes.get('/valuation',  ValuationController.index)

export default routes
