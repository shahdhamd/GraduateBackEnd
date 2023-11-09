import { Router } from "express";
import * as user from './controller/user.controller.js'
import { endpoint } from "./user.endpoint.js";
import {validation} from '../../middlewares/validation.js'
import { auth } from "../../middlewares/auth.js";
import * as validationUser from './user.validation.js'
import { fileValidation, myMulter } from "../../services/multer.js";
const router=Router()

router.get('/',auth(endpoint.getAllUser),user.getAllUser)
router.patch('/update',auth(endpoint.update),validation(validationUser.update),user.updatepassward)
router.post('/',auth(endpoint.addAccount),validation(validationUser.createUserAccount),user.createUserAccount)
router.delete('/:id',auth(endpoint.deleteUserAccount),validation(validationUser.deleteUserAccount),user.deleteUserAccount)
router.patch('/',auth(endpoint.upload),myMulter(fileValidation.imag).single('image'),user.uploadimage)
export default router