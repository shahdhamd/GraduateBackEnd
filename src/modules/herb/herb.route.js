import Router from "express";
import { endpoint } from "./herb.endpoint.js";
const router=Router()
import * as herb from './controller/herb.controller.js'
import {auth} from '../../middlewares/auth.js'
import * as validateHerb from './herb.validation.js'
import { fileValidation, myMulter } from "../../services/multer.js";
import { validation } from "../../middlewares/validation.js";
router.post('/',auth(endpoint.createHerb),myMulter(fileValidation.imag).single('image'),validation(validateHerb.createHerb),herb.createHerb)
router.delete('/:id',auth(endpoint.delete),herb.deleteHerb)
router.patch('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),herb.updateHerb)
router.get('/',auth(endpoint.search),herb.searchByName)
router.get('/all',auth(endpoint.getAllHerb),herb.getAllHerb)
export default router