const registerController = require("../Controllers/register.controller");
const userValidation = require("../Validations/user.validation");
const registerRoute = [
  {
    method: "GET",
    path: "/register",
    handler: registerController.fileRender,
  },
  {
    method: "POST",
    path: "/register",
    options: {
      validate: {
        payload: userValidation.createUser,
      },
    },
    handler: registerController.createUser,
  },
  {
    method: "POST",
    path: "/register-challenge",
    options: {
      validate: {
        payload: userValidation.userId,
      },
    },
    handler: registerController.registerChallenge,
  },
];

module.exports = registerRoute;
