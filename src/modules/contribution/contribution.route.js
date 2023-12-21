import Router from "express";
import { endpoint } from "./contribution.endpoint.js";
const router=Router()

import * as contribution from './controller/contribution.controller.js'
import {auth} from '../../middlewares/auth.js'
import * as validateContribution from './contribution.validation.js'
import { fileValidation, myMulter } from "../../services/multer.js";
import { validation } from "../../middlewares/validation.js";
router.delete('/:id',auth(endpoint.delete),contribution.deleteContribution)
router.get('/',auth(endpoint.getAll),contribution.getAll)
router.patch('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),contribution.updateContribution)
router.post('/',auth(endpoint.createContribution), myMulter(fileValidation.imag).single('image'),validation(validateContribution.createContribution),contribution.createContribution)
export default router
