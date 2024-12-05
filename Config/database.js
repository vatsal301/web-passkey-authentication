const mongoose = require("mongoose");
const logger = require("../logger");

const databaseConnection = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URL + process.env.MONGODB_DB_NAME
    );
    logger.info(`Mongodb is Connected ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error in Mongodb connection: ${error}`);
    process.exit(1);
  }
};

module.exports = databaseConnection;
