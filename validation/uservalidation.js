 const joi = require('joi');

 const userRegistrationSchema = joi.object({
   username: joi.string().alphanum().min(3).max(30).required(),
   email: joi.string().email().required(),
   password: joi.string().min(6).required()
 });

 const userLoginSchema = joi.object({
   email: joi.string().email().required(),
   password: joi.string().min(6).required()
 });

 module.exports = {
   userRegistrationSchema,
   userLoginSchema
 };
