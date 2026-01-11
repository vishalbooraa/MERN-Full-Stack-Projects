const Joi=require("joi")

const orderSchema=Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required().min(0),
    qty:Joi.number().required().min(1),
    mode: Joi.string().valid("buy", "sell").insensitive().required()
})

const sellSchema=Joi.object({
    name:Joi.string().required(),
    mode:Joi.string().valid("sell").insensitive().required()
})

const signupSchema=Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required(),
    password:Joi.string().required()
})

const loginSChema=Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
})

module.exports={orderSchema,sellSchema,signupSchema,loginSChema}