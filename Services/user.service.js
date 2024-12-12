const UserModel = require("../Models/user.model");
const findByEmail = async (email) => {
  try {
    return await UserModel.findOne({ email: email }).lean();
  } catch (error) {
    console.log("error in findByEmail services", error);
    throw new Error(error);
  }
};
const findById = async (id) => {
  try {
    return await UserModel.findById(id).lean();
  } catch (error) {
    throw new Error(error);
  }
};

const createUser = async (user) => {
  try {
    const result = await UserModel.create(user);
    const res = result.toObject();
    delete res.password;
    return res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { findByEmail, createUser, findById };
