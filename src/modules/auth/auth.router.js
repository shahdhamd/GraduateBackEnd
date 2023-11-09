import { Router } from "express";
import * as auth from './controller/auth.controller.js'
import {validation} from '../../middlewares/validation.js'
import * as validateAuth from './auth.validation.js'
const router=Router()

router.post('/signup',validation(validateAuth.signup),auth.signup)
router.post('/signin',validation(validateAuth.signin),auth.signin)
router.get('/confirmEmail/:token',auth.confirmEmail)
router.patch('/sendcode',validation(validateAuth.sendCode),auth.sendCode)
router.patch('/forgetpassward',validation(validateAuth.forgetPassward),auth.forgetPassward)
export default router