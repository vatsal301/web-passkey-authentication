const userService = require("../Services/user.service");
const encryption = require("../Utility/encryption");
const { generateRegistrationOptions } = require("@simplewebauthn/server");
const {
  ValidationError,
  Error,
  Success,
} = require("../Utility/responseManager");
const challengeService = require("../Services/challenge.service");

const fileRender = (request, h) => {
  return h.view("register");
};

const createUser = async (request, h) => {
  try {
    const payload = request.payload;
    const hasEmail = await userService.findByEmail(payload.email);
    const errorMessage = "email is already exist";
    if (hasEmail) return ValidationError(h, errorMessage, {}, 403);
    payload.password = await encryption.encryptUtility(payload.password);
    const result = await userService.createUser(payload);
    return Success(h, "Account is Created", result, 201);
  } catch (error) {
    console.log("error in registerController createUser", error);
    return Error(h, error.message, error);
  }
};

const registerChallenge = async (request, h) => {
  try {
    const { userId } = request.payload;
    console.log("userId", userId);
    const hasUser = await userService.findById(userId);
    console.log("hasUser", hasUser);
    if (!hasUser) return ValidationError(h, "Invalid Userid", {}, 401);
    const challengePayload = await generateRegistrationOptions({
      rpId: "localhost",
      rpName: "My Localhost Machine",
      attestationType: "none",
      userName: hasUser._id,
    });
    console.log("challengePayload ", challengePayload);
    const result = await challengeService.createChallenge({
      challenge: challengePayload.challenge,
      userId,
    });
    console.log("result", result);
    return Success(
      h,
      "Challenge is Register",
      { options: challengePayload },
      201
    );
  } catch (error) {
    console.log("error in registerController registerChallenge", error);
    return Error(h, error.message, error);
  }
};

module.exports = { fileRender, createUser, registerChallenge };
