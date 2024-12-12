const Joi = require("joi");
const mongoose = require("mongoose");

const validateMongoId = Joi.string().custom((value, helper) => {
  if (!mongoose.Types.ObjectId.isValid(value))
    return helper.message("Invalid Id: " + value);
  return value;
});

const createUser = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

const userId = Joi.object({
  userId: validateMongoId.required(),
});
module.exports = { createUser, userId};