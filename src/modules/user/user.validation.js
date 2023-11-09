import joi from "joi";

export const update={
    body:joi.object().required().keys({
        newpassward:joi.string().required(),
        oldpassward:joi.string().required()
    })
}

export const createUserAccount={
    body:joi.object().required().keys({
        userName:joi.string().required().min(3).max(25),
        email:joi.string().email().required(),
        passward:joi.string().required()
    })
}

export const deleteUserAccount={
    params:joi.object().required().keys({
        id:joi.number().required()
    })
}

