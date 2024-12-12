const ChallengeModel = require("../Models/challenge.model");

const createChallenge = async (data) => {
  try {
    return await ChallengeModel.create(data);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { createChallenge };
