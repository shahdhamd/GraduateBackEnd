import joi from 'joi'
import { herbModel } from '../../../DB/model/Herb.model.js'
export const createHerb={
    body:joi.object().required().keys({
        name:joi.string().min(2).max(25).required(),
        description:joi.string().min(10).max(500).required(),
        benefit:joi.string().required().max(300).min(10),
        effect:joi.string().min(5).max(300).required(),
        place:joi.string().min(3).max(200).required()
    })
}

