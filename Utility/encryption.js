const bcrypt = require("bcryptjs");
const logger = require("../logger");
const encryptUtility = async (text) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(text, salt);
  } catch (error) {
    logger.error("error in encryptUtility", error);
  }
};
const validatePassword = async (validateTO, validateWith) => {
  return await bcrypt.compare(validateTO, validateWith);
};
module.exports = { encryptUtility, validatePassword };
