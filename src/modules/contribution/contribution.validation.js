import joi from 'joi'

export const createContribution={
    body:joi.object().required().keys({
        ArabicName:joi.string().min(2).max(25).required(),
        EnglishName:joi.string().min(2).max(25).required(),
        description:joi.string().min(10).max(500).required(),
        benefit:joi.string().required().max(1000).min(10),
        effect:joi.string().min(5).max(1000).required(),
        place:joi.string().min(3).max(200).required(),
        image:joi.string()
    })
}

export const updateContribution={
    body:joi.object().required().keys({
        ArabicName:joi.string().min(2).max(25),
        EnglishName:joi.string().min(2).max(25),
        description:joi.string().min(10).max(500),
        benefit:joi.string().max(1000).min(10),
        effect:joi.string().min(5).max(1000),
        place:joi.string().min(3).max(200),
        verified:joi.boolean()
    })
}

