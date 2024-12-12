// const registerController = require("../Controllers/register.controller");
const verifyController = require("../Controllers/verify.controller");
// const verifyValidation = require("../Validations/verify.validation");
// options: {
//     validate: {
//       query: verifyValidation.verifySchema,
//     },
//   },
const verifyRoute = [
  {
    method: "GET",
    path: "/verify",
    handler: verifyController.fileRender,
  },
];

module.exports = verifyRoute;
