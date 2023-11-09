import joi from "joi";

export const signup={
    body:joi.object().required().keys({
        userName:joi.string().required().min(3).max(25),
        email:joi.string().email().required(),
        passward:joi.string().required()
    })
}

export const signin={
    body:joi.object().required().keys({
        passward:joi.string().required(),
        email:joi.string().email().required()
    })
}

export const forgetPassward={
    body:joi.object().required().keys({
        newpassward:joi.string().required(),
        email:joi.string().email().required(),
        code:joi.string().required()
    })
}

export const sendCode={
    body:joi.object().required().keys({
        email:joi.string().email().required(),
    })
}
