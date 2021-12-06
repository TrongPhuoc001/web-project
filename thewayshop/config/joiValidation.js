const Joi = require("joi");

const registerValid = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        repassword: Joi.any().valid(Joi.ref('password')).required().messages({ error: "password doesn't match" }), 
        birthday: Joi.date(),
        address: Joi.string().max(255)
    });
    return schema.validate(data);
}
module.exports.registerValid = registerValid;